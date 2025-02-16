import mongoose from "mongoose";

const motobikeSchema = new mongoose.Schema(
    {
        vehicleNumber: { type: String, required: true, unique: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        motobikeType: { type: mongoose.Schema.Types.ObjectId, ref: "MotobikeType", required: true },
        bookedDate: [{ type: Date }], // Array of booked dates
        freeAddons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Addon" }],
        storeLocation: { type: mongoose.Schema.Types.ObjectId, ref: "StoreLocation", required: true },
        isAvailable: { type: Boolean, default: true } 
    },
    { timestamps: true }
);

const Motobike = mongoose.model("Motobike", motobikeSchema);
export default Motobike;
