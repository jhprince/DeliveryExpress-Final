const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const OrderSchema = mongoose.Schema({
    OrderNo: String,
    OrderDate: Date,
    EstimatedDeliveryDate: Date,
    Comments: String,
    Status: String,
    OutletId: String,
    OutletName: String,
    TotalOrderQty: Number,
    TotalOrderPrice: Number,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);