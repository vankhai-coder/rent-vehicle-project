import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The customer booking the motobike
        ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The owner of the motobike
        motobike: { type: mongoose.Schema.Types.ObjectId, ref: "Motobike", required: true }, // The booked motobike
        totalPrice: { type: Number, required: true, min: 0 }, // Total price of the booking
        bookedDate: [{ type: Date, required: true }], // Dates the motobike is booked for
        amountMotobike: { type: Number, required: true, min: 1 }, // Number of motobikes booked
        status: {
            type: String,
            enum: ["canceled", "completed", "renting"],
            default: "renting"
        }, // Booking status
        pickUpLocation: { type: String, required: true }, // Where the customer picks up the motobike
        dropOffLocation: { type: String, required: true } // Where the customer returns the motobike
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
