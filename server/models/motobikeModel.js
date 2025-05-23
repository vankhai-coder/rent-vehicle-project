import mongoose from "mongoose";

const motobikeSchema = new mongoose.Schema(
    {
        vehicleNumber: { type: String, required: true, unique: true },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        motobikeType: { type: mongoose.Schema.Types.ObjectId, ref: "MotobikeType", required: true },
        bookedDate: {
            type: [Date],
            default: []
        },
        freeAddons: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Addon',
            default: []
        },
        storeLocation: { type: mongoose.Schema.Types.ObjectId, ref: "StoreLocation", required: true },
        isAvailable: { type: Boolean, default: true },
        pricePerDay: {
            type: Number,
            required: true,
            min: [1, "Price per day must be at least 1"]
        }
    },
    { timestamps: true }
);

const Motobike = mongoose.model("Motobike", motobikeSchema);
export default Motobike;
