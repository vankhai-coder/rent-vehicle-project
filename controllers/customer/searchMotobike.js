import Motobike from "../../models/motobikeModel.js";
import Booking from "../../models/bookingModel.js";
import Feedback from "../../models/feedbackModel.js";
import Addon from "../../models/addonModel.js";
import MotobikeType from '../../models/motobikeTypeModel.js'
import mongoose from "mongoose";


export const searchMotoByListOfDates = async (req, res) => {
    try {
        // dates is list of [Date]
        const { dates } = req.body; // Array of booked dates

        if (!dates || !Array.isArray(dates) || dates.length === 0) {
            return res.status(400).json({ message: "Invalid date list" });
        }

        // Find motobike IDs that are already booked on the given dates
        const bookedMotobikeIds = await Booking.find({
            bookedDate: { $in: dates }
        }).distinct("motobike");

        // Find available motobikes that are NOT booked on those dates
        const availableMotobikes = await Motobike.find({
            _id: { $nin: bookedMotobikeIds }
        })
            .populate("motobikeType")
            .populate("storeLocation")
            .populate("addons");

        // Map the result to the desired response format
        const result = await Promise.all(availableMotobikes.map(async (moto) => {
            const numberOfFeedback = await Feedback.countDocuments({ motobike: moto._id });

            return {
                _id: moto.motobikeType._id,
                image: moto.image,
                province: moto.storeLocation.province,
                listOfAddon: moto.addons.map(addon => addon.name),
                pricePerDay: moto.pricePerDay,
                name: moto.motobikeType.name,
                numberOfFeedback,
                height: moto.motobikeType.height,
                weight: moto.motobikeType.weight,
                description: moto.motobikeType.description,
                color: moto.motobikeType.color
            };
        }));

        // Remove duplicate motobikeTypes, returning only one per type
        const uniqueMotobikeTypes = [];
        const uniqueIds = new Set();

        for (const moto of result) {
            if (!uniqueIds.has(moto._id.toString())) {
                uniqueIds.add(moto._id.toString());
                uniqueMotobikeTypes.push(moto);
            }
        }

        res.status(200).json(uniqueMotobikeTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    // example return of searchMotoByListOfDates funtion : 
    // [
    //     {
    //       "_id": "60c8d6f5f1e3f243b65e3b29",
    //       "image": "https://example.com/motobike1.jpg",
    //       "province": "Ho Chi Minh",
    //       "listOfAddon": ["Helmet", "Raincoat"],
    //       "pricePerDay": 100000,
    //       "name": "Honda CB500",
    //       "numberOfFeedback": 25,
    //       "height": 1.2,
    //       "weight": 180,
    //       "description": "A reliable and powerful motorbike for city and long rides.",
    //       "color": "Red"
    //     }
    // ]
};

export const searchMotoBikeByType = async (req, res) => {
    try {
      const motobikeTypeId = req.params.motobikeTypeId;
  
      // Find all available motobikes of the specified type
      const motobikes = await Motobike.find({ 
        motobikeType: motobikeTypeId, 
        isAvailable: true 
      }).populate([
        { path: "storeLocation", select: "province" },
        { path: "freeAddons", select: "name image" },
        { path: "motobikeType", select: "name height weight image description color" }
      ]);
  
      // Format the response
      const results = motobikes.map(moto => ({
        storeLocationProvince: moto.storeLocation.province,
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
      }));
  
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// example return of searchMotoByType funtion like above : 
export const searchMotoByProvince = async (req, res) => {
    try {
        const { province } = req.query;

        if (!province) {
            return res.status(400).json({ message: "Province is required" });
        }

        // Query motorbikes available in the given province
        const motobikes = await Motobike.aggregate([
            {
                $lookup: {
                    from: "storelocations",
                    localField: "storeLocation",
                    foreignField: "_id",
                    as: "storeLocation"
                }
            },
            { $unwind: "$storeLocation" },
            {
                $match: { "storeLocation.province": province }
            },
            {
                $lookup: {
                    from: "addons",
                    localField: "addons",
                    foreignField: "_id",
                    as: "listOfAddon"
                }
            },
            {
                $lookup: {
                    from: "feedbacks",
                    localField: "_id",
                    foreignField: "motobike",
                    as: "feedbacks"
                }
            },
            {
                $lookup: {
                    from: "motobiketypes",
                    localField: "motobikeType",
                    foreignField: "_id",
                    as: "motobikeType"
                }
            },
            { $unwind: "$motobikeType" },
            {
                $group: {
                    _id: "$motobikeType._id", // Group by motobike type
                    motobikeId: { $first: "$_id" },
                    image: { $first: "$image" },
                    province: { $first: "$storeLocation.province" },
                    listOfAddon: { $first: "$listOfAddon.name" },
                    pricePerDay: { $first: "$pricePerDay" },
                    name: { $first: "$name" },
                    numberOfFeedback: { $first: { $size: "$feedbacks" } },
                    height: { $first: "$height" },
                    weight: { $first: "$weight" },
                    description: { $first: "$description" },
                    color: { $first: "$color" }
                }
            },
            {
                $project: {
                    _id: "$motobikeId",
                    image: 1,
                    province: 1,
                    listOfAddon: 1,
                    pricePerDay: 1,
                    name: 1,
                    numberOfFeedback: 1,
                    height: 1,
                    weight: 1,
                    description: 1,
                    color: 1
                }
            }
        ]);

        res.status(200).json(motobikes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// example return of searchMotoByProvince funtion like above : 
