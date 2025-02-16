import express from 'express'
import { createNewPost, deletePost, getAllPosts } from '../controllers/postController.js'

const router = express.Router()

// get all post : 
router.get('/', getAllPosts)

// create new  post : 
router.post('/', createNewPost)

// delete post : 
router.delete('/:id', deletePost)
// export : 
export default router