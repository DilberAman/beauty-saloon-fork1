const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const serverDir = path.join(rootDir, 'server');

const envExample = path.join(serverDir, 'env.example');
const envTarget = path.join(serverDir, '.env');

console.log('Checking environment configuration...');

if (fs.existsSync(envExample)) {
    if (!fs.existsSync(envTarget)) {
        fs.copyFileSync(envExample, envTarget);
        console.log('✅ Created server/.env from server/env.example');
    } else {
        console.log('ℹ️  server/.env already exists, skipping creation.');
    }
} else {
    console.warn('⚠️  server/env.example not found. Cannot create .env automatically.');
}

console.log('Setup complete.');
