const express = require('express');
const { json } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const bcrypt = require('bcrypt');

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
                message:"deleted"
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
router.get('/admin/usersList/:number', async (req,res)=>{
    const userList = req.params.number
    
 try {
    const users= await User.find()
    const copy=[...users];
    const newcpy=copy.slice(1,userList)
    console.log(users[5].password)
    res.status(200).json({
        message:newcpy
    })
 } catch (error) {
    res.status(500).json({
        message:"cant fetch users details"+error
    })
 }    
})



module.exports = router