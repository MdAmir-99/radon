const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    balance : {
        type : Number,
        default : 100
    },
    address : String,
    age : Number,
    gender : {
        type : String,
        enum : ["male","female","other"]
    },
    isFreeAppUsers : Boolean
}, {timestamps : true})

module.exports = mongoose.model('users', userSchema)
