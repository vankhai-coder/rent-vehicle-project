import Author from '../models/authorModel.js';
import Post from '../models/postModel.js'
// get all posts : 
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author"); 
        res.status(200).json(posts);
    } catch (error) {
        console.log(`Error in get all posts : ${error.message}`);
        req.status(500).json({ message: error.message })
    }
}

// create new post : 
export const createNewPost = async (req , res) => {
    try {
        const { title, content, authorId } = req.body;

        // Check if the author exists
        const authorExists = await Author.findById(authorId);
        if (!authorExists) {
            return res.status(404).json({ message: "Author not found" });
        }

        // Create new post
        const newPost = new Post({
            title,
            content,
            author: authorId,
        });

        // Save to database
        await newPost.save();

        res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error(`Error creating post: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// delete post : 
export const deletePost  = async (req, res ) => {
    try {
        const { id } = req.params;

        // Find and delete the post
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        console.error(`Error deleting post: ${error.message}`);
        res.status(500).json({ message: "Internal server error" });
    }
}