import Motobike from '../../models/motobikeModel.js';

// Get all motobikes
export const getAllMotobikes = async (req, res) => {
    try {
        const motobikes = await Motobike.find()
            .populate('motobikeType')
            .populate('storeLocation')
            .populate('freeAddons')
            .populate('owner');
        return res.status(200).json(motobikes);
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server error while fetching motobikes!" });
    }
};

// Delete motobike
export const deleteMotobike = async (req, res) => {
    try {
        const motobike = await Motobike.findById(req.params.id);
        
        if (!motobike) {
            return res.status(404).json({ error: true, message: "Motobike not found!" });
        }
        
        await motobike.deleteOne();
        return res.status(200).json({ message: "Motobike deleted successfully!" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server error while deleting motobike!" });
    }
};
