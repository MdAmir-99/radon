// const res = require('express/lib/response');
const authorModel = require('../models/authorModel');
const bookModel = require('../models/bookModel');

const createAuthor = async (req, res) => {

    let data = req.body;
    if(data.author_id)
    {
        let saveData = await authorModel.create(data);

        res.send({ msg : saveData });
    }

    else
    {
        res.send({msg : "Please Enter AuthorId"});
    }
    
}


const fetchAuthorName = async (req, res) => {
    
    let fetchId = await bookModel.findOneAndUpdate({bookName : {$regex : /.*Two States.*/, $options : 'i'}}, {$set : {price : 100}} , {new : true})
    let author = await authorModel.find({author_id : fetchId.author_id}).select({authorName:1, _id:0});
    let price = fetchId.price;
    res.send({msg : author, bookPrice : price})
}


const authorByPrice = async (req, res) => {
    let fetchId = await bookModel.find({price : {$gte : 50, $lte : 100}}).select({author_id :1,bookName:1, _id : 0})
    // console.log(fetchId);
    let finalResult =  fetchId.map(async function(ele, ind) {
        let result = await authorModel.find({author_id : ele.author_id}).select({authorName : 1, _id : 0})
        // console.log(result);
        return result;
    })
    // console.log("*********************")
    // console.log(finalResult)

    // console.log(fetchId);

    res.send(finalResult)
    
}
module.exports.createAuthor = createAuthor;
module.exports.fetchAuthorName = fetchAuthorName;
module.exports.authorByPrice = authorByPrice;