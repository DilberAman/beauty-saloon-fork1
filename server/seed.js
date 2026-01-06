const fs = require('fs');
const path = require('path');
const db = require('./lib/db');

async function seed() {
    try {
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema.sql...');
        await db.query(schemaSql);
        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    } finally {
        await db.pool.end();
    }
}

seed();
