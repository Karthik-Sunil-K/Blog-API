const express = require('express');
const { json } = require('express/lib/response');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/AlienDBex';

const alienRouter=require('./routes/aliens');

const app = express();

mongoose.connect(url,{useNewUrlParser:true})

const con = mongoose.connection

con.on('open',()=>{
    console.log('db connected');
});
app.use(express.json())
app.use('/aliens',alienRouter);


app.listen(9000,()=>{
    console.log('server at 9000');
})