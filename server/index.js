const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const multer = require('multer');

const user = require('./routes/users');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use('/api', user);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb://localhost:27017/techbaeform", {useNewUrlParser: true, useUnifiedTopology: true});


app.listen(4000,()=>{
    console.log("running on port 4000");
});
