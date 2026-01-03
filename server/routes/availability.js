const express = require('express');
const router = express.Router();
const db = require('../lib/db');

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
        const serviceResult = await db.query('SELECT id FROM services WHERE id = $1', [serviceId]);
        if (serviceResult.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: { code: "SERVICE_NOT_FOUND", message: "Service not found." },
            });
        }

        // 3) If workerId provided, check worker exists
        if (workerId && workerId !== 'any') {
            const workerResult = await db.query('SELECT id FROM workers WHERE id = $1', [workerId]);
            if (workerResult.rows.length === 0) {
                return res.status(404).json({
                    ok: false,
                    error: { code: "WORKER_NOT_FOUND", message: "Worker not found." },
                });
            }
        }

        // 4) Base slots (mock schedule)
        // ideally this should be dynamic, but keeping original logic
        const baseSlots = [
            { start: `${date}T10:00:00+01:00`, end: `${date}T11:00:00+01:00` },
            { start: `${date}T12:00:00+01:00`, end: `${date}T13:00:00+01:00` },
            { start: `${date}T14:00:00+01:00`, end: `${date}T15:00:00+01:00` },
        ];

        // 5) Remove slots that are already booked
        const startOfDay = `${date}T00:00:00+01:00`;
        const endOfDay = `${date}T23:59:59+01:00`;

        let query = `
            SELECT worker_id, start_time 
            FROM bookings 
            WHERE start_time >= $1 AND start_time <= $2
        `;
        const params = [startOfDay, endOfDay];

        if (workerId && workerId !== 'any') {
            query += " AND worker_id = $3";
            params.push(workerId);
        }

        const { rows: bookings } = await db.query(query, params);

        const availableSlots = baseSlots.filter((slot) => {
            const slotTime = new Date(slot.start).getTime();

            const isTaken = bookings?.some((b) => {
                // Determine booking time
                // node-postgres returns Date object for TIMESTAMP fields
                const bookingTime = new Date(b.start_time).getTime();
                const sameStart = bookingTime === slotTime;

                const matchesWorker = (workerId && workerId !== 'any') ? b.worker_id === Number(workerId) : true;

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
        console.error("Error fetching availability:", e);
        return res.status(500).json({ ok: false, error: "Server Error" });
    }
});

module.exports = router;
