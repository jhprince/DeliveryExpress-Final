const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const SalesRouteSchema = mongoose.Schema({
    Name: String,
    RouteDate: String,
    SalesPersonId: String,
    Outlets: [String],
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('SalesRoute', SalesRouteSchema);