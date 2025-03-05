import AddOn from '../../models/addonModel.js';
import cloudinary from '../../config/cloudinary.js';

export const createAddOn = async (req, res) => {
    try {
        const { name, image } = req.body;

        // Validate input
        if (!name || !image) {
            return res.status(400).json({ error: true, message: 'Name and image are required!' });
        }

        // Check if name already exists in DB
        const existAddOn = await AddOn.findOne({ name });
        if (existAddOn) {
            return res.status(400).json({ error: true, message: 'Name already exists!' });
        }

        // Ensure image is a Base64 string
        if (!image.startsWith('data:image')) {
            return res.status(400).json({ error: true, message: 'Invalid image format!' });
        }

        // Upload Base64 image to Cloudinary
        const result = await cloudinary.uploader.upload(image, {
            folder: 'rent_moto_project',
            resource_type: 'auto',  // Automatically detect file type
        });

        // Save to DB
        const newAddOn = await AddOn.create({ name, image: result.secure_url });

        // Respond with created add-on
        return res.status(201).json({
            error: false,
            message: 'Add-On created successfully!',
            data: newAddOn
        });
    } catch (error) {
        console.error('Error creating Add-On:', error);
        return res.status(500).json({ error: true, message: 'Server error while creating Add-On!' });
    }
};
