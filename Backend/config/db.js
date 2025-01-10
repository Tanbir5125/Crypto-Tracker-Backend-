import mongoose from "mongoose"; // Importing mongoose to interact with the MongoDB database
import { ENV_VARS } from "./envVars.js"; // Importing the environment variables, including MONGO_URI

/**
 * Connects to MongoDB using the MONGO_URI stored in environment variables.
 * If the connection is successful, a success message is logged.
 * In case of an error, the error message is logged and the process is terminated.
 */
export const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection URI from the environment variables
        const connect = await mongoose.connect(ENV_VARS.MONGO_URI);

        // Log a success message if the connection is established
        console.log("MongoDB connected successfully!");
    } catch (error) {
        // Log the error message if the connection fails
        console.log("MONGO connection error: ", error.message);

        // Exit the process with a non-zero status code to indicate failure
        process.exit(1);
    }
}
