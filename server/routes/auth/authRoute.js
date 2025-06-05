import express from 'express'
import { checkAuth, login, register, logout, updatePassword, getUserProfile, updateProfile, getUser } from '../../controllers/auth/auth.js'

const router = express.Router()

// register route : 
router.post('/register', register)

// login route : 
router.post('/login', login)

// get user : 
router.get('/getUser' , checkAuth , getUser )

// check auth : 
router.get('/me', checkAuth, (req, res) => { return res.status(200).json({ role: req.user.role, userId: req.user.userId }) })

// logout : 
router.post('/logout', logout)

// update password : 
router.post('/update-password', checkAuth, updatePassword)

// get user profile : 
router.get('/user-profile', checkAuth, getUserProfile)

// update user profile :
router.patch('/user-profile', checkAuth, updateProfile )

export default router 