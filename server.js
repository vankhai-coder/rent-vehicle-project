import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()

// connect to DB : 
import { connectDB } from './config/db.js'

// import routes : 
import authRoutes from './routes/auth/authRoute.js'
import addOnRoutes from './routes/owner/addOnRoute.js'

// init app : 
const app = express()

// middleware : 
app.use(express.json())
app.use(urlencoded({extended : true}))

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
// Add On routes : 
app.use('/api/owner/add-on' , addOnRoutes )