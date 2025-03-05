import { uploadImage } from "../../utils/cloudinary.js"
import AddOn from '../../models/addonModel.js'

export const createAddOn = async (req, res) => {
    try {
        // get name from req.body : 
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ error: true, message: 'Name Add On is required!' })
        }
        // check if name already exist in db : 
        const existAddOnName = await AddOn.findOne({ name })
        if (existAddOnName) {
            return res.status(400).json({ error: true, message: 'Name already exist!' })
        }
        // upload image : 
      
        // save to db : 
       
        // response : 
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: false, message: 'Error when create Add On!' })

    }
}