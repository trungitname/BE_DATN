const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        productid: {
            type: String,
            required: [true, "not null"],
        },
        productname: {
            type: String,
            required: true,
        },
        sku: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        categoryid: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageurl: {
            type: String,
            required: false,
        },
        color: {
            type: Array,
            required: false,
        },
        size: {
            type: Array,
            required: false,
        },
        quantity: {
            type: Number,
            required: false,
            default: 0
        },
    },
    {
        Timestamp: true
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;