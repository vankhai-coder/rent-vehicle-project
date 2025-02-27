import mongoose from "mongoose";

const motobikeTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        image: { type: String }, // Store URL 
        description: { type: String },
        color: { type: String }
    },
    { timestamps: true }
);

const MotobikeType = mongoose.model("MotobikeType", motobikeTypeSchema);
export default MotobikeType;
