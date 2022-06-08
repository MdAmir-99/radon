const bookModel = require('../models/bookModel')
const authorModel = require('../models/authorModel')

const createBook = async (req, res) => {
    let data = req.body;

    if(data.author_id)
    {
        let saveData = await bookModel.create(data);
        res.send({msg : saveData})
    }
    else
    {
        res.send({msg : "Please Enter AuthorId"});
    }

   
    
}


const fetchBookOfChetan = async (req, res) => {

    let fetchId = await authorModel.find({authorName : { $regex: /.*Chetan Bhagat.*/, $options: 'i' }}).select({author_id :1, _id:0})
    // console.log(fetchId)
    let result = await bookModel.find({author_id : {$eq : fetchId[0].author_id}})
    res.send({msg : result})
}

module.exports.createBook = createBook;
module.exports.fetchBookOfChetan = fetchBookOfChetan;