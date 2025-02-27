import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Image URL or file path
    title: { type: String, required: true }, // Post title
    content: { type: String, required: true }, // Post content
    heart: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Users who liked the post
    inDistrict: { type: String, required: true } // Province where the post is relevant
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
