import express from 'express'
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import scheduleCryptoJob from './jobs/cryptoJob.js';

import cryptoRoute from './routes/cryptoRoute.js';

const app = express();
app.use(express.json());

const PORT = ENV_VARS.PORT

app.use('/api/crypto', cryptoRoute)

scheduleCryptoJob();

app.get('/', (req, res) => {
    res.send('Welcome to Crypto API')
})

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})