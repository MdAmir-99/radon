const productmodel = require('../models/productModel');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');


const validator = async (req, res) => {
    let data = req.body;
    let userId = req.body.userId;
    let productId = req.body.productId;

    if(userId !== undefined && productId !== undefined)
    {
        let validateUserId = await userModel.find({_id : userId})
        let validateProductId = await productmodel.find({_id : productId})
        if(validateUserId.length > 0 && validateProductId.length > 0)
        {
           let saveData = await orderModel.create(data);
           res.send({msg : saveData});
        }
        else
        {
            res.send({msg : "Error Message"})
        }
    }
    else
    {
        res.send({msg : "Error Message"})
    }
}


const paidOrFree = async (req, res)=>{

    let paid = req.headers.isfreeappusers
    let id = req.body._id
    let proId = req.body.productId
    let uId = req.body.userId

    if(paid == 'false')
    {
        let proPrice = await productmodel.findOne({_id : proId}).select({price : 1, _id : 0});
        console.log(proPrice.price);
        let price = proPrice.price;
        // let deductBal = await userModel.findOneAndUpdate({_id : uId}, {$set : {balance : {balance - price}}}, {new : true});
        let updateddata = await orderModel.findOneAndUpdate({_id : id}, {$set : {amount : price, isFreeAppUser : false}}, {new : true});
        res.send({msg : updateddata})
    }
    else
    {
        res.send({msg : "Error Message"})
    }
}


module.exports.validator = validator;
module.exports.paidOrFree = paidOrFree;
