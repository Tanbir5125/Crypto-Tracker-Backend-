import cron from 'node-cron';
import { fetchCryptoData } from '../services/coingecko.service.js'
import {Crypto} from '../models/crypto.model.js';

const scheduleCryptoJob = () =>{
    cron.schedule('0 */2 * * *', async () =>{
        console.log("Running the cryptocurrency fetching job...");
        try {
            const cryptoData = await fetchCryptoData();
            for (const crypto of cryptoData) {
                await Crypto.create(crypto)
            }
            console.log("Cryptocurrency fetching job completed successfully!");
        } catch (error) {
            console.error("Error during scheduled job:", error.message);
        }
    })
}

export default scheduleCryptoJob;