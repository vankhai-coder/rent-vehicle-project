import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import Booking from "../../models/bookingModel.js";
import Motobike from "../../models/motobikeModel.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const bookMotobike = async (req, res) => {
    try {
        // Only customers are allowed to book
        if (req.user.role !== 'customer') {
            return res.status(403).json({ error: true, message: 'Only customers can book!' });
        }

        // Extract customerId from req.user
        const customerId = req.user.userId;
        const {
            ownerId,
            motobike,
            totalPrice,
            bookedDate,
            amountMotobike,
            pickUpLocation,
            dropOffLocation,
        } = req.body; // Extract data from the request body

        // Validate fields
        if (!customerId) return res.status(400).json({ success: false, error: "Customer ID is required" });
        if (!ownerId) return res.status(400).json({ success: false, error: "Owner ID is required" });
        if (!motobike || !Array.isArray(motobike) || motobike.length === 0) {
            return res.status(400).json({ success: false, message: "Motobike ID is required" });
        }
        if (!totalPrice) return res.status(400).json({ success: false, error: "Total price is required" });
        if (!bookedDate || !Array.isArray(bookedDate) || bookedDate.length === 0) {
            return res.status(400).json({ success: false, error: "Booked dates must be an array and cannot be empty" });
        }
        if (!amountMotobike) return res.status(400).json({ success: false, error: "Amount of motobikes is required" });
        if (!pickUpLocation) return res.status(400).json({ success: false, error: "Pick-up location is required" });
        if (!dropOffLocation) return res.status(400).json({ success: false, error: "Drop-off location is required" });

        // Validate totalPrice and amountMotobike
        if (typeof totalPrice !== "number" || totalPrice <= 0) {
            return res.status(400).json({ success: false, error: "Total price must be a positive number" });
        }
        if (typeof amountMotobike !== "number" || amountMotobike < 1) {
            return res.status(400).json({ success: false, error: "Amount of motobikes must be at least 1" });
        }

        // Validate and normalize bookedDate array
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = bookedDate.map(date => {
            if (isNaN(new Date(date).getTime())) {
                throw new Error(`Invalid date format: ${date}`);
            }
            return dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate(); // Normalize to UTC
        });

        // Create a new booking
        const newBooking = new Booking({
            customerId,
            ownerId,
            motobike,
            totalPrice,
            bookedDate: normalizedDates, // Use normalized UTC dates
            amountMotobike,
            pickUpLocation,
            dropOffLocation,
            status: "renting", // Default status
        });

        // Save the booking to the database
        const savedBooking = await newBooking.save();
        // Update the bookedDate field for each motobike in the list
        await Promise.all(
            motobike.map(motobikeId =>
                Motobike.findByIdAndUpdate(
                    motobikeId, // Find motobike by its ID
                    { $push: { bookedDate: { $each: normalizedDates } } }, // Add the dates to the bookedDate array
                    { new: true } // Return the updated motobike document
                )
            )
        );
        // Respond with the saved booking
        return res.status(201).json({ success: true, data: savedBooking });
    } catch (error) {
        console.error("Error booking motobike:", error.message);
        return res.status(500).json({ success: false, error: error.message }); // Return error details
    }
};

