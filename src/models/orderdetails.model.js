const { timestamps } = require('mongodb');
const mongoose = require('mongoose')

const OrderdetailSchema = mongoose.Schema(
    {
        orderdetailid: {
            type: String,
            required: [true, "not null"],
        },
        infor: [
            {
                username: {
                    type: String,
                    required: true,
                },
                adress: {
                    type: String,
                    required: false,
                },
                phonenumber: {
                    type: String,
                    required: false,
                },
            }
        ]
        ,
        order: [
            {
                productid: {
                    type: String,
                    required: false
                },
                quantity: {
                    type: Number,
                    required: false,
                    default: 1
                },
                price: {
                    type: Number,
                    required: true,
                    default: 0
                },
                size: {
                    type: String,
                    required: false
                },
                color: {
                    type: String,
                    required: false
                },
                imageurl: {
                    type: String,
                    required: false,
                },
            }
        ],
        subtotal: {
            type: Number,
            required: false
        },
        paymentmethod: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Orderdetail = mongoose.model("Orderdetail", OrderdetailSchema);
module.exports = Orderdetail;