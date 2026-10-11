import { parse } from 'dotenv';
import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const url = process.env.MONGO_URL;
        if(!url) throw new Error('MONGO_URI is not defined')
        const conn=await mongoose.connect(url)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error("MongoDB connection error:", error.message)
        process.exit(1)
    }
}