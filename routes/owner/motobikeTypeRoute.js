import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { createMotobikeType } from '../../controllers/owner/motobikeTypeController.js'

const router = express.Router()

// create motobike type : 
router.post('/', checkAuth, createMotobikeType)

export default router
