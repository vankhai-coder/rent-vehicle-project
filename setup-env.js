#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up environment variables for Rent Vehicle Project...\n');

// Server .env setup
const serverEnvPath = path.join(__dirname, 'server', '.env');
const serverEnvExamplePath = path.join(__dirname, 'server', 'env.example');

if (!fs.existsSync(serverEnvPath) && fs.existsSync(serverEnvExamplePath)) {
    try {
        fs.copyFileSync(serverEnvExamplePath, serverEnvPath);
        console.log('✅ Server .env file created successfully!');
        console.log('📝 Please edit server/.env with your actual values\n');
    } catch (error) {
        console.log('❌ Failed to create server .env file:', error.message);
    }
} else if (fs.existsSync(serverEnvPath)) {
    console.log('ℹ️  Server .env file already exists');
} else {
    console.log('❌ Server env.example file not found');
}

// Client .env setup
const clientEnvPath = path.join(__dirname, 'client', '.env');
const clientEnvExamplePath = path.join(__dirname, 'client', 'env.example');

if (!fs.existsSync(clientEnvPath) && fs.existsSync(clientEnvExamplePath)) {
    try {
        fs.copyFileSync(clientEnvExamplePath, clientEnvPath);
        console.log('✅ Client .env file created successfully!');
        console.log('📝 Please edit client/.env with your Stripe publishable key\n');
    } catch (error) {
        console.log('❌ Failed to create client .env file:', error.message);
    }
} else if (fs.existsSync(clientEnvPath)) {
    console.log('ℹ️  Client .env file already exists');
} else {
    console.log('❌ Client env.example file not found');
}

console.log('🎉 Environment setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Edit server/.env with your database and OAuth credentials');
console.log('2. Edit client/.env with your Stripe publishable key');
console.log('3. Run "npm install" in both server and client directories');
console.log('4. Start the servers with "npm run dev"');
console.log('\n🔐 Remember: Never commit .env files to version control!'); 