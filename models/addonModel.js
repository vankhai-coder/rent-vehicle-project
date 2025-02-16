import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    image: { type: String }, // Store URL or file path
    name: { type: String, required: true }
  },
  { timestamps: true }
);

const Addon = mongoose.model("Addon", addonSchema);
export default Addon;
