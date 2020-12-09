const express = require('express');
var userRouter = require('./routers/userRouter');
const body = require('body-parser');
const{ uslencoded } = require('body-parser');

var app = express;
app.listen(8080);
app.use(body.urlencoded({
  extended:false
}))

app.use(express.static('public'));
app.user('/user',userRouter);