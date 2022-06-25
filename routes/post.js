const express = require('express');
const { json, send } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const Post = require('../model/post')
const { db } = require('../model/users');
const { route } = require('./auth');



router.post('/newpost', async (req,res)=>{
    const newpost = new Post(req.body);
    try {
        const post = await newpost.save();
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({
            message:"cant add new post "+error
        })
    }
});

router.put('/update/:id',async (req,res)=>{
    const postId=req.params.id;
    try {
        const post = await Post.findById(postId)
        if(post.username===req.body.username){
            try {
               const updatedPost= await Post.findByIdAndUpdate(postId,{$set:req.body},{new:true});
               res.status(200).json({
                message:"post updated succesfully",
                updatedPost:updatedPost
               })
            } catch (err) {
                res.status(500).json({
                    message:"cant update post"
                })
            }
        }else{
            res.status(402).json({
                message:"u can only update ur post"
            })
        }
    } catch (err) {
        res.status(500).json({
            message:"cant fetch post "+err
        })
    }
})


module.exports = router