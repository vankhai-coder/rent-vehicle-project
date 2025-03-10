
import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { searchMotoBikeByType } from '../../controllers/customer/searchMotobike.js'

const router = express.Router()

// search by motobiketype : 
router.get('/motobike-type/:motobikeTypeId', searchMotoBikeByType)

export default router 