const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "author"
    },
    price: Number,
    ratings: Number,
    publisher_id : {
        type : ObjectId,
        ref : "publisher"
    },
    isHardCover : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });


module.exports = mongoose.model('book', bookSchema)
