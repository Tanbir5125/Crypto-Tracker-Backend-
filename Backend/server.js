import express from 'express'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { fetchCryptoData } from './services/coingecko.service.js';


const app = express();

const PORT = ENV_VARS.PORT

app.use("/api", statsRoute)


// app.listen(PORT, () =>{
//     console.log(`Server is running on port ${PORT}`);
//     connectDB()
// })