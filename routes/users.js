const express = require('express');
const { json, send } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const bcrypt = require('bcrypt');
const { db } = require('../model/users');

//userupdate
router.put('/:id', async (req, res) => {
    if(req.body.userId==req.params.id){
        if(req.body.password){
            const salt = bcrypt.genSalt(10)
            req.body.password= await bcrypt.hash(req.body.password,salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.body.userId,
                {$set:req.body},
            )
            res.status(200).json({
                message:"user updaaated sduccessfully",
                user:updatedUser
            })
        } catch (error) {
            res.status(500).json({
                message:"server error"
            })
        }
        
    }else{
        res.status(401).json({message:"you can only update yourd account"})
    }
});
//user delete
router.delete('/:id', async(req,res)=>{
    if(req.params.id==req.body.userId){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message:"deleted succesfully"
            })
        } catch (error) {
            res.status(500).json({
                message:"retry"
            })
        }
    }else(
        res.status(401).json({message:"u can only delete yours"})
    )
})
//user details get
router.get('/user/:name',async (req,res)=>{
    const name=req.params.name
    try {
        const user=await User.findOne({username:name})
        res.status(200).json({
            details:{user}
        })
    } catch (error) {
        res.status(500).json({
            message:"cant fetch user "+error
        })
    }
})
// user details post for search
router.post('/user/find',async (req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        res.status(200).json({
            details:{user}
        })
    } catch (error) {
        res.status(500).json({
            message:"cant fetch user "+error
        })
    }
})
//admin route
router.get('/admin/usersList/', async (req,res)=>{
    
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