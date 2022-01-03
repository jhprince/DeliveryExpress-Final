const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const SalesPersonSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    UserId: String,
    PhoneNumber: String,
    Email: String,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('SalesPerson', SalesPersonSchema);