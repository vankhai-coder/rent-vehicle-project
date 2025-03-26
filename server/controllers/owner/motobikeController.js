import Motobike from "../../models/motobikeModel.js";
import User from '../../models/userModel.js'
import MotobikeType from '../../models/motobikeTypeModel.js'
import StoreLocation from '../../models/storeLocationModel.js'
import mongoose from 'mongoose';

export const createMotobike = async (req, res) => {
    try {
        // only owner can create : 
        if (req.user.role !== 'owner') {
            return res.status(401).json({ error: true, message: "Unauthorized, cannot access this route!" });
        }

        const { vehicleNumber, motobikeType, freeAddons, storeLocation, pricePerDay } = req.body;
        const owner = req.user.userId; // Extract owner from authenticated user

        // Validate required fields
        if (!vehicleNumber || !motobikeType || !storeLocation || !pricePerDay) {
            return res.status(400).json({ error: true, message: "All required fields must be provided!" });
        }

        // Validate ObjectIds
        if (!mongoose.Types.ObjectId.isValid(motobikeType)) {
            return res.status(400).json({ error: true, message: "Invalid motobikeType ID!" });
        }

        if (!mongoose.Types.ObjectId.isValid(storeLocation)) {
            return res.status(400).json({ error: true, message: "Invalid storeLocation ID!" });
        }

        // Validate freeAddons: Ensure it's an array of ObjectIds
        if (freeAddons && !Array.isArray(freeAddons)) {
            return res.status(400).json({ error: true, message: "freeAddons must be an array of ObjectIds!" });
        }

        for (const addon of freeAddons || []) {
            if (!mongoose.Types.ObjectId.isValid(addon)) {
                return res.status(400).json({ error: true, message: `Invalid addon ID: ${addon}` });
            }
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

        return res.status(201).json(newMotobike);
    } catch (error) {
        console.error("Error creating motobike:", error);
        return res.status(500).json({ error: true, message: "Server error while creating motobike!" });
    }
};

// get all motobike for owner and admin : 
export const getAllMotobikes = async (req, res) => {
    try {
        // only owner and admin : 
        if (req.user.role !== 'owner' && req.user.role !== 'admin') {
            return res.status(401).json({ error: true, message: "Unauthorized, cannot access this route!" });
        }
        let motobikes;
        const userRole = req.user.role;

        if (userRole === 'owner') {
            motobikes = await Motobike.find({ owner: req.user.userId }).sort({createdAt : -1})
                .populate('owner', 'fullName email') // Fetch owner's fullName and email
                .populate('motobikeType', 'name')   // Fetch motobikeType name
                .populate('storeLocation', 'address commune district province'); // Fetch storeLocation fields
        } else if (userRole === 'admin') {
            motobikes = await Motobike.find({}).sort({createdAt : -1})
                .populate('owner', 'fullName email') // Fetch owner's fullName and email
                .populate('motobikeType', 'name')   // Fetch motobikeType name
                .populate('storeLocation', 'address commune district province'); // Fetch storeLocation fields
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }

        const formattedMotobikes = motobikes.map((bike) => ({
            ownerName: bike.owner.fullName || bike.owner.email,
            motobikeName: bike.motobikeType.name,
            vehicleNumber: bike.vehicleNumber,
            pricePerDay: bike.pricePerDay,
            storeLocation: `${bike.storeLocation.address}, ${bike.storeLocation.commune}, ${bike.storeLocation.district}, ${bike.storeLocation.province}`,
        }));

        res.status(200).json(formattedMotobikes);
    } catch (error) {
        console.error('Error fetching motobikes: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
