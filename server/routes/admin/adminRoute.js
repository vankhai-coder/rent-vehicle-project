import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import {banAccountByUserId, getAllAccountsBaseOnRole} from '../../controllers/admin/accountController.js'

const router = express.Router()

// get all customer : 
router.post('/account', checkAuth , getAllAccountsBaseOnRole )

// ban accounts : 
router.post('/ban-account' , checkAuth , banAccountByUserId )

export default router 