const express = require('express');
const router = express.Router();

const userModel = require('../models/userModel');
const userController = require('../controllers/userControllers');
const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');

router.get('/test', (req, res) =>{
    res.send("This is Test Api")
})


router.post('/creatUser', userController.createUser)

router.get('/getUser', userController.getUser)


// Book & Author Routes Given Below

router.post("/createBook", bookController.createBook)

router.post('/createAuthor', authorController.createAuthor)

router.get('/fetchBookOfChetan', bookController.fetchBookOfChetan)

router.get('/fetchAuthorName', authorController.fetchAuthorName)

router.get('/authorByPrice', authorController.authorByPrice)


module.exports = router;