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
    }
})