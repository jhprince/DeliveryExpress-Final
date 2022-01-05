const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const OrderItemSchema = mongoose.Schema({
    OrderNo: String,
    ItemId: String,
    Name: String,
    UnitPrice: Number,
    Qty: Number,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('OrderItem', OrderItemSchema);