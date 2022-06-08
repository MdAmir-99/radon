const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    authorName : {
        type : String,
        required : true
    },
    author_id : {
        type : Number,
        required :true
    },
    age : Number,
    address : String

})

module.exports = mongoose.model("author", authorSchema);