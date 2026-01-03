const express = require('express');
const router = express.Router();
const db = require('../lib/db');

// GET /api/services
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query("SELECT * FROM services");
        return res.json({ ok: true, data: rows });
    } catch (e) {
        console.error("Error fetching services:", e);
        return res.status(500).json({ ok: false, error: "Server Error" });
    }
});

module.exports = router;
