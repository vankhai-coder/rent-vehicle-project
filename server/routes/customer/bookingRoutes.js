
import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { bookingUsePayosGateway, bookMotobike, getAllBookings } from '../../controllers/customer/booking.js'

const router = express.Router()

// booking : 
router.post('/', checkAuth, bookMotobike)

// booking with payment gateway :
router.post('/payos', checkAuth, bookingUsePayosGateway )

// get all booking : 
router.get('/', checkAuth, getAllBookings)

export default router