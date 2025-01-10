import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.log("MONGO connection error: ", error.message);
        process.exit(1);
    }
}