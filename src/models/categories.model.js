const { timestamps } = require('mongodb');
const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema(
    {
        categoryid: {
            type: String,
            required: [true, "not null"],
        },
        categoryname: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;