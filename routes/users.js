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
            req.body.password=bcrypt.hash(req.body.password,salt)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.body.userId,
                {$set:req.body},
            )
            res.status(200).json({
                message:"user updated sduccessfully",
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
})



module.exports = router