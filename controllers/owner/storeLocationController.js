import User from "../../models/userModel.js";
import StoreLocation from "../../models/storeLocationModel.js";

export const createStoreLocation = async (req, res) => {
    try {
        // only owner can create : 
        if (req.user.role !== 'owner') {
            return res.status(401).json({ error: true, message: "Unauthorizied , can not access this route!" });
        }
        const { province, district, commune, address } = req.body;
        const { userId } = req.user; // Extract userId from req.user

        // Validate required fields
        if (!province || !district || !commune || !address) {
            return res.status(400).json({ error: true, message: "All fields are required!" });
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

export const getAllStoreLocationsOfEachOwner = async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === "owner") {
            // Owners can only retrieve their own store locations
            filter.owner = req.user.userId;
        } else if (req.user.role === "admin") {
            // Admins can retrieve store locations of any owner (by ownerId from request params)
            if (!req.params.ownerId) {
                return res.status(400).json({ error: true, message: "Owner ID is required" });
            }
            filter.owner = req.params.ownerId;
        } else {
            return res.status(401).json({ error: true, message: "Unauthorized to access this route!" });
        }

        // Retrieve store locations based on the filter
        const storeLocations = await StoreLocation.find(filter);

        return res.status(200).json({ success: true, data: storeLocations });
    } catch (error) {
        console.error("Error in getAllStoreLocationsOfEachOwner:", error);
        return res.status(500).json({ error: true, message: "Server Error" });
    }
};

