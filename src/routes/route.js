const express = require('express');
const underscore = require('underscore')
const lodash = require('lodash')

const myHelper = require('../util/helper')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {
   
    let monthsName = ['jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        // ********* Problem-1 ***********
    console.log("Subarray using chunk() method")
    console.log(lodash.chunk(monthsName, 4));

        // ********* Problem-2 ***********
    
    let oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

    console.log(lodash.tail(oddNum))

    console.log("Last 9 element using tail() method")
        // ********* Problem-3 ***********

    let arr1 = [1, 2, 3];
    let arr2 = [1, 4, 3];
    let arr3 = [5, 6, 3];
    let arr4 = [1, 2, 7];
    let arr5 = [8, 2, 9];
    console.log(lodash.union(arr1, arr2, arr3, arr4, arr5))

    console.log("Union of Array using union() method")
        // ********* Problem-4 ***********

    let keyVal = [
        ['horror', 'The Shining'], ['drama', 'Titanic'],
        ['thriller', 'Shutter Island'], ['fantasy', 'Pans Labyrinth']
    ]

    console.log(lodash.fromPairs(keyVal));
    console.log("Convert Array into obj(Key:Value) using frompairs() method")

    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})

                    // ************* Task-1 ****************
let moviesArr = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins'];
router.get('/movies', (req, res) => {
    res.send(moviesArr)
})

router.get('/movies/:id', (req,res) =>{
    let id = req.params.id;
    

                // ************* Task-2 && Task-3 ****************
    if(id > moviesArr.length-1)
    {
        res.send(`Sorry Result Not Found Please Enter A Valid Id between <h3>" 0 to ${moviesArr.length -1} "</h3>`);
    }
    else
    {
        res.send(`<h3>${JSON.stringify(moviesArr[id])}</h3>`)
    }
})

                // ************* Task-4 ****************
let movieObj = [ 
                   {
                    id: 1, 
                    name: "The Shining"
                   }, 
                   {
                    id: 2,
                    name: "Incendies"
                   }, 
                   {
                    id: 3,
                    name: "Rang de Basanti"
                   }, 
                   {
                    id: 4,
                    name: "Finding Nemo"
                   }]
router.get('/films', (req,res)=>{

       res.send(movieObj)
       
})


                    // ************* Task-5 ****************

router.get('/films/:filmId', (req,res)=>{
    let filmId = req.params.filmId;
    if(filmId <= movieObj.length - 1)
    {
        res.send(`<h2>${JSON.stringify(movieObj[filmId])}</h2>`)
    }
    else
    {
        res.send(`No movie exists with this id Please Enter Id Between <h2>" 0 to ${movieObj.length -1} " </h2>`);
    }
})

                    


module.exports = router;
// adding this comment for no reason