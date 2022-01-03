const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    FirstName: String,
    lastName: String,
    email: String,
    password: String,
    is_active:  { type: Boolean, default: false },
    is_verified:  { type: Boolean, default: false },
    is_deleted:  { type: Boolean, default: false }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);