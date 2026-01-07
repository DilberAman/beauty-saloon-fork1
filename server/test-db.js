const db = require('./lib/db');

async function testConnection() {
    try {
        console.log('Testing database connection...');
        const res = await db.query('SELECT NOW()');
        console.log('Connection successful:', res.rows[0]);

        console.log('Checking users table...');
        const users = await db.query('SELECT id, email, name FROM users');
        console.log('Users found:', users.rows);

        process.exit(0);
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
}

testConnection();
