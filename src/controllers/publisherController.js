const PublisherModel = require('../models/publisherModel');

const createPublisher = async (req, res) => {
    let data = req.body;
    let saveData = await PublisherModel.create(data)
    res.send({msg : saveData})
}


module.exports.createPublisher = createPublisher;