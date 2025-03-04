import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String },
        username: { type: String, unique: true, required: true },
        age: { type: Number },
        phone: { type: String },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        gender: { type: String, enum: ["male", "female"] },
        address: { type: String },
        commute: { type: String },
        district: { type: String },
        province: { type: String },
        image: { type: String }, // Store URL or file path
        isBanned: { type: Boolean, default: false },
        role: { type: String, enum: ["customer", "admin", "owner"], required: true, default: 'customer' },
        driverLicencs: [{ type: String }], // Array of driver license images or numbers
        identityCard: [{ type: String }]   // Array of identity card images or numbers
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
userSchema.methods.isPasswordCorrect = async function (enterdPassword) {
    return  bcrypt.compare(enterdPassword, this.password)
}

// create model : 
const User = mongoose.model("User", userSchema);
export default User;
