import mongoose from "mongoose";

const motobikeTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        image: { type: String ,required: true}, // Store URL 
        description: { type: String,required: true },
        color: { type: String,required: true }
    },
    { timestamps: true }
);

const MotobikeType = mongoose.model("MotobikeType", motobikeTypeSchema);
export default MotobikeType;
