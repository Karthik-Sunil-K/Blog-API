const express = require('express');
const res = require('express/lib/response');
const Alien= require('../model/alien')

const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const aliens = await Alien.find()
        res.json(aliens)
    } catch (err) {
        res.send('Error')
    }
})

router.post('/',async (req,res)=>{
    const alien = new Alien({
        name:req.body.name,
        tech:req.body.tech,
        sub:req.body.sub
    })
    try {
        const a1 = await alien.save()
        res.send(a1)
    } catch (err) {
        res.send('erro'+err)
    }
})
module.exports = router
