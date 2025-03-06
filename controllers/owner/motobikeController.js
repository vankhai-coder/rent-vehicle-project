import Motobike from "../../models/motobikeModel.js";

export const createMotobike = async (req, res) => {
    try {
        // only owner can create : 
        if( req.user.role !=='owner'){
            return res.status(401).json({ error: true, message: "Unauthorizied , can not access this route!" });
        }
        const { vehicleNumber, motobikeType, freeAddons, storeLocation, pricePerDay } = req.body;
        const owner = req.user.userId; // Extract owner from authenticated user

        // Validate required fields
        if (!vehicleNumber || !motobikeType || !storeLocation || !pricePerDay) {
            return res.status(400).json({ error: true, message: "All required fields must be provided!" });
        }

        // Check if vehicle number already exists
        const existingMotobike = await Motobike.findOne({ vehicleNumber });
        if (existingMotobike) {
            return res.status(400).json({ error: true, message: "Vehicle number already exists!" });
        }

        // Create new motobike document
        const newMotobike = await Motobike.create({
            vehicleNumber,
            owner,
            motobikeType,
            bookedDate: [], // Default empty array
            freeAddons: freeAddons || [], // Default empty array if not provided
            storeLocation,
            isAvailable: true, // Default to available
            pricePerDay
        });

        return res.status(201).json({
            error: false,
            message: "Motobike created successfully!",
            data: newMotobike
        });
    } catch (error) {
        console.error("Error creating motobike:", error);
        return res.status(500).json({ error: true, message: "Server error while creating motobike!" });
    }
};
