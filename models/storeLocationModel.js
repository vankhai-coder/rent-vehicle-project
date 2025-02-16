import mongoose from "mongoose";

const storeLocationSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        province: { type: String, required: true },
        district: { type: String, required: true },
        commune: { type: String, required: true },
        address: { type: String, required: true } 
    },
    { timestamps: true }
);

const StoreLocation = mongoose.model("StoreLocation", storeLocationSchema);
export default StoreLocation;
