const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const ProductSchema = mongoose.Schema({
    Name: String,
    Unitprice: Number,
    ThresholdQty: Number,
    Description: String,
    Stock: Number,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);