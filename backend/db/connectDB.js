import mongoose from "mongoose";
export default connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${connection.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}