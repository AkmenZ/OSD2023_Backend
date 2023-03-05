//imports
const mongoose = require('mongoose');

//schemas
const userSchema = mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

//exports
const User = mongoose.model('User', userSchema);

module.exports = User;