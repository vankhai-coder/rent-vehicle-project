import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { createMotobike, getAllMotobikes } from '../../controllers/owner/motobikeController.js'

const router = express.Router()

// create motobike : 
router.post('/', checkAuth, createMotobike)

// get all motobike for owner and admin : 
router.get('/', checkAuth, getAllMotobikes)

export default router 