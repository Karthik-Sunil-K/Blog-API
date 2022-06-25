const express = require('express');
const { json, send } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const Post =require('../model/post')
const { db } = require('../model/users');



router.post('/', async (req,res)=>{
    
 try {
    const users= await User.find()
    res.status(200).json({
        count:users.length,
       message:user
    })
 } catch (error) {
    res.status(500).json({
        
        message:"cant fetch users details"+error
    })
 }    
})



module.exports = router