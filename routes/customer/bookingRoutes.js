
import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { bookMotobike } from '../../controllers/customer/booking.js'

const router = express.Router()

// booking : 
router.post('/', checkAuth, bookMotobike)

export default router