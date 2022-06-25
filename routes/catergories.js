const express = require('express');
const { json, send } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const Catergories = require('../model/categories')



router.post('/category', async (req, res) => {
    const newcat = new Catergories(req.body);
    try {
        const categories = await newcat.save();
        res.status(200).json({
            message: "new category added",
            cats: categories
        })
    } catch (error) {
        res.status(500).json({
            message: "cant add new post " + error
        })
    }
});
router.get('/category', async (req, res) => {

    try {
        const cat = await Catergories.find()
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json({
            message: "cant fetch users details" + error
        })
    }
})


module.exports = router