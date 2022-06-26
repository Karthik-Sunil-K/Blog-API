const express = require('express');
const { json } = require('express/lib/response');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
//routes
const postRouter=require('./routes/post');
const categoriesRouter=require('./routes/catergories');
const authRouter=require('./routes/auth');
const usersRouter=require('./routes/users');



const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("mongo Connected");
    }).catch((err)=>{
        console.log(err);
    })

app.use('/auth',authRouter)
app.use('/user',usersRouter)
app.use('/post',postRouter)
app.use('/',categoriesRouter)


app.listen(3000,()=>{
    console.log('server at 3000');
})