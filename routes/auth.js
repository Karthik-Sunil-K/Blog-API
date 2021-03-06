const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const bcrypt = require('bcrypt');

//REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const rawPassword = req.body.password
        const hashedPassword = await bcrypt.hash(rawPassword, salt)
        const exitUsername = await User.findOne({ username: req.body.username });
        if (!exitUsername) {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })
            const user = await newUser.save();
            res.status(200).json({
                message: "user created succesfully",
                user: user
            })
        }
        console.log("user name already exist")
        res.status(200).json({
            message: "username already exists"
        });

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }
})

//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.status(400).json({ message: "wrong credentials" })
        }
        const validated = await bcrypt.compare(req.body.password, user.password)
        if (!validated) {
            res.status(400).json({ message: "wrongg credentials" })
        }
        const { password, ...others } = user._doc
        res.status(200).json({
            message: "logined successfully",
            user: others.username
        })
    } catch (err) {
        res.status(500).json(err)
    }

})


module.exports = router