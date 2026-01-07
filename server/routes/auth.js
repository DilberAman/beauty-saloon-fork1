const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../lib/db');
const authenticateToken = require('../middleware/authenticate');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(`[Register] Attempt for email: ${email}`);

    try {
        // Check if user exists
        const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            console.log(`[Register] User already exists: ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        console.log('[Register] Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        console.log('[Register] Inserting user...');
        const newUser = await db.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
            [name, email, hashedPassword]
        );

        // Do not generate token or set cookie. User must login manually.
        console.log('[Register] Success. ID:', newUser.rows[0].id);
        res.status(201).json({ user: newUser.rows[0], message: 'Registered successfully' });
    } catch (err) {
        console.error('[Register] Error:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`[Login] Attempt for email: ${email}`);

    try {
        // Check user
        const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userResult.rows.length === 0) {
            console.log('[Login] User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = userResult.rows[0];

        // Check password
        console.log('[Login] Verifying password...');
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            console.log('[Login] Invalid password');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        console.log('[Login] Generating token...');
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        console.log('[Login] Success for user:', user.email);
        res.json({ user: { id: user.id, name: user.name, email: user.email }, message: 'Logged in successfully' });
    } catch (err) {
        console.error('[Login] Error:', err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
});

// Logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

// Me (Persistence)
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userResult = await db.query('SELECT id, name, email FROM users WHERE id = $1', [req.user.id]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: userResult.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
