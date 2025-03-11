import express from 'express' 
import { login, register } from '../../controllers/auth/auth.js'

const router = express.Router()

// register route : 
router.post('/register' , register )

// login route : 
router.post('/login' , login)

export default router 