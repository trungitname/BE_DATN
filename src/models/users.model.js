const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        userid: {
            type: String,
            required: [true, "not null"],
        },
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
        email: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        rating: {
            type: String,
            required: false,
        },
        cartitems: {
            type: Array,
            required: false,
        },
    },
    {
        Timestamp: true
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;