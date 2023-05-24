const mongoose = require("mongoose")
const Schema = mongoose.Schema;
require("dotenv").config()

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        trim: true,
        required: true
    },
    category: {
        type: [String],
        trim: true,
        required: true
    },
    imageUrl: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema)