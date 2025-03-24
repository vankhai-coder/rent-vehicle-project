
import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { bookMotobike, getAllBookings } from '../../controllers/customer/booking.js'

const router = express.Router()

// booking : 
router.post('/', checkAuth, bookMotobike)

// get all booking : 
router.get('/', checkAuth, getAllBookings)

export default router