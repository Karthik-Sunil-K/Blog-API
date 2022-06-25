const express = require('express');
const { json, send } = require('express/lib/response');
const router = express.Router();
const User = require('../model/users')
const Post = require('../model/post')
const { db } = require('../model/users');
const { route } = require('./auth');



router.post('/newpost', async (req, res) => {
    const newpost = new Post(req.body);
    try {
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            try {
                const post = await newpost.save();
                res.status(200).json({
                    message: "post created !",
                    post: post
                })
            } catch (error) {
                res.status(500).json({
                    message: "cant add new post " + error
                })
            }
        } else {
            res.status(401).json({
                message:"no user exist"
            })
        }
    } catch (error) {

    }

});
//post update
router.put('/update/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId)
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(postId, { $set: req.body }, { new: true });
                res.status(200).json({
                    message: "post updated succesfully",
                    updatedPost: updatedPost
                })
            } catch (err) {
                res.status(500).json({
                    message: "cant update post"
                })
            }
        } else {
            res.status(402).json({
                message: "u can only update ur post"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "cant fetch post " + err
        })
    }
})
//post delete

router.delete('/delete/:id', async (req, res) => {
    const postId = req.params.id
    try {
        const post = await Post.findById(postId)
        if (post.username === req.body.username) {
            try {
                await post.delete()
                res.status(200).json({
                    message: "post deleted successfully"
                })
            } catch (err) {
                res.status(500).json("cant delte post some error happened")
            }
        } else {
            res.status(401).json({
                message: "u can only delete ur post"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "cant fetch post details"
        })
    }
});

//get indivitaul post by post id
router.get('/post/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findById(postId)
        res.status(200).json({
            post: post
        });
    } catch (err) {
        res.status(500).json({
            message: "cant fetch details"
        })
    }
});

//all posts
router.get('/posts', async (req, res) => {
    const username = req.query.user;
    const catname = req.query.cat
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username: username })
        } else if (catname) {
            posts = await Post.find({
                category: {
                    $in: [catname]
                }
            });
        } else {
            posts = await Post.find()
        }
        res.status(200).json({
            posts: posts
        })
    } catch (error) {

    }
})

module.exports = router