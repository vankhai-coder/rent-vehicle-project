import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Stripe Webhook...\n');

const serverConfig = {
    port: 5000,
};

// Check if server is running
async function checkServer() {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: 'localhost',
            port: serverConfig.port,
            path: '/api',
            method: 'GET',
            timeout: 3000
        }, (res) => {
            console.log('✅ Server is running on port 5000');
            resolve(true);
        });
        
        req.on('error', () => {
            console.log('❌ Server is not running on port 5000');
            console.log('Please start the server first: cd server && npm run dev');
            resolve(false);
        });
        
        req.on('timeout', () => {
            req.destroy();
            console.log('❌ Server timeout');
            resolve(false);
        });
        
        req.end();
    });
}

// Start ngrok
function startNgrok() {
    console.log('🌐 Starting ngrok tunnel...');
    
    const ngrok = spawn('ngrok', ['http', serverConfig.port], {
        stdio: 'pipe',
        shell: true
    });
    
    ngrok.stdout.on('data', (data) => {
        const output = data.toString();
        console.log(output);
        
        // Look for the public URL
        const urlMatch = output.match(/https:\/\/[a-zA-Z0-9-]+\.ngrok\.io/);
        if (urlMatch) {
            const publicUrl = urlMatch[0];
            console.log('\n🎉 Ngrok tunnel created successfully!');
            console.log(`📡 Public URL: ${publicUrl}`);
            console.log(`🔗 Webhook URL: ${publicUrl}/api/webhook`);
            
            // Save the URL to a file
            fs.writeFileSync('webhook-url.txt', `${publicUrl}/api/webhook`);
            
            console.log('\n📋 Next steps:');
            console.log('1. Go to Stripe Dashboard: https://dashboard.stripe.com/webhooks');
            console.log('2. Click "Add endpoint"');
            console.log(`3. Enter this URL: ${publicUrl}/api/webhook`);
            console.log('4. Select these events:');
            console.log('   - checkout.session.completed');
            console.log('   - payment_intent.payment_failed');
            console.log('   - payment_intent.canceled');
            console.log('5. Click "Add endpoint"');
            console.log('6. Copy the "Signing secret" and add to your .env file');
            console.log('\n💡 Keep this terminal open to maintain the tunnel');
        }
    });
    
    ngrok.stderr.on('data', (data) => {
        console.error('Ngrok error:', data.toString());
    });
    
    ngrok.on('close', (code) => {
        console.log(`Ngrok process exited with code ${code}`);
    });
    
    return ngrok;
}

// Main function
async function main() {
    const serverRunning = await checkServer();
    
    if (!serverRunning) {
        console.log('\n❌ Please start the server first and try again');
        process.exit(1);
    }
    
    const ngrokProcess = startNgrok();
    
    // Handle process termination
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down...');
        ngrokProcess.kill();
        process.exit(0);
    });
}

main().catch(console.error); 