const authorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    let author = req.body
    let data = await authorModel.create(author)
    res.send({msg: data})
}

const getAuthorsData= async function (req, res) {
    let authors = await authorModel.find()
    res.send({data: authors})
}

module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData