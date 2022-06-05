const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    bookName : {
        type : String,
        required : true
    },
    authorName : String,
    category : {
        type : String,
        enum : ["comic", "action", "poetry", "drama", "horror"],
        required : true
    },
    year : Number

}, { timestamps: true })

module.exports = mongoose.model('book', bookSchema)