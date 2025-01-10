import { Crypto } from '../models/crypto.model.js'

// GET /stats - Get cryptocurrency statistics for a given coin
export async function getStats(req, res) {
    // Extract the 'coin' query parameter from the request
    const { coin } = req.query;

    // Check if the 'coin' query parameter is provided
    if (!coin) {
        // Return a 400 error if the 'coin' query parameter is missing
        return res.status(400).json({ error: 'Query parameter "coin" is required' })
    }

    // Mapping CoinGecko IDs to symbols stored in the database
    const coinMapping = {
        bitcoin: 'BTC',
        'matic-network': 'MATIC',
        ethereum: 'ETH',
    }

    // Convert the coin to lowercase and check if it exists in the mapping
    const symbol = coinMapping[coin.toLowerCase()];

    // If the symbol is not found in the database mapping, return a 404 error
    if (!symbol) {
        return res.status(404).json({ error: `Coin "${coin}" not found in our database` })
    }

    try {
        // Fetch the cryptocurrency data from the database using the symbol
        const crypto = await Crypto.findOne({ symbol });

        // If no data is found for the requested coin, return a 404 error
        if (!crypto) {
            return res.status(404).json({ error: `No data found for coin "${coin}"` })
        }

        // Return the relevant cryptocurrency statistics
        return res.json({
            price: crypto.price_usd,           // Current price of the coin
            marketCap: crypto.market_cap_usd,  // Market capitalization of the coin
            '24hChange': crypto.change_24h,    // 24-hour price change of the coin
        });
    } catch (error) {
        // Log the error and return a generic 500 error in case of a server issue
        console.error("Error fetching stats:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// Helper function to calculate the standard deviation from a list of prices
const calculateStandardDeviation = (prices) => {
    // Calculate the mean of the prices
    const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;

    // Calculate the variance (the average of the squared differences from the mean)
    const variance = prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / prices.length;

    // Return the square root of the variance (standard deviation), rounded to 2 decimal places
    return Math.sqrt(variance).toFixed(2);
}

// GET /deviation - Get the standard deviation of the last 100 cryptocurrency prices
export async function getDeviation(req, res) {
    // Extract the 'coin' query parameter from the request
    const { coin } = req.query;

    // Check if the 'coin' query parameter is provided
    if (!coin) {
        // Return a 400 error if the 'coin' query parameter is missing
        return res.status(400).json({ error: 'Query parameter "coin" is required' })
    }

    // Mapping CoinGecko IDs to symbols stored in the database
    const coinMapping = {
        bitcoin: 'BTC',
        'matic-network': 'MATIC',
        ethereum: 'ETH',
    }

    // Convert the coin to lowercase and check if it exists in the mapping
    const symbol = coinMapping[coin.toLowerCase()];

    // If the symbol is not found in the database mapping, return a 404 error
    if (!symbol) {
        return res.status(404).json({ error: `Coin "${coin}" not found in our database` })
    }

    try {
        // Fetch the last 100 records for the given coin, sorted by 'updated_at' in descending order
        const records = await Crypto.find({ symbol }).sort({ updated_at: -1 }).limit(100);

        // If no records are found for the requested coin, return a 404 error
        if (records.length === 0) {
            return res.status(404).json({ error: `No records found for coin "${coin}"` })
        }

        // Extract the price_usd field from each record to calculate standard deviation
        const prices = records.map(record => record.price_usd);

        // Calculate the standard deviation of the prices
        const standardDeviation = calculateStandardDeviation(prices);

        // Return the calculated standard deviation in the response
        return res.json({ Deviation: parseFloat(standardDeviation) });
    } catch (error) {
        // Log the error and return a generic 500 error in case of a server issue
        console.error("Error calculating deviation:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
}
