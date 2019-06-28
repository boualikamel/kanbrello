var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =  require('cors');
require('dotenv').config();


var userRouter = require('./server/routes/user');

var app = express();

app.use(logger('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/api/users', userRouter);

app.listen(3000,()=>{
    console.log('server is working on port 3000')
})
module.exports = app;
