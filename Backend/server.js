import express from 'express'; // Importing Express.js to create a server
import { ENV_VARS } from './config/envVars.js'; // Importing environment variables for configuration
import { connectDB } from './config/db.js'; // Importing the database connection function
import scheduleCryptoJob from './jobs/cryptoJob.js'; // Importing the scheduled job for cryptocurrency data

import cryptoRoute from './routes/cryptoRoute.js'; // Importing the crypto routes for handling API requests

// Initialize an instance of Express
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Retrieve the port number from the environment variables
const PORT = ENV_VARS.PORT;

// Define the '/api/crypto' route to handle all cryptocurrency-related requests
app.use('/api/crypto', cryptoRoute);

// Schedule a job to fetch and process cryptocurrency data at regular intervals
scheduleCryptoJob();

// Basic route to welcome users to the API
app.get('/', (req, res) => {
    res.send('Welcome to Crypto API');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    // Log the server start and connect to the database
    console.log(`Server is running on port ${PORT}`);
    // Call the connectDB function to establish a connection to the database
    connectDB();
});
