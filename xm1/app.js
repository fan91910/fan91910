const express = require("express");
const userRouter = require("./routers/router");
const body = require("body-parser");
const pool = require("./pool");

var app = express();
app.listen(8080);

app.use(body.urlencoded({
    extended:false
}));

app.use(express.static('public'));
app.use(express.static('img'));

//  默认跳转
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

app.use("/",userRouter);
console.log("连接成功");