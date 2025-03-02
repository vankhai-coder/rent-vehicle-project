import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { connectDB } from './config/db.js'
// import routes : 
import authRoutes from './routes/auth/authRoute.js'
// init app : 
const app = express()
// port : 
const PORT = process.env.PORT || 5001
// middleware : 
app.use(express.json())
// log request : 
app.use((req, res, next) => {
    console.log(`Request Info : ${req.method} ${req.url}`);
    next()
})
// listen port : 
app.listen(PORT, (req, res) => {
    console.log(`App running on http://localhost:${PORT}`);
    // connect to db : 
    connectDB()
})
// home page route : 
app.get('/', (req, res) => {
    res.json({ message: "app running success!" })
})

// authentication routes : 
app.use('/user' , authRoutes )