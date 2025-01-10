import dotenv from 'dotenv'; // Import the dotenv library to load environment variables from a .env file

// Initialize dotenv to load environment variables from a .env file into process.env
dotenv.config();

/**
 * Configuration object to store environment variables used in the application.
 * The environment variables are loaded from the .env file into process.env.
 * This object provides a centralized way to access these variables.
 */
export const ENV_VARS = {
    // MongoDB connection URI, required for connecting to the MongoDB database
    // This value should be set in the .env file
    MONGO_URI: process.env.MONGO_URI, // Mongo URI from .env for database connection

    // The port the application will listen on
    // If not defined in .env, defaults to 8080
    PORT: process.env.PORT || 8080, // Default port is 8080 if not specified in .env

    // API key for external service integration, like CoinGecko or others
    // This value should be securely stored in the .env file
    API_KEY: process.env.API_KEY, // API Key for authorization with external APIs
}
