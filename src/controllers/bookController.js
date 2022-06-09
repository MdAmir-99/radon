const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook= async function (req, res) {
    let book = req.body
    let auther_id = req.body.author_id;
    let publisher_id = req.body.publisher_id;
    let id = req.body._id;
    if(auther_id !== undefined && publisher_id !== undefined)
    {
        let confirmAuthId = await authorModel.find({ _id : auther_id });
        let confirmPublishId = await publisherModel.find({ _id : publisher_id })
        if(confirmAuthId.length > 0 && confirmPublishId.length > 0)
        {
            let bookCreated = await bookModel.create(book)
            res.send({data: bookCreated})
        }
        else{
            res.send("Please filled all the fields are mandetory")
        }
    }
    else{
        res.send("Please filled all the fields are mandetory")
    }
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBookAuthorPublisher = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id publisher_id')
    res.send({data: specificBook})

}

const bookByPublisherName = async (req, res)=> {
    let books = await bookModel.find().populate('publisher_id')
    .updateMany({$or : [{ 'publisher_id.name' : 'Penguin'},
    {'publisher_id.name' : 'HarperCollins'}]},
    {$set : {isHardCover : true}},
    {new : true}
    )
    
    res.send({msg : books})
}


const changePrice = async (req, res) => {
    let book = await bookModel.find().populate('author_id')
    .updateMany({'author_id.rating' : {$gt : 3.5}},
    {$set : {$inc : {price : 10}}},
    {new : true})

    res.send({msg : book})
}

// $or : [{'publisher_id.name' : 'Penguin' },
//     {'publisher_id.name' : 'HarperCollins' }]

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBookAuthorPublisher = getBookAuthorPublisher
module.exports.bookByPublisherName = bookByPublisherName
module.exports.changePrice = changePrice

