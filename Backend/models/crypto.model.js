import mongoose from "mongoose"; // Importing Mongoose to define the schema and interact with MongoDB

/**
 * Defines the schema for the Crypto collection in the MongoDB database
 * This schema represents the structure of each cryptocurrency document
 */
const cryptoSchema = new mongoose.Schema({
    // Name of the cryptocurrency (e.g., Bitcoin, Ethereum)
    name: {
        type: String, // Data type is String
        required: true, // This field is mandatory
        unique: true, // This field must be unique across all documents in the collection
    },

    // Symbol of the cryptocurrency (e.g., BTC, ETH, MATIC)
    symbol: {
        type: String, // Data type is String
        required: true, // This field is mandatory
        unique: true, // This field must be unique across all documents in the collection
    },

    // Price of the cryptocurrency in USD
    price_usd: {
        type: Number, // Data type is Number
        required: true, // This field is mandatory
    },

    // Market capitalization of the cryptocurrency in USD
    market_cap_usd: {
        type: Number, // Data type is Number
        required: true, // This field is mandatory
    },

    // 24-hour price change percentage of the cryptocurrency
    change_24h: {
        type: Number, // Data type is Number
        required: true, // This field is mandatory
    },

    // Date and time when the record was last updated (defaults to current date and time)
    updated_at: {
        type: Date, // Data type is Date
        default: Date.now, // Sets the default value to the current timestamp
    }
});

// Create the Crypto model based on the schema and export it for use in other parts of the application
export const Crypto = mongoose.model('Crypto', cryptoSchema);
