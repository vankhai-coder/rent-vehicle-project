import express from 'express'
import { createStoreLocation, getAllStoreLocationsOfEachOwner } from '../../controllers/owner/storeLocationController.js'
import { checkAuth } from '../../controllers/auth/auth.js'

const router = express.Router()

// create store location : 
router.post('/', checkAuth, createStoreLocation)

// get all store locations : 
router.get('/:ownerId', checkAuth, getAllStoreLocationsOfEachOwner)

export default router