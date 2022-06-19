const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')


router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const user = await newUser.save();
        res.status(200).json({
            message :"user created succesfully",
            user:user
        })
    } catch (err) {
        res.status(500).json({
            message:err
        })
    }
})
module.exports = router