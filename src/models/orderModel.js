const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({

    userId : {
        type : ObjectId,
        ref : 'users'
    },
    productId : {
        type : ObjectId,
        ref : 'products'
    },
    amount : Number,
    isFreeAppUser : Boolean,
    date : String
},{timestamps : true})


module.exports = mongoose.model('orders', orderSchema);