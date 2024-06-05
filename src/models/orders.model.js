const { timestamps } = require('mongodb');
const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema(
    {
        orderid: {
            type: String,
            required: [true, "not null"],
        },
        orderdate: {
            type: String,
            required: false
        },
        userid: {
            type: String,
            required: true
        },
        totalquantity: {
            type: Number,
            required: false
        },
        totalvalue: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;