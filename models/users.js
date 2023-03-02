//imports
const mongoose = require('mongoose');

//schemas
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isMasterChef: {
        type: Boolean,
        required: true
    }
});

//exports
const User = mongoose.model('User', userSchema);

module.exports = User;