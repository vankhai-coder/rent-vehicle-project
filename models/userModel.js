import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        username: { type: String, unique: true },
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
        role: { type: String, enum: ["customer", "admin", "owner"], required: true , default : 'customer' },
        driverLicencs: [{ type: String }], // Array of driver license images or numbers
        identityCard: [{ type: String }]   // Array of identity card images or numbers
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
