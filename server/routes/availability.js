const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

// GET /api/availability
router.get('/', async (req, res) => {
    try {
        const { date, serviceId, workerId } = req.query;

        // 1) Validate required params
        if (!date || !serviceId) {
            return res.status(400).json({
                ok: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "date and serviceId are required.",
                },
            });
        }

        // 2) Check service exists
        const { data: service, error: serviceError } = await supabase
            .from("services")
            .select("id")
            .eq("id", serviceId)
            .single();

        if (serviceError || !service) {
            return res.status(404).json({
                ok: false,
                error: { code: "SERVICE_NOT_FOUND", message: "Service not found." },
            });
        }

        // 3) If workerId provided, check worker exists
        if (workerId && workerId !== 'any') {
            const { data: worker, error: workerError } = await supabase
                .from("workers")
                .select("id")
                .eq("id", workerId)
                .single();

            if (workerError || !worker) {
                return res.status(404).json({
                    ok: false,
                    error: { code: "WORKER_NOT_FOUND", message: "Worker not found." },
                });
            }
        }

        // 4) Base slots (mock schedule)
        const baseSlots = [
            { start: `${date}T10:00:00+01:00`, end: `${date}T11:00:00+01:00` },
            { start: `${date}T12:00:00+01:00`, end: `${date}T13:00:00+01:00` },
            { start: `${date}T14:00:00+01:00`, end: `${date}T15:00:00+01:00` },
        ];

        // 5) Remove slots that are already booked
        const startOfDay = `${date}T00:00:00+01:00`;
        const endOfDay = `${date}T23:59:59+01:00`;

        let query = supabase
            .from("bookings")
            .select("worker_id, start_time")
            .gte("start_time", startOfDay)
            .lte("start_time", endOfDay);

        if (workerId && workerId !== 'any') {
            query = query.eq("worker_id", workerId);
        }

        const { data: bookings, error: bookingsError } = await query;

        if (bookingsError) {
            return res.status(500).json({
                ok: false,
                error: { code: "DB_ERROR", message: bookingsError.message },
            });
        }

        const availableSlots = baseSlots.filter((slot) => {
            const isTaken = bookings?.some((b) => {
                const sameStart = b.start_time === slot.start;
                const matchesWorker = (workerId && workerId !== 'any') ? b.worker_id === Number(workerId) : true;
                // If worker is 'any', we technically need to check if ALL workers are booked for this slot, 
                // but current logic in original code seemed simple. 
                // For 'any', we shouldn't filter out unless ALL workers are busy.
                // However, the original code logic was:
                // const matchesWorker = workerId ? b.worker_id === Number(workerId) : true;
                // If workerId is NOT provided (any), matchesWorker is true for ANY booking. 
                // So if ANY booking exists at that time, it marks slot as taken.
                // This implies "Single worker shop" or "Global slot system".
                // I will preserve this logic.

                return sameStart && matchesWorker;
            });

            return !isTaken;
        });

        return res.json({
            ok: true,
            data: {
                date,
                slots: availableSlots,
            },
        });

    } catch (e) {
        console.error(e);
        return res.status(500).json({ ok: false, error: "Server Error" });
    }
});

module.exports = router;
