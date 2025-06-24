import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Booking from './models/bookingModel.js';

dotenv.config();

console.log('🔍 Testing Payment Flow and Webhook Setup...\n');

// Check environment variables
console.log('1. Environment Variables:');
console.log('   STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Configured' : '❌ Not configured');
console.log('   STRIPE_WEBHOOK_SECRET:', process.env.STRIPE_WEBHOOK_SECRET ? '✅ Configured' : '❌ Not configured');
console.log('   MONGODB_URI:', process.env.MONGODB_URI ? '✅ Configured' : '❌ Not configured');
console.log('');

// Test database connection
async function testDatabase() {
    try {
        console.log('2. Testing Database Connection:');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('   ✅ Database connected successfully');
        
        // Get latest booking
        const latestBooking = await Booking.findOne().sort({ createdAt: -1 });
        if (latestBooking) {
            console.log('   📋 Latest booking found:');
            console.log(`      ID: ${latestBooking._id}`);
            console.log(`      Status: ${latestBooking.status}`);
            console.log(`      Payment Status: ${latestBooking.paymentStatus}`);
            console.log(`      Created: ${latestBooking.createdAt}`);
            console.log(`      Updated: ${latestBooking.updatedAt}`);
        } else {
            console.log('   ❌ No bookings found in database');
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.log('   ❌ Database connection failed:', error.message);
    }
    console.log('');
}

// Test webhook endpoint
async function testWebhookEndpoint() {
    console.log('3. Testing Webhook Endpoint:');
    try {
        const response = await fetch('http://localhost:5000/api/webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Stripe-Signature': 'test-signature'
            },
            body: JSON.stringify({
                type: 'test',
                data: { object: { id: 'test' } }
            })
        });
        
        if (response.status === 400) {
            console.log('   ✅ Webhook endpoint is accessible (expected signature error)');
        } else {
            console.log(`   ⚠️  Webhook endpoint returned status: ${response.status}`);
        }
    } catch (error) {
        console.log('   ❌ Webhook endpoint test failed:', error.message);
    }
    console.log('');
}

// Manual database update test
async function testManualUpdate() {
    try {
        console.log('4. Testing Manual Database Update:');
        await mongoose.connect(process.env.MONGODB_URI);
        
        const latestBooking = await Booking.findOne().sort({ createdAt: -1 });
        if (latestBooking) {
            // Update booking status manually
            const updatedBooking = await Booking.findByIdAndUpdate(
                latestBooking._id,
                {
                    status: 'completed',
                    paymentStatus: 'succeeded',
                    paymentMethod: 'stripe',
                    paidAt: new Date()
                },
                { new: true }
            );
            
            console.log('   ✅ Manual update successful:');
            console.log(`      Old Status: ${latestBooking.status}`);
            console.log(`      New Status: ${updatedBooking.status}`);
            console.log(`      Old Payment Status: ${latestBooking.paymentStatus}`);
            console.log(`      New Payment Status: ${updatedBooking.paymentStatus}`);
        } else {
            console.log('   ❌ No booking to update');
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.log('   ❌ Manual update failed:', error.message);
    }
    console.log('');
}

// Main test function
async function runTests() {
    await testDatabase();
    await testWebhookEndpoint();
    await testManualUpdate();
    
    console.log('5. Recommendations:');
    if (!process.env.STRIPE_SECRET_KEY) {
        console.log('   ❌ Add STRIPE_SECRET_KEY to your .env file');
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.log('   ❌ Add STRIPE_WEBHOOK_SECRET to your .env file');
    }
    if (!process.env.MONGODB_URI) {
        console.log('   ❌ Add MONGODB_URI to your .env file');
    }
    
    console.log('\n💡 To test webhook:');
    console.log('   1. Make a payment with test card: 4242 4242 4242 4242');
    console.log('   2. Check server logs for webhook events');
    console.log('   3. Check database for updated booking status');
    console.log('   4. Check frontend for refreshed status');
}

runTests().catch(console.error); 