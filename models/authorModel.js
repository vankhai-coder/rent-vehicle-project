import mongoose from "mongoose";

// create author schema : 
const authorSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    }
}, { timestamps: true })

const Author = mongoose.model('Author', authorSchema)

export default Author