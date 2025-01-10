import { Crypto } from '../models/crypto.model.js'

export async function getStats(req, res) {
    const { coin } = req.query;

    if (!coin) {
        return res.status(400).json({ error: 'Query parameter "coin" is required' })
    }

    // Mapping CoinGecko IDs to symbols stored in the database
    const coinMapping = {
        bitcoin: 'BTC',
        'matic-network': 'MATIC',
        ethereum: 'ETH',
    }

    const symbol = coinMapping[coin.toLowerCase()]
    if (!symbol) {
        return res.status(404).json({ error: `Coin "${coin}" not found in our database` })
    }

    try {
        const crypto = await Crypto.findOne({ symbol })
        if (!crypto) {
            return res.status(404).json({ error: `No data found for coin "${coin}"` })
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
}


// GET /deviation - Get the standard deviation of the last 100 cryptocurrency prices

const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
    const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;
    return Math.sqrt(variance).toFixed(2);
}

export async function getDeviation(req,res){

    const { coin } = req.query

    if (!coin) {
        return res.status(400).json({ error: 'Query parameter "coin" is required' })
    }

    const coinMapping = {
        bitcoin: 'BTC',
        'matic-network': 'MATIC',
        ethereum: 'ETH',
    }

    const symbol = coinMapping[coin.toLowerCase()]
    if (!symbol) {
        return res.status(404).json({ error: `Coin "${coin}" not found in our database` })
    }

    try {
        const records = await Crypto.find({ symbol }).sort({ updated_at: -1 }).limit(100)
        if (records.length === 0) {
            return res.status(404).json({ error: `No records found for coin "${coin}"` })
        }

        const prices = records.map(record => record.price_usd)
        const standardDeviation = calculateStandardDeviation(prices)

        return res.json({ Deviation: parseFloat(standardDeviation) })
    } catch (error) {
        console.error("Error calculating deviation:", error.message)
        return res.status(500).json({ error: "Internal server error" })
    }
}