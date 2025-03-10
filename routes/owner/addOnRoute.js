import express from 'express'
import { createAddOn,getAllAddOns } from '../../controllers/owner/addOnController.js'
import { checkAuth } from '../../controllers/auth/auth.js'

const router = express.Router() 

// create Add On : 
router.post('/' ,checkAuth ,  createAddOn )

// get all Add On : 
router.get('/' , checkAuth , getAllAddOns )

export default router