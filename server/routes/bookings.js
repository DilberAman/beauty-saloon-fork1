const express = require('express');
const router = express.Router();
const db = require('../lib/db');

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
        const serviceResult = await db.query('SELECT id FROM services WHERE id = $1', [serviceId]);
        if (serviceResult.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: { code: "SERVICE_NOT_FOUND", message: "Service not found." },
            });
        }

        // 3) Check worker exists
        const workerResult = await db.query('SELECT id FROM workers WHERE id = $1', [workerId]);
        if (workerResult.rows.length === 0) {
            return res.status(404).json({
                ok: false,
                error: { code: "WORKER_NOT_FOUND", message: "Worker not found." },
            });
        }

        // 4) Conflict check (same worker + same startTime)
        const conflictResult = await db.query(
            'SELECT id FROM bookings WHERE worker_id = $1 AND start_time = $2',
            [workerId, startTime]
        );

        if (conflictResult.rows.length > 0) {
            return res.status(409).json({
                ok: false,
                error: {
                    code: "SLOT_TAKEN",
                    message: "Selected time slot is already booked.",
                },
            });
        }

        // 5) Create new booking
        const insertResult = await db.query(
            `INSERT INTO bookings 
            (service_id, worker_id, start_time, customer_full_name, customer_phone, customer_email, notes, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [
                Number(serviceId),
                Number(workerId),
                startTime,
                customer.fullName,
                customer.phone,
                customer.email,
                notes ?? "",
                "CONFIRMED"
            ]
        );

        const newBooking = insertResult.rows[0];

        // 6) Return success
        return res.status(201).json({
            ok: true,
            data: {
                bookingId: newBooking.id,
                status: newBooking.status,
            },
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        return res.status(500).json({
            ok: false,
            error: { code: "SERVER_ERROR", message: "Invalid JSON or Server Error" },
        });
    }
});

module.exports = router;
