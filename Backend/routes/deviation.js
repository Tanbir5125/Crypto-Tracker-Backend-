import express from 'express'
import { Crypto } from '../models/crypto.model'

const router = express.Router()

const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
    const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;
    return Math.sqrt(variance).toFixed(2);
}

router.get('/deviation', async (req, res) => {
    const {coin} = req.query

    if(!coin){
        return res.status(400).json({ error: 'Query parameter "coin" is required'})
    }

    const coinMapping = {
        bitcoin: 'BTC',
        'matic-network': 'MATIC',
        ethereum: 'ETH',
    }

    const symbol = coinMapping[coin.toLowerCase()]
    if(!symbol){
        return res.status(404).json({ error: `Coin "${coin}" not found in our database`})
    }

    try {
        const records = await Crypto.find({ symbol }).sort({ updated_at: -1 }).limit(100)
        if(records.length === 0){
            return res.status(404).json({ error: `No records found for coin "${coin}"`})
        }

        const prices = records.map(record => record.price_usd)
        const standardDeviation = calculateStandardDeviation(prices)

        return res.json({ Deviation: parseFloat(standardDeviation) })
    } catch (error) {
        console.error("Error calculating deviation:", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

export default router