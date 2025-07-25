import User from '../../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cloudinary from '../../config/cloudinary.js'
import crypto from 'crypto'
import { sendEmail } from '../../config/email.js'
import dotenv from 'dotenv'
dotenv.config({ path: '../../../.env' })

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        // require email and password fields : 
        if (!email || !password) {
            return res.status(400).json({ error: true, message: 'All fields required!' })
        }
        // check if user exist : 
        const existUser = await User.findOne({ email, authMethod: 'mail' })
        if (existUser) {
            return res.status(400).json({ error: true, message: 'This email using login with email already in use!' })
        }
        // if email is ok : 
        // hash password : 
        const hashedPassword = await bcrypt.hash(password, 10)

        // create verify token for this email : 
        const verifyToken = crypto.randomBytes(32).toString('hex')

        // create new user : 
        const newUser = await User.create({ email, password: hashedPassword, authMethod: 'mail', verifyToken })
        if (!newUser) {
            return res.status(400).json({ error: true, message: 'Error when create new user!' })
        }
        // send email : 
        await sendEmail(email, 'Verify email for rent-motobike', `Click <a href="https://rent-vehicle-project.onrender.com/register?userId=${newUser.id}&verifyToken=${verifyToken}">here</a> to verify your account!`)
        // response
        return res.status(201).json({ message: 'Send verify email successfully!', userId: newUser.id })

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
        const user = await User.findOne({ email, authMethod: 'mail' })
        if (!user) {
            console.log('can not find this userId!')
            return res.status(400).json({ error: true, message: "Invalid credential!" })
        }
        // check if account is verified : 
        if (!user.isVerifyAccount) {
            console.log('this account is not verify!')
            return res.status(400).json({ message: 'Account is not verified!', unverify: true })
        }
        // check if user is banned : 
        if (user.isBanned) {
            console.log('this account is banned!')
            return res.status(400).json({ error: true, message: "Account is banned!" })
        }
        // check if password correct : 
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            console.log('password is incorrect!')
            return res.status(400).json({ message: 'Unauthorizied! Try again!' })
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
        return res.status(200).json({ error: false, message: 'Log in successfully!', user: { email: user.email, fullName: user.fullName, userId: user._id, role: user.role, userImage: user.image } })
    } catch (error) {
        console.log("error in login : ", error.message);
        return res.status(500).json({ error: true, message: 'Internal Server Error!' })
    }
}

export const getUser = async (req, res) => {
    const { userId } = req.user
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: 'can not find this user!' })
        }
        return res.status(200).json({ user: { email: user.email, fullName: user.fullName, userId: user._id, role: user.role, userImage: user.image } })

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error!' })
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

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { fullName, age, phone, gender, address, commune, district, province, image, driverLicense, identityCard } = req.body;

        // Find user
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Function to upload base64 images to Cloudinary
        const uploadToCloudinary = async (base64, folder, public_id) => {
            if (base64?.startsWith('data:image')) {
                const result = await cloudinary.uploader.upload(base64, {
                    folder,
                    resource_type: "auto"
                });
                // delete old image :
                if (public_id) {
                    await cloudinary.uploader.destroy(`${folder}/${public_id}`);
                    console.log("Deleted old image : ", public_id);
                }
                // return new image url :
                return result.secure_url;
            }
            return base64; // If it's already a URL, keep it
        };

        // Handle profile image upload
        if (image) {
            if (user.image && user.image
                .startsWith('https://res.cloudinary.com')) {
                const public_id = user.image.split('/').pop().split('.')[0];
                // upload new image : 
                user.image = await uploadToCloudinary(image, "rent_moto_project/user_images", public_id);
            }
        }

        // Handle Driver License uploads
        if (driverLicense) {
            let public_id_driverLicense_before = null;
            let public_id_driverLicense_after = null;
            // Delete and upload driver license images :
            if (driverLicense?.before && driverLicense.before.startsWith('data:image')) {
                public_id_driverLicense_before = user.driverLicense.before.split('/').pop().split('.')[0];
                user.driverLicense.before = await uploadToCloudinary(driverLicense.before, "rent_moto_project/driver_licenses", public_id_driverLicense_before)
            }
            if (driverLicense?.after && driverLicense.after.startsWith('data:image')) {
                public_id_driverLicense_after = user.driverLicense.after.split('/').pop().split('.')[0];
                user.driverLicense.after = await uploadToCloudinary(driverLicense.after, "rent_moto_project/driver_licenses", public_id_driverLicense_after)
            }
        }

        // Handle Identity Card uploads
        if (identityCard) {
            let public_id_identityCard_before = null;
            let public_id_identityCard_after = null;
            // Delete and upload identity card images :
            if (identityCard?.before && identityCard.before.startsWith('data:image')) {
                public_id_identityCard_before = user.identityCard.before.split('/').pop().split('.')[0];
                user.identityCard.before = await uploadToCloudinary(identityCard.before, "rent_moto_project/identiry_cards", public_id_identityCard_before)
            }
            if (identityCard?.after && identityCard.after.startsWith('data:image')) {
                public_id_identityCard_after = user.identityCard.after.split('/').pop().split('.')[0];
                user.identityCard.after = await uploadToCloudinary(identityCard.after, "rent_moto_project/identiry_cards", public_id_identityCard_after)
            }
        }

        // Update other fields if provided
        if (fullName) user.fullName = fullName;
        if (age) user.age = age;
        if (phone) user.phone = phone;
        if (gender) user.gender = gender;
        if (address) user.address = address;
        if (commune) user.commune = commune;
        if (district) user.district = district;
        if (province) user.province = province;

        // Save updated user
        await user.save();


        // Return updated user
        return res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Error updating profile", error: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Get user ID from JWT

        // Find user by ID and exclude sensitive fields (like password)
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        return res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Error fetching profile" });
    }
};

export const verifyAccount = async (req, res) => {
    try {
        const { userId, verifyToken } = req.body
        if (!userId || !verifyToken) {
            console.log('userId,verifyToken fields required!');
            return res.status(400).json({ error: true, message: "userId,verifyToken fields required!" })
        }
        // find user with that id : 
        const user = await User.findById(userId)

        // if dont have user : 
        if (!user) {
            console.log("Can not verify this account , because can not find this user in database!");
            return res.status(400).json({ message: 'Can not verify this account , because can not find this user in database!' })
        }
        // if this user already verify : 
        if (user.isVerifyAccount) {
            console.log('This account already verify!');
            return res.status(400).json({ message: 'This account already verify!' })
        }
        // check match token : 
        const isMatchToken = verifyToken === user.verifyToken ? true : false
        if (!isMatchToken) {
            console.log('Can not verify this account because verify token is not match');
            return res.status(400).json({ message: 'Can not verify this account because verify token is not match' })
        }
        // verify account : 
        user.verifyToken = ''
        user.isVerifyAccount = true
        // save to db : 
        await user.save()
        // return 
        return res.status(200).json({ message: 'Verify account successfully!', user: { email: user.email, fullName: user.fullName, userId: user._id, role: user.role, userImage: user.image } })
    } catch (error) {
        console.log('error when register user : ', error.message);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}

export const resendVerifyEmail = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) {
            console.log('dont have email when resend!');
            return res.status(400).json({ message: 'Email field is required!' })
        }
        // find user with this email : 
        const user = await User.findOne({ email, authMethod: 'mail' })
        if (!user) {
            console.log('can not find this user in db!')
            return res.status(400).json({ message: 'Can not find user with this email!' })
        }
        // if user already verify : 
        if (user.isVerifyAccount) {
            console.log('this account is already verify!')
            return res.status(400).json({ message: 'Account already verify!' })
        }
        // reset some fields in user document : 
        const verifyToken = await crypto.randomBytes(32).toString('hex')
        console.log('created verify token!')
        user.verifyToken = verifyToken
        await user.save()
        // resend email : 
        await sendEmail(email, 'Verify email for rent-motobike', `Click <a href="${process.env.CLIENT_ORIGIN}/register?userId=${user.id}&verifyToken=${verifyToken}">here</a> to verify your account!`)
        // response : 
        return res.status(200).json({ message: 'Resend successfully!' })

    } catch (error) {
        console.log('error when resend verify account email: ', error.message);
        return res.status(500).json({ message: 'Internal server error!' })
    }
}