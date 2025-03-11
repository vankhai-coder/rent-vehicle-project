import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Customer giving feedback
    motobike: { type: mongoose.Schema.Types.ObjectId, ref: "Motobike", required: true }, // Motobike being reviewed
    content: { type: String, required: true }, // Feedback content
    star: { type: Number, required: true, min: 1, max: 5 } // Rating from 1 to 5 stars
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
