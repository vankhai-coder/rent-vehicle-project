
import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { searchByDatesAndDistrict, searchByDatesAndType, searchByDistrict, searchByDistrictWithDatesAndType, searchByTypeAndDistrict, searchMotoBikeByType, searchMotoByListOfDates } from '../../controllers/customer/searchMotobike.js'
import {} from '../../controllers/customer/searchMotobike.js'

const router = express.Router()

// SEARCH BY 1 CATEGORY : 

// search by motobiketype : 
router.get('/motobike-type/:motobikeTypeId', searchMotoBikeByType)

// search by list of booked dates : 
router.get('/booked-dates' , searchMotoByListOfDates )

// search by district : 
router.get('/district' , searchByDistrict )

// SEARCH BY 2 CATEGORY : 

router.get('/dates-type' , searchByDatesAndType )
router.get('/dates-district'  , searchByDatesAndDistrict )
router.get('/type-district' , searchByTypeAndDistrict )

// search by 3 catergories : district , dates , typeOfMotobike : 
router.get('/district-dates-motobike-type' , searchByDistrictWithDatesAndType )

export default router 