import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { bookMotobike, cancelBooking, getAllBookings } from '../../controllers/customer/booking.js'

const router = express.Router()

// booking : 
router.post('/', checkAuth, bookMotobike)

// get all booking : 
router.get('/', checkAuth, getAllBookings)

// cancel booking : 
router.patch('/:bookingId/cancel', checkAuth, cancelBooking)

export default router