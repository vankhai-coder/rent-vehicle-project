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

        return res.status(201).json(newStoreLocation);
    } catch (error) {
        console.error("Error creating store location:", error);
        return res.status(500).json({ error: true, message: "Server error while creating store location!" });
    }
};

export const getAllStoreLocations = async (req, res) => {
    try {
        // Extract userId from the request
        const { userId } = req.user;

        // Find the user by ID to determine their role
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let storeLocations;

        // Fetch store locations based on user role
        if (user.role === "owner") {
            // If the user is an owner, retrieve their own store locations
            storeLocations = await StoreLocation.find({ owner: userId }).populate("owner", "fullName email").sort({ createdAt: -1 });
        } else if (user.role === "admin") {
            // If the user is an admin, retrieve all store locations
            storeLocations = await StoreLocation.find().populate("owner", "fullName email").sort({ createdAt: -1 });
        } else {
            return res.status(403).json({ message: "Access denied. Only owners and admins can view store locations." });
        }

        // Format the response
        const formattedLocations = storeLocations.map(location => ({
            storeLocationId : location._id , 
            ownerId: location.owner._id,
            ownerName: location.owner.fullName || location.owner.email,
            province: location.province,
            district: location.district,
            commune: location.commune,
            address: location.address
        }));

        // Send the formatted response
        res.status(200).json(formattedLocations);
    } catch (error) {
        console.error("Error fetching store locations: ", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

