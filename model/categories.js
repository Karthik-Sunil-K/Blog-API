
const mongoose = require('mongoose');

const CatergorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
},
    { timestamps: true }
);
module.exports = mongoose.model('Catergories', CatergorySchema);
