import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { bookMotobike, getAllBookings, deleteBooking } from '../../controllers/customer/booking.js'

const router = express.Router()

// booking : 
router.post('/', checkAuth, bookMotobike)

// get all booking : 
router.get('/', checkAuth, getAllBookings)

// delete booking : 
router.delete('/:id', checkAuth, deleteBooking)

export default router