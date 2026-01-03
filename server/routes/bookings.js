const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

// POST /api/bookings
router.post('/', async (req, res) => {
    try {
        const { serviceId, workerId, startTime, customer, notes } = req.body;

        // 1) Validate required fields
        if (
            !serviceId ||
            !workerId ||
            !startTime ||
            !customer?.fullName ||
            !customer?.phone ||
            !customer?.email
        ) {
            return res.status(400).json({
                ok: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "Missing required booking fields.",
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

        // 3) Check worker exists
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

        // 4) Conflict check (same worker + same startTime)
        const { data: conflict } = await supabase
            .from("bookings")
            .select("id")
            .eq("worker_id", workerId)
            .eq("start_time", startTime)
            .single();

        if (conflict) {
            return res.status(409).json({
                ok: false,
                error: {
                    code: "SLOT_TAKEN",
                    message: "Selected time slot is already booked.",
                },
            });
        }

        // 5) Create new booking
        const { data: newBooking, error: insertError } = await supabase
            .from("bookings")
            .insert({
                service_id: Number(serviceId),
                worker_id: Number(workerId),
                start_time: startTime,
                customer_full_name: customer.fullName,
                customer_phone: customer.phone,
                customer_email: customer.email,
                notes: notes ?? "",
                status: "CONFIRMED",
            })
            .select()
            .single();

        if (insertError) {
            return res.status(500).json({
                ok: false,
                error: { code: "DB_ERROR", message: insertError.message },
            });
        }

        // 6) Return success
        return res.status(201).json({
            ok: true,
            data: {
                bookingId: newBooking.id,
                status: "CONFIRMED",
            },
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: { code: "SERVER_ERROR", message: "Invalid JSON or Server Error" },
        });
    }
});

module.exports = router;
