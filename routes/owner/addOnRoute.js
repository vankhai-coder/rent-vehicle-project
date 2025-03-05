import express from 'express'
import { createAddOn } from '../../controllers/owner/addOnController.js'

const router = express.Router() 

// create Add On : 
router.post('/' , createAddOn )
export default router