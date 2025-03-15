import User from '../../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        // require email and password fields : 
        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'All fields required!' })
        }
        // check if user exist : 
        const existUser = await User.findOne({ email })
        if (existUser) {
            return res.status(400).json({ error: true, message: 'email already exist!' })
        }
        // if email is ok : 
        const newUser = await User.create({ email, password })
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
        // await for 3 second : 
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // response
        return res.status(201).json({ error: false, message: 'User register successfully!', user: { email: newUser.email, fullName: newUser.fullName, userId: newUser._id, role: newUser.role, userImage: newUser.image } })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error!' })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // check required : 
        if (!email || !password) {
            return res.status(400).json({ error: true, message: "All fields required!" })
        }
        // check email exist : 
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: true, message: "Invalid credential!" })
        }
        // check if user is banned : 
        if (user.isBanned) {
            return res.status(400).json({ error: true, message: "Account is banned!" })
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
        // await for 3 second : 
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // response
        return res.status(200).json({ error: false, message: 'Log in successfully!', user: { email: user.email, fullName: user.fullName, userId: user._id, role: user.role, userImage: user.image } })
    } catch (error) {
        console.log("error in login : ", error.message);
        return res.status(500).json({ error: true, message: 'Internal Server Error!' })
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the authentication cookie
        res.clearCookie('jwt_token', {
            httpOnly: true, // Ensures the cookie can't be accessed via JavaScript
            sameSite: 'strict' // Prevents cross-site request forgery
        });
        // await for 3 second : 
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Send success response
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log('Error during logout:', error);

        // Send error response
        return res.status(500).json({ message: 'Error during logout' });
    }
};

export const updatePassword = async (req, res) => {
    try {
        // get currentPassword , newPassword : 
        const { currentPassword, newPassword } = req.body
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: true, message: "All fields required!" })
        }
        // get user : 
        const userId = req.user.userId
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ error: true, message: "Can not find this user!" })
        }
        // check if current password is match with database : 
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({ error: true, message: "Current password is incorrect!" })
        }
        // update password : 
        user.password = newPassword
        // save : 
        await user.save()
        // await for 3 second : 
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // response : 
        return res.status(200).json({ error: false, message: "Update password successfully!" })
    } catch (error) {
        console.log('Error when update password : ', error);
        return res.status(500).json({ error: false, message: "Internal server error!" })
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