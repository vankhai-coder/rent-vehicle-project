import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, 
    name: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

const Addon = mongoose.model("Addon", addonSchema);
export default Addon;
