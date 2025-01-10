import axios from 'axios'; // Importing axios for making HTTP requests

/**
 * Fetches cryptocurrency data for Bitcoin, Ethereum, and Matic from the CoinGecko API
 * @returns {Array} - An array of objects containing the cryptocurrency data (price, market cap, and 24h change)
 * @throws {Error} - Throws an error if the API request fails
 */
export const fetchCryptoData = async () => {
    // Define the CoinGecko API endpoint for fetching simple price data
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

    // Parameters for the API request (cryptocurrencies and specific data fields)
    const params = {
        ids: 'bitcoin,matic-network,ethereum', // Request data for Bitcoin, Matic, and Ethereum
        vs_currencies: 'usd', // Get the price in USD
        include_market_cap: 'true', // Include the market cap in the response
        include_24hr_change: 'true', // Include the 24-hour price change in the response
    };

    try {
        // Send GET request to the CoinGecko API with the specified parameters
        const { data } = await axios.get(apiUrl, { params });

        // Map the response data to a structured array of cryptocurrency data
        return [
            {
                name: 'Bitcoin', // Name of the cryptocurrency
                symbol: 'BTC', // Symbol for Bitcoin
                price_usd: data.bitcoin.usd, // Bitcoin price in USD
                market_cap_usd: data.bitcoin.usd_market_cap, // Bitcoin market cap in USD
                change_24h: data.bitcoin.usd_24h_change, // 24-hour price change for Bitcoin
            },
            {
                name: 'Ethereum', // Name of the cryptocurrency
                symbol: 'ETH', // Symbol for Ethereum
                price_usd: data.ethereum.usd, // Ethereum price in USD
                market_cap_usd: data.ethereum.usd_market_cap, // Ethereum market cap in USD
                change_24h: data.ethereum.usd_24h_change, // 24-hour price change for Ethereum
            },
            {
                name: 'Matic', // Name of the cryptocurrency
                symbol: 'MATIC', // Symbol for Matic
                price_usd: data['matic-network'].usd, // Matic price in USD
                market_cap_usd: data['matic-network'].usd_market_cap, // Matic market cap in USD
                change_24h: data['matic-network'].usd_24h_change, // 24-hour price change for Matic
            },
        ];
    } catch (error) {
        // Log the error message if the API request fails
        console.error('Error fetching data:', error.message);
        // Rethrow the error to be handled by the caller
        throw error;
    }
};
