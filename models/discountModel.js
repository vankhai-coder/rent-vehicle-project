import mongoose from "mongoose";

const discountSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The owner who offers the discount
        motobikeType: { type: mongoose.Schema.Types.ObjectId, ref: "MotobikeType", required: true }, // Discount applies to this motobike type
        isValid: { type: Boolean, default: true }, // Whether the discount is still active
        percentage: { type: Number, required: true, min: 0, max: 100 } // Discount percentage (0-100)
    },
    { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
