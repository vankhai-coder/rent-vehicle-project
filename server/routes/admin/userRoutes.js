import express from 'express'
import userController from '../../controllers/admin/userController.js';
import { checkAuth } from '../../controllers/auth/auth.js';
const router = express.Router()

// Get all users route
router.get('/users', checkAuth, userController.getAllUsers);

// Ban or unban a user route
router.put('/users/ban/:userId', checkAuth, userController.toggleBanUser);

// Delete a user route
router.delete('/users/:userId', checkAuth, userController.deleteUser);

export default router 