import Motobike from "../../models/motobikeModel.js";
import Booking from "../../models/bookingModel.js";
import Feedback from "../../models/feedbackModel.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import MotobikeType from "../../models/motobikeTypeModel.js";
import StoreLocation from "../../models/storeLocationModel.js";

dayjs.extend(utc);
dayjs.extend(timezone);

// search by 1 category : 

export const searchMotoByListOfDates = async (req, res) => {
    try {
        // Extract dates from the request body
        const { dates } = req.body; // Array of booked dates

        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({ message: "Invalid date list" });
        }

        // Convert all dates to UTC (midnight Vietnam time → UTC)
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = dates.map(date =>
            dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate()
        );

        console.log('normalizedDates', normalizedDates);

        // Find motobike IDs that are already booked on the given dates
        const bookedMotobikeIds = await Booking.find({
            bookedDate: { $in: normalizedDates }
        }).distinct("motobike");

        // Find available motobikes that are NOT booked on those dates
        const availableMotobikes = await Motobike.find({
            _id: { $nin: bookedMotobikeIds }
        })
            .populate("motobikeType")
            .populate("storeLocation")
            .populate("freeAddons");

        // Use a Map to ensure one motobike type per district
        const uniqueMotobikes = new Map();

        availableMotobikes.forEach(moto => {
            const uniqueKey = `${moto.motobikeType._id}_${moto.storeLocation.district}`;

            // Add only one motobike per type per district
            if (!uniqueMotobikes.has(uniqueKey)) {
                uniqueMotobikes.set(uniqueKey, {
                    _id: moto.motobikeType._id,
                    image: moto.motobikeType.image,
                    district: moto.storeLocation.district,
                    listOfAddon: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image // Include the image field for addons
                    })),
                    pricePerDay: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    numberOfFeedback: 0, // Placeholder for now
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight,
                    description: moto.motobikeType.description,
                    color: moto.motobikeType.color
                });
            }
        });

        // Add feedback counts for each unique motobike
        const result = await Promise.all(
            Array.from(uniqueMotobikes.values()).map(async (moto) => {
                moto.numberOfFeedback = await Feedback.countDocuments({ motobike: moto._id });
                return moto;
            })
        );

        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const searchMotoBikeByType = async (req, res) => {
    try {
        const motobikeTypeId = req.params.motobikeTypeId;

        // Find all available motobikes of the specified type
        const motobikes = await Motobike.find({
            motobikeType: motobikeTypeId,
            isAvailable: true
        }).populate([
            { path: "storeLocation", select: "district" },
            { path: "freeAddons", select: "name image" },
            { path: "motobikeType", select: "name height weight image description color" }
        ]);

        // Use a Map to keep track of the first motobike per district
        const uniqueMotobikes = new Map();

        motobikes.forEach(moto => {
            const district = moto.storeLocation.district;

            // If the district is not already in the map, add the motobike
            if (!uniqueMotobikes.has(district)) {
                uniqueMotobikes.set(district, {
                    storeLocationDistrict: district,
                    pricePerDay: moto.pricePerDay,
                    freeAddons: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    motobikeTypeDetails: {
                        name: moto.motobikeType.name,
                        height: moto.motobikeType.height,
                        weight: moto.motobikeType.weight,
                        image: moto.motobikeType.image,
                        description: moto.motobikeType.description,
                        color: moto.motobikeType.color
                    }
                });
            }
        });

        // Convert the Map's values to an array for the response
        const results = Array.from(uniqueMotobikes.values());

        res.status(200).json(results);
    } catch (err) {
        console.error("Error searching motobike by type:", err.message);
        res.status(500).json({ error: err.message });
    }
};

export const searchByDistrict = async (req, res) => {
    try {
        // Extract the district from the request body
        const { district } = req.body;

        if (!district) {
            return res.status(400).json({ success: false, message: "District is required" });
        }

        // Find all motobikes in the specified district
        const motobikes = await Motobike.find()
            .populate([
                { path: "storeLocation", select: "district" },
                { path: "freeAddons", select: "name image" },
                { path: "motobikeType", select: "name height weight image description color" }
            ])
            .lean(); // Use lean to get plain JavaScript objects for easier processing

        // Filter motobikes belonging to the specified district
        const filteredByDistrict = motobikes.filter(
            moto => moto.storeLocation.district === district
        );

        // Use a Map to ensure only one motobike is returned per type
        const uniqueMotobikeTypes = new Map();

        filteredByDistrict.forEach(moto => {
            const motobikeTypeId = moto.motobikeType._id.toString();

            // Add only the first motobike of each type to the Map
            if (!uniqueMotobikeTypes.has(motobikeTypeId)) {
                uniqueMotobikeTypes.set(motobikeTypeId, {
                    storeLocationDistrict: moto.storeLocation.district,
                    pricePerDay: moto.pricePerDay,
                    freeAddons: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    motobikeTypeDetails: {
                        name: moto.motobikeType.name,
                        height: moto.motobikeType.height,
                        weight: moto.motobikeType.weight,
                        image: moto.motobikeType.image,
                        description: moto.motobikeType.description,
                        color: moto.motobikeType.color
                    }
                });
            }
        });

        // Convert the Map's values to an array for the response
        const results = Array.from(uniqueMotobikeTypes.values());

        res.status(200).json({ success: true, data: results });
    } catch (error) {
        console.error("Error searching by district:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

// search by 2 categories :

export const searchByDatesAndType = async (req, res) => {
    try {
        const { motobikeTypeName, dates } = req.body;

        // Validate input
        if (!motobikeTypeName) {
            return res.status(400).json({ success: false, message: "Motobike type name is required" });
        }
        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid date list" });
        }

        // Normalize dates from Vietnam timezone to UTC
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = dates.map(date =>
            dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate()
        );

        // Find the motobike type by name
        const motobikeType = await MotobikeType.findOne({ name: motobikeTypeName });
        if (!motobikeType) {
            return res.status(404).json({ success: false, message: "Motobike type not found" });
        }

        // Query to find motobikes available by type and excluding booked dates
        const motobikes = await Motobike.aggregate([
            {
                $match: {
                    motobikeType: motobikeType._id,
                    isAvailable: true,
                    bookedDate: { $not: { $elemMatch: { $in: normalizedDates } } }
                }
            },
            {
                $lookup: {
                    from: "storelocations",
                    localField: "storeLocation",
                    foreignField: "_id",
                    as: "storeLocationDetails"
                }
            },
            {
                $unwind: "$storeLocationDetails"
            },
            {
                $group: {
                    _id: "$storeLocationDetails.district",
                    motobike: { $first: "$$ROOT" } // Select only one motobike per district
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$motobike"
                }
            }
        ]);

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified criteria" });
        }

        // Respond with the motobikes (one per district)
        return res.status(200).json({
            success: true,
            message: "Available motobikes fetched successfully (one per district)",
            data: motobikes
        });
    } catch (error) {
        console.error("Error in searchByDatesAndType: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const searchByDatesAndDistrict = async (req, res) => {
    try {
        const { district, dates } = req.body;

        // Validate input
        if (!district) {
            return res.status(400).json({ success: false, message: "District is required" });
        }
        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid date list" });
        }

        // Normalize dates from Vietnam timezone to UTC
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = dates.map(date =>
            dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate()
        );

        // Find all store locations in the specified district
        const storeLocations = await StoreLocation.find({ district });
        if (storeLocations.length === 0) {
            return res.status(404).json({ success: false, message: "No stores found in the specified district" });
        }
        const storeLocationIds = storeLocations.map(location => location._id);

        // Query for motobikes in the district that match criteria
        const motobikes = await Motobike.find({
            storeLocation: { $in: storeLocationIds },
            isAvailable: true,
            bookedDate: { $not: { $elemMatch: { $in: normalizedDates } } }
        }).populate("storeLocation motobikeType owner");

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified criteria" });
        }

        // Create a map to store only one motobike per type
        const uniqueMotobikes = new Map();
        motobikes.forEach(motobike => {
            const motobikeTypeId = motobike.motobikeType._id.toString();
            if (!uniqueMotobikes.has(motobikeTypeId)) {
                uniqueMotobikes.set(motobikeTypeId, motobike); // Add the first motobike of this type
            }
        });

        // Convert the map back to an array of unique motobikes
        const result = Array.from(uniqueMotobikes.values());

        // Respond with one motobike per type
        return res.status(200).json({
            success: true,
            message: "Available motobikes fetched successfully (one per type)",
            data: result
        });
    } catch (error) {
        console.error("Error in searchByDatesAndDistrict: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const searchByTypeAndDistrict = async (req, res) => {
    try {
        const { motobikeTypeName, district } = req.body;

        // Validate input
        if (!motobikeTypeName) {
            return res.status(400).json({ success: false, message: "Motobike type name is required" });
        }
        if (!district) {
            return res.status(400).json({ success: false, message: "District is required" });
        }

        // Find the motobike type by name
        const motobikeType = await MotobikeType.findOne({ name: motobikeTypeName });
        if (!motobikeType) {
            return res.status(404).json({ success: false, message: "Motobike type not found" });
        }

        // Find all store locations in the specified district
        const storeLocations = await StoreLocation.find({ district });
        if (storeLocations.length === 0) {
            return res.status(404).json({ success: false, message: "No stores found in the specified district" });
        }
        const storeLocationIds = storeLocations.map(location => location._id);

        // Query for motobikes that match the type and are in the specified district
        const motobikes = await Motobike.find({
            motobikeType: motobikeType._id,
            storeLocation: { $in: storeLocationIds },
            isAvailable: true
        }).populate("storeLocation motobikeType owner");

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified type and district" });
        }

        // Use a Map to ensure one motobike per type
        const uniqueMotobikes = new Map();
        motobikes.forEach(motobike => {
            const motobikeTypeId = motobike.motobikeType._id.toString();
            if (!uniqueMotobikes.has(motobikeTypeId)) {
                uniqueMotobikes.set(motobikeTypeId, motobike); // Add the first motobike of this type
            }
        });

        // Convert the map back to an array
        const result = Array.from(uniqueMotobikes.values());

        // Respond with one motobike per type
        return res.status(200).json({
            success: true,
            message: "Available motobikes fetched successfully (one per type)",
            data: result
        });
    } catch (error) {
        console.error("Error in searchByTypeAndDistrict: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};



// search by 3 categories : 
export const searchByDistrictWithDatesAndType = async (req, res) => {
    try {
        const { district, motobikeTypeName, dates } = req.body;

        // Validate input
        if (!district) {
            return res.status(400).json({ success: false, message: "District is required" });
        }
        if (!motobikeTypeName) {
            return res.status(400).json({ success: false, message: "Motobike type name is required" });
        }
        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid date list" });
        }

        // Normalize dates from Vietnam timezone to UTC
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = dates.map(date =>
            dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate()
        );

        // Find the motobike type by name
        const motobikeType = await MotobikeType.findOne({ name: motobikeTypeName });
        if (!motobikeType) {
            return res.status(404).json({ success: false, message: "Motobike type not found" });
        }

        // Find store locations in the specified district
        const storeLocations = await StoreLocation.find({ district });
        if (storeLocations.length === 0) {
            return res.status(404).json({ success: false, message: "No stores found in the specified district" });
        }
        const storeLocationIds = storeLocations.map(location => location._id);

        // Query matching motobikes
        const matchingMotobikes = await Motobike.find({
            storeLocation: { $in: storeLocationIds },
            motobikeType: motobikeType._id,
            isAvailable: true,
            bookedDate: { $not: { $elemMatch: { $in: normalizedDates } } } // Exclude if dates overlap
        }).populate("storeLocation motobikeType owner");

        if (matchingMotobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified criteria" });
        }

        // Get the IDs of all available motobikes
        const motobikesAvailableIds = matchingMotobikes.map(motobike => motobike._id);

        // Optionally retrieve one motobike to show as an example
        const motobikeExample = matchingMotobikes[0]; // Take the first motobike as an example

        // Format the example data with detailed motobike information
        const formattedResponse = {
            ownerId: motobikeExample.owner._id.toString(),
            motobike: motobikesAvailableIds,
            bookedDate: dates,
            amountMotobike: matchingMotobikes.length,
            example: {
                motobikeId: motobikeExample._id.toString(),
                vehicleNumber: motobikeExample.vehicleNumber,
                storeLocation: motobikeExample.storeLocation.address + " - " + motobikeExample.storeLocation.commune + " - " + motobikeExample.storeLocation.district + " - " + motobikeExample.storeLocation.province,
                motobikeType: motobikeExample.motobikeType.name,
                isAvailable: motobikeExample.isAvailable,
                pricePerDay: motobikeExample.pricePerDay,
                color: motobikeExample.motobikeType.color,
            }
        };

        // Respond with the formatted result
        return res.status(200).json({
            success: true,
            message: "Motobike search completed successfully",
            data: formattedResponse
        });
    } catch (error) {
        console.error("Error in searchByDistrictWithDatesAndType: ", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};





