const express = require('express');
const { json } = require('express/lib/response');
const mongoose = require('mongoose');
//routes
const postRouter=require('./routes/post');
const categoriesRouter=require('./routes/catergories');
const authRouter=require('./routes/auth');
const usersRouter=require('./routes/users');

const app = express();
app.use(express.json())






app.listen(3000,()=>{
    console.log('server at 3000');
})