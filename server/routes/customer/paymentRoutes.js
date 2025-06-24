import express from 'express';
import { checkAuth } from '../../controllers/auth/auth.js';
import { 
    createCheckoutSession, 
    handleWebhook, 
    getPaymentStatus,
    getBookingStatusBySession
} from '../../controllers/customer/paymentController.js';

const router = express.Router();

// Create checkout session (requires authentication)
router.post('/create-checkout-session', checkAuth, createCheckoutSession);

// Get payment status (requires authentication)
router.get('/payment-status/:paymentIntentId', checkAuth, getPaymentStatus);

// Get booking status by session ID (requires authentication)
router.get('/booking-status/:sessionId', checkAuth, getBookingStatusBySession);

// Webhook endpoint (no authentication required)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

export default router; 