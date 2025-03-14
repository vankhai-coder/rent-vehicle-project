import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

import cookieParser from 'cookie-parser'

// connect to DB : 
import { connectDB } from './config/db.js'

// import routes : 
import authRoutes from './routes/auth/authRoute.js'
// owner routes : 
import addOnRoutes from './routes/owner/addOnRoute.js'
import storeLocationRoutes from './routes/owner/storeLocationRoute.js'
import motobikeTypeRoutes from './routes/owner/motobikeTypeRoute.js'
import motobikeRoutes from './routes/owner/motobikeRoutes.js'

// customer routes : 
import customerSearchRoutes from './routes/customer/customerSearchRoutes.js'
import customerBookingRoutes from './routes/customer/bookingRoutes.js'
// init app : 
const app = express()

// middleware : 
app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin : 'http://localhost:5173' ,
    methods : 'GET,POST,PUT,DELETE,PATCH' , 
    allowedHeaders: "Content-Type,Authorization",
    credentials : true
}))

// log request : 
app.use((req, res, next) => {
    console.log(`Request Info : ${req.method} ${req.url}`);
    next()
})

// port : 
const PORT = process.env.PORT || 5001
// listen port : 
app.listen(PORT, (req, res) => {
    console.log(`App running on http://localhost:${PORT}`);
    // connect to db : 
    connectDB()
})

// home page route : 
app.get('/api', (req, res) => {
    res.json({ message: "app running success!" })
})

// authentication routes : 
app.use('/api/auth', authRoutes)

// OWNER ROUTES : 
app.use('/api/owner/add-on', addOnRoutes)
app.use('/api/owner/store-location', storeLocationRoutes)
app.use('/api/owner/motobike-type', motobikeTypeRoutes)
app.use('/api/owner/motobike', motobikeRoutes)

// CUSTOMER ROUTES : 
app.use('/api/customer/search' , customerSearchRoutes )
app.use('/api/customer/booking' , customerBookingRoutes )