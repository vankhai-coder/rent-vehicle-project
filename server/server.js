import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import passport from 'passport'

// load passport config : 
import './config/passport.js'

// connect to DB : 
import { connectDB } from './config/db.js'

// import routes : 
import authRoutes from './routes/auth/authRoute.js'
// admin routes : 
import adminRoutes from './routes/admin/adminRoute.js'

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

const __dirname = path.resolve()

// middleware : 
app.use(express.json({ limit: '50mb' }))
app.use(urlencoded({ extended: true, limit: '50mb' }))
app.use(cookieParser())
app.use(cors({
    // origin : 'https://rent-vehicle-project.onrender.com' ,
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: "Content-Type,Authorization",
    credentials: true
}))
// init passport : 
app.use(passport.initialize())

// log request : 
app.use((req, res, next) => {
    console.log(`Request Info : ${req.method} ${req.url}`);
    next()
})



// home page route : 
app.get('/api', (req, res) => {
    res.json({ message: "app running success!" })
})

// authentication routes : 
app.use('/api/auth', authRoutes)
// authentication routes for OAUTH :

// Login with Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/", session: false }), (req, res) => sendJWT(req, res));

// Login with Facebook
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["public_profile","email"] }));
app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/", session: false }), (req, res) => sendJWT(req, res));

// Login with GitHub
app.get("/auth/github", passport.authenticate("github", { scope: ["repo", "user", "user:email"] }),);
app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/", session: false }), (req, res) => sendJWT(req, res));

// Generate JWT & Send as Cookie
function sendJWT(req, res) {
    // get token that create in Strategy callback : 
    const { token } = req.user;
    // set cookie : 
    res.cookie('jwt_token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day , 
        httpOnly: true,
        sameSite: 'Strict',
    })
    // return to homepage : 
    return res.status(200).json({ message: 'authenticated with oauth successfully!' })
}


// OWNER ROUTES : 
app.use('/api/owner/add-on', addOnRoutes)
app.use('/api/owner/store-location', storeLocationRoutes)
app.use('/api/owner/motobike-type', motobikeTypeRoutes)
app.use('/api/owner/motobike', motobikeRoutes)

// CUSTOMER ROUTES : 
app.use('/api/customer/search', customerSearchRoutes)
app.use('/api/customer/booking', customerBookingRoutes)

// ADMIN ROUTES : 
app.use('/api/admin/view', adminRoutes)

// 
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}


// port : 
const PORT = process.env.PORT || 5001
// listen port : 
app.listen(PORT, (req, res) => {
    console.log(`App running on http://localhost:${PORT}`);
    // connect to db : 
    connectDB()
})