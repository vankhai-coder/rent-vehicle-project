import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

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
    origin: process.env.CLIENT_ORIGIN,
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
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], prompt: 'consent' }));
app.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
        if (err || !user) {
            if (req.query.error === "access_denied") {
                return res.status(403).json({ success: false, message: "User denied access to Google OAuth." });
            }
            return res.status(401).json({ success: false, message: "Authentication failed." });
        }
        // Generate JWT & Send as Cookie : 
        sendJWT(user, res);
    })(req, res, next);
});

// Login with Facebook
app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["public_profile", "email"], prompt: 'consent' }));
app.get("/auth/facebook/callback", (req, res, next) => {
    passport.authenticate("facebook", { session: false }, (err, user, info) => {
        if (err || !user) {
            if (req.query.error === "access_denied") {
                return res.status(403).json({ success: false, message: "User denied access to Facebook OAuth." });
            }
            return res.status(401).json({ success: false, message: "Authentication failed." });
        }
        // Generate JWT & Send as Cookie : 
        sendJWT(user, res);
    })(req, res, next);
});

// Login with GitHub
app.get("/auth/github", passport.authenticate("github", { scope: ["user:email", 'public_profile'], prompt: 'consent' }),);
app.get("/auth/github/callback", (req, res, next) => {
    passport.authenticate("github", { session: false }, (err, user, info) => {
        if (err || !user) {
            if (req.query.error === "access_denied") {
                return res.status(403).json({ success: false, message: "User denied access to Github OAuth." });
            }
            return res.status(401).json({ success: false, message: "Authentication failed." });
        }
        // Generate JWT & Send as Cookie : 
        sendJWT(user, res);
    })(req, res, next);
});

// Generate JWT & Send as Cookie
function sendJWT(user, res) {
    // get token that create in Strategy callback : 
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    // set cookie : 
    res.cookie('jwt_token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day , 
        httpOnly: true,
        sameSite: 'Strict',
    })
    // return to  login with param oauth=success : 
    // return res.status(200).json({ message: 'authenticated with oauth successfully!', user: { email: user.email, fullName: user.fullName, userId: user._id, role: user.role, userImage: user.image } })
    return res.redirect(`${process.env.CLIENT_ORIGIN}/login?oauth=success`)
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