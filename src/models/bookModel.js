const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    
    bookName : {
        type : String,
        required : true
    },
    author_id : {
        type : Number
    },
    price : Number,
    ratings : Number

})

module.exports = mongoose.model("book", bookSchema);