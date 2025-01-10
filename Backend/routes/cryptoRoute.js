import express from 'express'; // Importing the Express library
import { getStats, getDeviation } from '../controllers/queryController.js'; // Importing the controller functions

// Create a new Express Router instance
const router = express.Router();

// Route to fetch cryptocurrency statistics for a specific coin
// This route calls the 'getStats' function from the queryController
router.get('/stats', getStats);

// Route to fetch the standard deviation of the last 100 cryptocurrency prices
// This route calls the 'getDeviation' function from the queryController
router.get('/deviation', getDeviation);

// Export the router so it can be used in other parts of the application
export default router;
