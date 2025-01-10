import axios from 'axios';

export const fetchCryptoData = async () => {
    const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';
    const params = {
        ids: 'bitcoin,matic-network,ethereum',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
    };

    try {
        const { data } = await axios.get(apiUrl, { params });
        return [
            {
                name: 'Bitcoin',
                symbol: 'BTC',
                price_usd: data.bitcoin.usd,
                market_cap_usd: data.bitcoin.usd_market_cap,
                change_24h: data.bitcoin.usd_24h_change,
            },
            {
                name: 'Ethereum',
                symbol: 'ETH',
                price_usd: data.ethereum.usd,
                market_cap_usd: data.ethereum.usd_market_cap,
                change_24h: data.ethereum.usd_24h_change,
            },
            {
                name: 'Matic',
                symbol: 'MATIC',
                price_usd: data['matic-network'].usd,
                market_cap_usd: data['matic-network'].usd_market_cap,
                change_24h: data['matic-network'].usd_24h_change,
            },
        ];
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
