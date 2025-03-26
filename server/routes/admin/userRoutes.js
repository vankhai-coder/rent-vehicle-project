import express from 'express'
import userController from '../../controllers/admin/userController.js';
const router = express.Router()

router.get('/users', userController.getAllUsers)
router.patch('/users/:userId', userController.updateUserRegistered);
export default router 