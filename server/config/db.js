import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI )
        // const conn = await mongoose.connect('mongodb://localhost:27017/rent-motobike')
        console.log(`Connect to mongodb successully : ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error when connect to db : ${error.message}`);
        process.exit(1)
    }
} 

export { connectDB }