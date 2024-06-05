const { timestamps } = require('mongodb');
const mongoose = require('mongoose')

const StorechainSchema = mongoose.Schema(
    {
        storeid: {
            type: String,
            required: [true, "not null"],
        },
        storename: {
            type: String,
            required: true,
        },
        adress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        phonenumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

const Storechain = mongoose.model("Storechain", StorechainSchema);
module.exports = Storechain;