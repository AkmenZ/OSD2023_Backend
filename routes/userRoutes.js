//imports
const User = require('../models/users');
const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');

//routes
//get all users
router.get('/', async(req, res) => {
    const users = await User.find().select("-passwordHash");
    if(!users) {
        res.status(400).send("Users not found!")
    }
    res.send(users);
});

//get user by id
router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if(!user) {
        res.status(400).send("User not found!")
    }
    res.send(user);
})

//add user
router.post('/', async (req, res) => {
    let user = new User({
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash),
        isAdmin: false,
        isMasterChef: false
    })

    user = await user.save();

    if(!user) {
        return res.status(400).send("User not created!");
    }

    res.send(user);
})

//export
module.exports = router;

