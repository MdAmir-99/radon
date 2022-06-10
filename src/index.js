const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/Pritesh8769811-DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        let timeStamp = Date.now();
        let dateObj = new Date(timeStamp)
        let date = dateObj.getDate();
        let month = dateObj.getMonth() + 1;
        let year = dateObj.getFullYear();
        let hours = dateObj.getHours();
        let min = dateObj.getMinutes();
        let seconds = dateObj.getSeconds();
        let ip = req.ip;
        let path = req.url;
        // YYYY-MM-DD HH:MM:SS
        console.log (`${year}-${month}-${date} ${hours}-${min}-${seconds}`);
        console.log(ip);
        console.log(path);
        next();
  }
  );

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
