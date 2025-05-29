import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String },
        age: { type: Number },
        phone: { type: String },
        email: { type: String, unique: true },
        password: { type: String},
        gender: { type: String, enum: ["male", "female"] },
        address: { type: String },
        commune: { type: String },
        district: { type: String },
        province: { type: String },
        image: { type: String },
        isBanned: { type: Boolean, default: false },
        role: { type: String, enum: ["customer", "admin", "owner"], required: true, default: 'customer' },
        driverLicense: {
            before: { type: String },
            after: { type: String }
        },
        identityCard: {
            before: { type: String },
            after: { type: String }
        },
        // field for oauth : 
        authMethod: {
            type: String,
            enum: ['mail', 'oauth']
        },
        provider: {
            type: String,
            enum: ['google', 'facebook', 'github'], 
        },
        providerId: {
            type: String,
        }
    },
    { timestamps: true }
);

// middleware  : 
// hash password before save (use for new or update password) :
userSchema.pre('save', async function (next) {
    try {
        // if password is not change : 
        if (!this.isModified('password')) return next()
        // hash password if it is new or change :
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        console.log('Error when hashpassword : ', error.message);
        next()
    }
})

// instance method for compare password : 
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error("Error comparing password: ", error);
        return false;
    }
};


// create model : 
const User = mongoose.model("User", userSchema);
export default User;
