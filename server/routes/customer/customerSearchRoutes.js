
import express from 'express'
import { checkAuth } from '../../controllers/auth/auth.js'
import { getUniqueDistricts, getUniqueMotobikeTypeNames, searchByDatesAndDistrict, searchByDatesAndType, searchByDistrict, searchByDistrictWithDatesAndType, searchByTypeAndDistrict, searchMotoBikeByType, searchMotoByListOfDates } from '../../controllers/customer/searchMotobike.js'
import {} from '../../controllers/customer/searchMotobike.js'

const router = express.Router()

// delay : 
router.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 2000); // 2 seconds delay
});

// SEARCH BY 1 CATEGORY : 

// search by motobiketype : 
router.post('/motobike-type/:motobikeTypeId', searchMotoBikeByType)

// search by list of booked dates : 
router.post('/booked-dates' , searchMotoByListOfDates )

// search by district : 
router.post('/district' , searchByDistrict )

// SEARCH BY 2 CATEGORY : 

router.post('/dates-type' , searchByDatesAndType )
router.post('/dates-district'  , searchByDatesAndDistrict )
router.post('/type-district' , searchByTypeAndDistrict )

// search by 3 catergories : district , dates , typeOfMotobike : 
router.post('/district-dates-motobike-type' , searchByDistrictWithDatesAndType )

// getUniqueDistricts : 
router.get('/getUniqueDistricts' , getUniqueDistricts )

// getUniqueMotobikeTypeNames
router.get('/getUniqueMotobikeTypeNames' , getUniqueMotobikeTypeNames)
export default router 