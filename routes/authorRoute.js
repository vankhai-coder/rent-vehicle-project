import express from 'express'
import { createNewAuthor, getAllAuthors,deleteAuthorById, findAuthorById, updateAuthorById } from '../controllers/authorController.js'

const router = express.Router()

// get all author : 
router.get('/', getAllAuthors)

// create new author : 
router.post('/', createNewAuthor)

// delete author by id : 
router.delete('/:id' , deleteAuthorById)

// find author by id : 
router.get('/:id' , findAuthorById )

// update user : 
router.put('/:id' , updateAuthorById )

// export : 
export default router