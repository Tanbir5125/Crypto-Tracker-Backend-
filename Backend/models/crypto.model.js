import mongoose from "mongoose";

const crryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    symbol: {
        type: String,
        required: true,
        unique: true,
    },
    price_usd: {
        type: Number,
        required: true,
    },
    market_cap_usd: {
        type: Number,
        required: true,
    },
    change_24h:{
        type: Number,
        required: true,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Crypto', cryptoSchema);