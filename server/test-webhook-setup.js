import dotenv from 'dotenv';
import stripe from './config/stripe.js';

dotenv.config();

async function testWebhookSetup() {
    console.log('=== Testing Stripe Webhook Setup ===\n');

    // Check environment variables
    console.log('1. Checking environment variables:');
    console.log('   STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Configured' : '❌ Not configured');
    console.log('   STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? '✅ Configured' : '❌ Not configured');
    console.log('   CLIENT_ORIGIN:', process.env.CLIENT_ORIGIN || '❌ Not configured');
    console.log('');

    // Test Stripe connection
    console.log('2. Testing Stripe connection:');
    try {
        const account = await stripe.accounts.retrieve();
        console.log('   ✅ Stripe connection successful');
        console.log('   Account ID:', account.id);
        console.log('   Account type:', account.type);
    } catch (error) {
        console.log('   ❌ Stripe connection failed:', error.message);
    }
    console.log('');

    // List webhooks
    console.log('3. Checking webhook endpoints:');
    try {
        const webhooks = await stripe.webhookEndpoints.list();
        if (webhooks.data.length === 0) {
            console.log('   ❌ No webhook endpoints found');
            console.log('   Please create a webhook endpoint in Stripe Dashboard');
        } else {
            console.log(`   ✅ Found ${webhooks.data.length} webhook endpoint(s):`);
            webhooks.data.forEach((webhook, index) => {
                console.log(`   ${index + 1}. URL: ${webhook.url}`);
                console.log(`      Status: ${webhook.status}`);
                console.log(`      Events: ${webhook.enabled_events.join(', ')}`);
                console.log(`      Secret: ${webhook.secret ? '✅ Configured' : '❌ Not configured'}`);
                console.log('');
            });
        }
    } catch (error) {
        console.log('   ❌ Failed to list webhooks:', error.message);
    }

    console.log('4. Recommendations:');
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.log('   ❌ Add STRIPE_WEBHOOK_SECRET to your .env file');
        console.log('   📝 Get it from Stripe Dashboard > Developers > Webhooks');
    }
    
    if (!process.env.CLIENT_ORIGIN) {
        console.log('   ❌ Add CLIENT_ORIGIN to your .env file');
        console.log('   📝 Example: CLIENT_ORIGIN=http://localhost:5173');
    }

    console.log('\n=== Test Complete ===');
}

testWebhookSetup().catch(console.error); 