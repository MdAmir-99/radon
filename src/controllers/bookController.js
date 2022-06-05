const bookModel = require("../models/bookModel");

const createBook = async (req, res) =>{
    let data = req.body;
    let saveData = await bookModel.create(data);
    res.send({msg : saveData})
}

const getBookData = async (req, res) => {

    let allBooks = await bookModel.find();
    res.send({msg : allBooks})
 }

 module.exports.createBook = createBook;
 module.exports.getBookData = getBookData;