import MotobikeType from "../../models/motobikeTypeModel.js";
import cloudinary from "../../config/cloudinary.js"; 

export const createMotobikeType = async (req, res) => {
    try {
        // only admin and owner can create : 
        if(req.user.role !=='admin' && req.user.role !=='owner'){
            return res.status(401).json({ error: true, message: "Unauthorizied , can not access this route!" });
        }
        const { name, height, weight, image, description, color } = req.body;

        // Validate required fields
        if (!name || !height || !weight || !image || !description || !color) {
            return res.status(400).json({ error: true, message: "All fields are required!" });
        }

        // Check if the name already exists (including soft-deleted ones)
        const existingMotobikeType = await MotobikeType.findOne({ name });
        if (existingMotobikeType) {
            return res.status(400).json({ error: true, message: "Motobike type already exists!" });
        }

        // Ensure image is a Base64 string before uploading
        if (!image.startsWith("data:image")) {
            return res.status(400).json({ error: true, message: "Invalid image format!" });
        }

        // Upload Base64 image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: "rent_moto_project/motobike_types",
            resource_type: "auto",
        });

        // Create a new MotobikeType instance
        const newMotobikeType = new MotobikeType({
            name: name.trim(),
            height,
            weight,
            image: uploadResult.secure_url,
            description: description.trim(),
            color: color.trim(),
        });

        // Save to the database
        await newMotobikeType.save();

        return res.status(201).json({
            error: false,
            message: "Motobike type created successfully!",
            data: newMotobikeType,
        });
    } catch (error) {
        console.error("Error creating motobike type:", error);
        return res.status(500).json({ error: true, message: "Server error while creating motobike type!" });
    }
};
