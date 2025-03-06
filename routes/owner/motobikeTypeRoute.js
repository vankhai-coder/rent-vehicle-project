import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { createMotobikeType, getAllMotobikeTypes, updateMotobikeType } from '../../controllers/owner/motobikeTypeController.js'

const router = express.Router()

// create motobike type : 
router.post('/', checkAuth, createMotobikeType)

// get all motobike types : 
router.get('/', checkAuth, getAllMotobikeTypes)

// update motobike type : 
router.patch('/:id', checkAuth, updateMotobikeType)

export default router
