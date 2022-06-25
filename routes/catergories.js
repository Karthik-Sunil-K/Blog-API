const express = require('express');
const { json, send } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const Catergories=require('../model/categories')



router.post('/category', async (req, res) => {
    const newcat = new Post(req.body);
    try {
        const post = await newpost.save();
        res.status(200).json({
            message:"Post created Successfully!",
            post:newpost
        })
    } catch (error) {
        res.status(500).json({
            message: "cant add new post " + error
        })
    }
});


module.exports = router