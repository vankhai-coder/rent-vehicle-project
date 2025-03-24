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
        const { dates } = req.body;

        console.log('dates : ', dates);


        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({ message: "Invalid date list" });
        }

        // Convert all dates to UTC (midnight Vietnam time → UTC)
        const vietnamTimezone = "Asia/Ho_Chi_Minh";
        const normalizedDates = dates.map(date =>
            dayjs(date).tz(vietnamTimezone).startOf("day").utc().toDate()
        );

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
            .populate("freeAddons")
            .populate("owner", "_id"); // Populating owner to fetch ownerId

        // Use a Map to ensure one motobike type per district
        const uniqueMotobikes = new Map();

        availableMotobikes.forEach(moto => {
            const uniqueKey = `${moto.motobikeType._id}_${moto.storeLocation.district}`;

            // Add only one motobike per type per district
            if (!uniqueMotobikes.has(uniqueKey)) {
                uniqueMotobikes.set(uniqueKey, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: moto.storeLocation.district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map to an array for the final response
        const result = Array.from(uniqueMotobikes.values());

        return res.status(200).json(result);
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
            { path: "motobikeType", select: "name height weight image" },
            { path: "owner", select: "_id" } // Populate owner to get ownerId
        ]);

        // Use a Map to ensure one motobike per type per district
        const uniqueMotobikes = new Map();

        motobikes.forEach(moto => {
            const district = moto.storeLocation.district;

            // Add only the first motobike for each district
            if (!uniqueMotobikes.has(district)) {
                uniqueMotobikes.set(district, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map to an array for the response
        const results = Array.from(uniqueMotobikes.values());
        return res.status(200).json(results);
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

        // Find all motobikes and populate relevant fields
        const motobikes = await Motobike.find()
            .populate([
                { path: "storeLocation", select: "district" },
                { path: "freeAddons", select: "name image" },
                { path: "motobikeType", select: "name height weight image" },
                { path: "owner", select: "_id" } // Populate owner to fetch ownerId
            ])
            .lean();

        // Filter motobikes in the specified district
        const filteredByDistrict = motobikes.filter(
            moto => moto.storeLocation.district === district
        );

        // Use a Map to ensure one motorbike per type in the district
        const uniqueMotobikeTypes = new Map();

        filteredByDistrict.forEach(moto => {
            const uniqueKey = `${moto.motobikeType._id}_${moto.storeLocation.district}`;

            // Add only the first motobike of each type in the district
            if (!uniqueMotobikeTypes.has(uniqueKey)) {
                uniqueMotobikeTypes.set(uniqueKey, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: moto.storeLocation.district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map's values to an array for the response
        const results = Array.from(uniqueMotobikeTypes.values());

        res.status(200).json(results);
    } catch (error) {
        console.error("Error searching by district:", error.message);
        res.status(500).json({ error: true, error: error.message });
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
        const motobikes = await Motobike.find({
            motobikeType: motobikeType._id,
            isAvailable: true,
            bookedDate: { $not: { $elemMatch: { $in: normalizedDates } } }
        })
            .populate([
                { path: "storeLocation", select: "district" },
                { path: "freeAddons", select: "name image" },
                { path: "motobikeType", select: "name height weight image" },
                { path: "owner", select: "_id" } // Populate owner to fetch ownerId
            ]);

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified criteria" });
        }

        // Use a Map to ensure one motobike per district
        const uniqueMotobikes = new Map();

        motobikes.forEach(moto => {
            const uniqueKey = moto.storeLocation.district;

            // Add only the first motobike of the type in each district
            if (!uniqueMotobikes.has(uniqueKey)) {
                uniqueMotobikes.set(uniqueKey, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: moto.storeLocation.district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map to an array for the response
        const results = Array.from(uniqueMotobikes.values());

        // Respond with formatted data
        return res.status(200).json(results);
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

        // Query for motobikes in the district that are available on the specified dates
        const motobikes = await Motobike.find({
            storeLocation: { $in: storeLocationIds },
            isAvailable: true,
            bookedDate: { $not: { $elemMatch: { $in: normalizedDates } } }
        }).populate([
            { path: "storeLocation", select: "district" },
            { path: "freeAddons", select: "name image" },
            { path: "motobikeType", select: "name height weight image" },
            { path: "owner", select: "_id" } // Populate owner to get ownerId
        ]);

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified criteria" });
        }

        // Use a Map to ensure only one motobike per type in the district
        const uniqueMotobikes = new Map();
        motobikes.forEach(moto => {
            const motobikeTypeKey = `${moto.motobikeType._id}_${moto.storeLocation.district}`;
            if (!uniqueMotobikes.has(motobikeTypeKey)) {
                uniqueMotobikes.set(motobikeTypeKey, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: moto.storeLocation.district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map to an array for the response
        const results = Array.from(uniqueMotobikes.values());

        // Respond with formatted data
        return res.status(200).json(results);
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
        }).populate([
            { path: "storeLocation", select: "district" },
            { path: "freeAddons", select: "name image" },
            { path: "motobikeType", select: "name height weight image" },
            { path: "owner", select: "_id" } // Populate owner to get ownerId
        ]);

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified type and district" });
        }

        // Use a Map to ensure only one motobike per type in the district
        const uniqueMotobikes = new Map();
        motobikes.forEach(moto => {
            const motobikeTypeKey = `${moto.motobikeType._id}_${moto.storeLocation.district}`;
            if (!uniqueMotobikes.has(motobikeTypeKey)) {
                uniqueMotobikes.set(motobikeTypeKey, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: moto.storeLocation.district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map to an array for the response
        const results = Array.from(uniqueMotobikes.values());

        // Respond with formatted data
        return res.status(200).json(results);
    } catch (error) {
        console.error("Error in searchByTypeAndDistrict: ", error.message);
        return res.status(500).json({ error: true, message: "Internal server error" });
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

        // Query for motobikes matching the criteria
        const motobikes = await Motobike.find({
            storeLocation: { $in: storeLocationIds },
            motobikeType: motobikeType._id,
            isAvailable: true,
            bookedDate: { $not: { $elemMatch: { $in: normalizedDates } } }
        }).populate([
            { path: "storeLocation", select: "district" },
            { path: "freeAddons", select: "name image" },
            { path: "motobikeType", select: "name height weight image" },
            { path: "owner", select: "_id" } // Populate owner to get ownerId
        ]);

        if (motobikes.length === 0) {
            return res.status(404).json({ success: false, message: "No motobikes available for the specified criteria" });
        }

        // Use a Map to ensure only one motobike per type in the district
        const uniqueMotobikes = new Map();
        motobikes.forEach(moto => {
            const uniqueKey = `${moto.motobikeType._id}_${moto.storeLocation.district}`;
            if (!uniqueMotobikes.has(uniqueKey)) {
                uniqueMotobikes.set(uniqueKey, {
                    image: moto.motobikeType.image,
                    price: moto.pricePerDay,
                    name: moto.motobikeType.name,
                    addOns: moto.freeAddons.map(addon => ({
                        name: addon.name,
                        image: addon.image
                    })),
                    district: moto.storeLocation.district,
                    ownerId: moto.owner._id,
                    motobike: moto._id,
                    height: moto.motobikeType.height,
                    weight: moto.motobikeType.weight
                });
            }
        });

        // Convert the Map to an array for the response
        const results = Array.from(uniqueMotobikes.values());

        // Respond with formatted data
        return res.status(200).json(results);
    } catch (error) {
        console.error("Error in searchByDistrictWithDatesAndType: ", error.message);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
};

// get all district : 
export const getUniqueDistricts = async (req, res) => {
    try {
        const districts = await StoreLocation.aggregate([
            {
                $group: {
                    _id: "$district"
                }
            },
            {
                $project: {
                    _id: 0,
                    district: "$_id"
                }
            }
        ]);

        return res.status(200).json(districts.map(d => d.district));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// get all motobike type : 
export const getUniqueMotobikeTypeNames = async (req, res) => {
    try {
        const motobikeTypes = await MotobikeType.distinct("name");
        res.status(200).json(motobikeTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





