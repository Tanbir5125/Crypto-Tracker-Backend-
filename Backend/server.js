import express from 'express'
import { ENV_VARS } from './config/envVars.js';
// import { connectDB } from './config/db.js';
import { fetchCryptoData } from './services/coingecko.service.js';


const app = express();

const PORT = ENV_VARS.PORT

// Test fetch function
fetchCryptoData().then((data) => {
    console.log('Formatted cryptocurrency data:', data);
}).catch((error) => {
    console.error('Error during test fetch:', error.message);
});


// app.listen(PORT, () =>{
//     console.log(`Server is running on port ${PORT}`);
//     connectDB()
// })