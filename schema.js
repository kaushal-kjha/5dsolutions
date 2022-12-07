'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    catName: { type: String },
    subCatInfo: [
        {
            subCatName: { type: String },
            city: { type: String, default: '' },
            state: { type: String, default: '' },
            country: { type: String, default: '' },
            pincode: { type: Number, default: '' }
        }
    ],
    childCatInfo: [
        {
            subCatName: { type: String },
            email: { type: String, default: '' },
            phone: { type: String, default: '' }
        }
    ]
});


const Category = mongoose.model("category", categorySchema, 'tbl_category');

module.exports = Category

