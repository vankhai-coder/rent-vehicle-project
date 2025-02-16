import Author from '../models/authorModel.js'

// get all authors : 
export const getAllAuthors = async (req, res) => {
    try {
        const listAuthors = await Author.find()
        res.status(200).json(listAuthors)
    } catch (error) {
        console.log(`Error in get all authors : ${error.message}`);
        req.status(500).json({ message: error.message })
    }
}

// Create a new author
export const createNewAuthor = async (req, res) => {
    try {
        const { email, name, age } = req.body;

        // Check if all required fields are provided
        if (!email || !name || !age) {
            return res.status(400).json({ message: 'All fields (email, name, age) are required' });
        }

        // Create a new author
        const newAuthor = new Author({ email, name, age });

        // Save the author to the database
        await newAuthor.save();

        res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        console.log(`Error creating author: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

// delete author by id : 
export const deleteAuthorById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the request params

        // Find and delete the author by ID
        const deletedAuthor = await Author.findByIdAndDelete(id);

        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({ message: 'Author deleted successfully', author: deletedAuthor });
    } catch (error) {
        console.log(`Error deleting author: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// find author by id : 
export const findAuthorById = async (req , res ) => {
    try {
        const { id } = req.params; // Get the ID from the request params

        // Find the author by ID
        const author = await Author.findById(id);

        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json(author); // Send the author data as response
    } catch (error) {
        console.log(`Error finding author: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}

// update author by id : 
export const updateAuthorById = async (req , res ) => {
    try {
        const { id } = req.params; // Get the ID from the request params
        const { email, name, age } = req.body; // Get updated data from the request body

        // Check if all required fields are provided (if necessary)
        if (!email || !name || !age) {
            return res.status(400).json({ message: 'All fields (email, name, age) are required' });
        }

        // Find the author by ID and update their details
        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            { email, name, age }, // Updated data
            { new: true } // Return the updated document
        );

        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Author not found' });
        }

        res.status(200).json({ message: 'Author updated successfully', author: updatedAuthor });
    } catch (error) {
        console.log(`Error updating author: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
}