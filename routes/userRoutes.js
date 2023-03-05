//imports
const User = require('../models/users');
const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');

//routes

//route to get a user by ID
router.get('/users/:userId', (req, res, next) => {
    const { userId } = req.params;
    User.findById(userId)
        .then(user => {
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    }).catch(next);
});

//route to register a new user
router.post('/register', (req, res, next) => {
    const { googleId, name, email } = req.body;
    const user = new User({
        googleId,
        name,
        email
    });
    user.save()
        .then(user => {
        res.json(user);
    }).catch(next);
});

//export
module.exports = router;

