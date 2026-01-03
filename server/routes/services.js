const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabase');

// GET /api/services
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from("services").select("*");

        if (error) {
            return res.status(500).json({ ok: false, error: error.message });
        }

        return res.json({ ok: true, data });
    } catch (e) {
        return res.status(500).json({ ok: false, error: "Server Error" });
    }
});

module.exports = router;
