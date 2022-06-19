const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: true,
        required: true
    },
    category: {
        type: Array,
        required: false
    },
},
    { timestamps: true },

);

module.exports = mongoose.model('Post',PostSchema)