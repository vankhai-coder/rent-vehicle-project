import express from 'express';
import { checkAuth } from '../../controllers/auth/auth.js';
import {
    getAllMotobikes,
    deleteMotobike
} from '../../controllers/admin/motoBikeController.js';

const router = express.Router();

// Apply authentication and admin authorization middleware to all routes

// Get all motobikes
router.get('/', getAllMotobikes);

// Delete motobike
router.delete('/:id', checkAuth, deleteMotobike);

export default router;
