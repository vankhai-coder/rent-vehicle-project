import User from "../../models/userModel.js";
import mongoose from "mongoose";
import StoreLocation from "../../models/storeLocationModel.js";

export const createStoreLocation = async (req, res) => {
    try {
        const { province, district, commune, address } = req.body;
        const { userId } = req.user; // Extract userId from req.user

        // Validate required fields
        if (!province || !district || !commune || !address) {
            return res.status(400).json({ error: true, message: "All fields are required!" });
        }

        //  Check if userId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: true, message: "Invalid User ID!" });
        }

        // Check if the User exists in the database
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ error: true, message: "User not found!" });
        }

        // Check if the location already exists for this owner
        const existingLocation = await StoreLocation.findOne({
            province,
            district,
            commune,
            address
        });

        if (existingLocation) {
            return res.status(400).json({ error: true, message: "Location already exists!" });
        }

        //  Create a StoreLocation with the logged-in user's ID as the owner
        const newStoreLocation = await StoreLocation.create({
            owner: userId,
            province,
            district,
            commune,
            address,
        });

        return res.status(201).json({
            error: false,
            message: "Store location created successfully!",
            data: newStoreLocation,
        });
    } catch (error) {
        console.error("Error creating store location:", error);
        return res.status(500).json({ error: true, message: "Server error while creating store location!" });
    }
};

