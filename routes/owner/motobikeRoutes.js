import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { createMotobike } from '../../controllers/owner/motobikeController.js'

const router = express.Router()

// create motobike : 
router.post('/', checkAuth, createMotobike)

export default router 