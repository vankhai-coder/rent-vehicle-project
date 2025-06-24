import stripe from '../../config/stripe.js';
import Booking from '../../models/bookingModel.js';

// Create checkout session
export const createCheckoutSession = async (req, res) => {
    try {
        const { amount, bookingId, currency = 'vnd' } = req.body;

        if (!amount || !bookingId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Amount and booking ID are required' 
            });
        }

        // Verify booking exists
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }

        // For VND, Stripe expects the amount in the smallest currency unit (1 VND = 1 cent)
        // So we don't need to multiply by 100 for VND
        let stripeAmount;
        if (currency.toLowerCase() === 'vnd') {
            stripeAmount = Math.round(amount); // VND amount as is
        } else {
            stripeAmount = Math.round(amount * 100); // For other currencies like USD
        }

        console.log('Original amount:', amount);
        console.log('Stripe amount:', stripeAmount);
        console.log('Currency:', currency);

        // Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: 'Vehicle Rental',
                            description: `Rental booking for ${bookingId}`,
                        },
                        unit_amount: stripeAmount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_ORIGIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_ORIGIN}/rental-check`,
            metadata: {
                bookingId: bookingId,
                customerId: req.user.userId,
                originalAmount: amount.toString()
            },
        });

        res.status(200).json({
            success: true,
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error creating checkout session',
            error: error.message 
        });
    }
};

// Handle webhook events
export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    console.log('Webhook received:', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        bodyLength: req.body ? req.body.length : 0
    });

    try {
        if (!process.env.STRIPE_WEBHOOK_SECRET) {
            console.error('STRIPE_WEBHOOK_SECRET is not configured');
            return res.status(500).json({ error: 'Webhook secret not configured' });
        }

        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log('Webhook signature verified successfully');
        console.log('Event type:', event.type);
        console.log('Event data:', JSON.stringify(event.data, null, 2));
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        console.error('Webhook secret used:', process.env.STRIPE_WEBHOOK_SECRET ? 'Configured' : 'Not configured');
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log('Payment completed for session:', session.id);
                console.log('Session metadata:', session.metadata);
                
                // Update booking status
                const bookingId = session.metadata.bookingId;
                if (bookingId) {
                    const updatedBooking = await Booking.findByIdAndUpdate(
                        bookingId, 
                        {
                            status: 'completed',
                            paymentStatus: 'succeeded',
                            paymentMethod: 'stripe',
                            paidAt: new Date(),
                            paymentIntentId: session.payment_intent
                        },
                        { new: true } // Return the updated document
                    );
                    
                    if (updatedBooking) {
                        console.log('Booking updated successfully:', {
                            bookingId: updatedBooking._id,
                            status: updatedBooking.status,
                            paymentStatus: updatedBooking.paymentStatus,
                            paidAt: updatedBooking.paidAt
                        });
                    } else {
                        console.log('Booking not found for ID:', bookingId);
                    }
                } else {
                    console.log('No bookingId found in session metadata');
                }
                break;
                
            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                console.log('Payment failed:', failedPayment.id);
                
                // Update booking status to failed
                const failedBookingId = failedPayment.metadata?.bookingId;
                if (failedBookingId) {
                    const updatedFailedBooking = await Booking.findByIdAndUpdate(
                        failedBookingId, 
                        {
                            status: 'pending_payment', // Keep as pending payment for retry
                            paymentStatus: 'failed',
                            paymentMethod: 'stripe'
                        },
                        { new: true }
                    );
                    
                    if (updatedFailedBooking) {
                        console.log('Failed booking updated:', {
                            bookingId: updatedFailedBooking._id,
                            status: updatedFailedBooking.status,
                            paymentStatus: updatedFailedBooking.paymentStatus
                        });
                    }
                }
                break;
                
            case 'payment_intent.canceled':
                const canceledPayment = event.data.object;
                console.log('Payment canceled:', canceledPayment.id);
                
                // Update booking status to canceled
                const canceledBookingId = canceledPayment.metadata?.bookingId;
                if (canceledBookingId) {
                    const updatedCanceledBooking = await Booking.findByIdAndUpdate(
                        canceledBookingId, 
                        {
                            status: 'canceled',
                            paymentStatus: 'canceled',
                            paymentMethod: 'stripe'
                        },
                        { new: true }
                    );
                    
                    if (updatedCanceledBooking) {
                        console.log('Canceled booking updated:', {
                            bookingId: updatedCanceledBooking._id,
                            status: updatedCanceledBooking.status,
                            paymentStatus: updatedCanceledBooking.paymentStatus
                        });
                    }
                }
                break;
                
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
};

// Get payment status
export const getPaymentStatus = async (req, res) => {
    try {
        const { paymentIntentId } = req.params;

        if (!paymentIntentId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Payment intent ID is required' 
            });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        res.status(200).json({
            success: true,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency
        });

    } catch (error) {
        console.error('Error retrieving payment status:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving payment status',
            error: error.message 
        });
    }
};

// Get booking status by session ID
export const getBookingStatusBySession = async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Session ID is required' 
            });
        }

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (!session) {
            return res.status(404).json({ 
                success: false, 
                message: 'Session not found' 
            });
        }

        const bookingId = session.metadata?.bookingId;
        if (!bookingId) {
            return res.status(404).json({ 
                success: false, 
                message: 'No booking associated with this session' 
            });
        }

        // Get the booking from database
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }

        res.status(200).json({
            success: true,
            booking: {
                _id: booking._id,
                status: booking.status,
                paymentStatus: booking.paymentStatus,
                paymentMethod: booking.paymentMethod,
                paidAt: booking.paidAt,
                totalPrice: booking.totalPrice,
                customerId: booking.customerId,
                ownerId: booking.ownerId
            },
            session: {
                id: session.id,
                status: session.status,
                payment_status: session.payment_status
            }
        });

    } catch (error) {
        console.error('Error retrieving booking status by session:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error retrieving booking status',
            error: error.message 
        });
    }
}; 