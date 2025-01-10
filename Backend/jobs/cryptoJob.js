import cron from 'node-cron'; // Importing the node-cron library to schedule tasks at specified intervals
import { fetchCryptoData } from '../services/coingecko.service.js'; // Importing the function to fetch cryptocurrency data
import { Crypto } from '../models/crypto.model.js'; // Importing the Crypto model to interact with the database

/**
 * Schedules a cron job to fetch cryptocurrency data every 2 hours and store it in the database.
 * The cron job runs every 2nd hour at minute 0.
 */
const scheduleCryptoJob = () => {
    // Schedule the job to run every 2 hours at minute 0 using cron syntax
    cron.schedule('0 */2 * * *', async () => {
        // Log message to indicate that the job has started
        console.log("Running the cryptocurrency fetching job...");

        try {
            // Fetch the latest cryptocurrency data using the fetchCryptoData service
            const cryptoData = await fetchCryptoData();

            // Iterate over the fetched cryptocurrency data and create new records in the database
            for (const crypto of cryptoData) {
                // Create a new cryptocurrency record in the database
                await Crypto.create(crypto);
            }

            // Log message to indicate that the job has completed successfully
            console.log("Cryptocurrency fetching job completed successfully!");
        } catch (error) {
            // Log error if the job fails at any point
            console.error("Error during scheduled job:", error.message);
        }
    });
}

// Export the scheduled job function for use in other parts of the application
export default scheduleCryptoJob;
