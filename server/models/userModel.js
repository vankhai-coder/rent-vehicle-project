import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String },
        age: { type: Number },
        phone: { type: String },
        email: { type: String }, 
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

// create model : 
const User = mongoose.model("User", userSchema);
export default User;
