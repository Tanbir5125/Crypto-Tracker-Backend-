import express from 'express'
import { Crypto } from '../models/crypto.model.js';

const router = express.Router()

// GET /stats - Get latest data for a cryptocurrency
router.get('/stats', async (req,res)=>{
    const {coin} = req.query;

    if(!coin){
        return res.status(400).json({ error: 'Query parameter "coin" is required'})
    }

// Mapping CoinGecko IDs to symbols stored in the database
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
        const crypto = await Crypto.findOne({ symbol })
        if(!crypto){
            return res.status(404).json({ error: `No data found for coin "${coin}"`})
        }

        return res.json({
            price: crypto.price_usd,
            marketCap: crypto.market_cap_usd,
            '24hChange': crypto.change_24h,
        })
    } catch (error) {
        console.error("Error fetching stats:", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
})

export default router