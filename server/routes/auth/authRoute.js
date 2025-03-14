import express from 'express'
import { checkAuth, login, register } from '../../controllers/auth/auth.js'

const router = express.Router()
console.log(
    'herre'
);

// register route : 
router.post('/register', register)

// login route : 
router.post('/login', login)

// check auth : 
router.get('/me', checkAuth, (req, res) => {
    return res.status(200).json({ role: req.user.role, userId: req.user.userId })
})

export default router 