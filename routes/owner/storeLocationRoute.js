import express from 'express'
import { createStoreLocation } from '../../controllers/owner/storeLocationController.js'
import { checkAuth } from '../../controllers/auth/auth.js'

const router = express.Router() 

// create Add On : 
router.post('/' , checkAuth , createStoreLocation )

export default router