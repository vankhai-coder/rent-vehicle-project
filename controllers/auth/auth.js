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
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY)
        // set cookie : 
        res.cookie('jwt_token', token, {
            maxAge: 1 * 24 * 60 * 60 * 1000 , // 1 day , 
            httpOnly: true,
            sameSite: 'Strict' ,
        })
        // response
        return res.status(201).json({ error: false, message: 'User register successfully!' })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error!' })
    }
}
