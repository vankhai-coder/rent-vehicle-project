import User from '../../models/userModel.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, password } = req.body
        // require username and password fields : 
        if (!username || !password) {
            return res.status(400).json({ error: true, message: 'All fields required!' })
        }
        // check if user exist : 
        const existUser = await User.findOne({ username })
        if (existUser) {
            return res.status(400).json({ error: true, message: 'username already exist!' })
        }
        // if username is ok : 
        const newUser = await User.create({ username, password })
        if (!newUser) {
            return res.status(400).json({ error: true, message: 'Error when create new user!' })
        }
        // if create success : 
        // generate jwt : 
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        // set cookie : 
        res.cookie('jwt_token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day , 
            httpOnly: true,
            sameSite: 'Strict',
        })
        // response
        return res.status(200).json({ error: false, message: 'User register successfully!' })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error!' })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        // check required : 
        if (!username || !password) {
            return res.status(400).json({ error: true, message: "All fields required!" })
        }
        // check username exist : 
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ error: true, message: "Invalid credential!" })
        }
        // check if password correct : 
        const passwordCorrect = await user.isPasswordCorrect(password)
        if (!passwordCorrect) {
            return res.status(400).json({ error: true, message: "Invalid credential!" })
        }
        // generate jwt : 
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
        // set cookie : 
        res.cookie('jwt_token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day , 
            httpOnly: true,
            sameSite: 'Strict',
        })
        // response
        return res.status(201).json({ error: false, message: 'Log in successfully!' })
    } catch (error) {
        console.log("error in login : ", error.message);
        return res.status(500).json({ error: true, message: 'Internal Server Error!' })
    }
}

export const checkAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt_token;
        if (!token) {
            return res.status(401).json({ error: true, message: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Add decoded user info to request object
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
};