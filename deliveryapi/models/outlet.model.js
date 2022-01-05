const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const OutletSchema = mongoose.Schema({
    Name: String,
    Address: String,
    ContactNumber: String,
    ContactPerson: String,
    Latitude: Number,
    Longitude: Number,

    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('Outlet', OutletSchema);