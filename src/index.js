const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/route');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb+srv://MdAmir_Db:admin123@cluster0.oag5gb9.mongodb.net/MdAmir_Db?retryWrites=true&w=majority",
{useNewUrlParser : true, useUnifiedTopology : true}).then(() => console.log("MongoDb is connected ✔")).catch(err => console.log({msg : err}))

app.use('/', route);

app.listen(process.env.PORT || 4000 , () => {
    console.log('Express is listening 🎧 on Port'+ (process.env.PORT || 4000))
});

// ifWxkoxs8qxLYXXy


// mongodb+srv://MdAmir_Db:admin123@cluster0.oag5gb9.mongodb.net/MdAmir_Db?retryWrites=true&w=majority