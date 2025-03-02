import express from 'express' 
import { register } from '../../controllers/auth/auth.js'
import User from '../../models/userModel.js'

const router = express.Router()

// register route : 
router.post('/register' , register )


export default router 