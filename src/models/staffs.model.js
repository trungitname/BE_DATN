const { timestamps } = require('mongodb');
const mongoose = require('mongoose')

const StaffSchema = mongoose.Schema(
    {
        staffid: {
            type: String,
            required: [true, "not null"],
        },
        staffname: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: false,
        },
        storeid: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: false,
        },
        phonenumber: {
            type: String,
            required: false,
        },
        adress: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
);

const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;