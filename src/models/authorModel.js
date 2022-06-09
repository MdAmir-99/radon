const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorName:{
        type : String,
        required : true
    },
    age:{
        type : Number,
        required : true
    },
    address:String,
    rating: Number

}, { timestamps: true });

module.exports = mongoose.model('author', authorSchema)
