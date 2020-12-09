const express = require('express');
const mysql = require('mysql')
var body = require('body-parser');
var pool = require('../pool');
const userRouter = require('../../day1021.2/routers/userRouter');

userRouter.post('/reg',(req,res)=>{
    console.log(req.body);
    var reguser = req.body;
    var sql = "insert into user values(?,?)";
    pool.query(sql,[reguser.uname,reguser.upwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send('1');
        }else{
            res.send('0')
        }
    })

});

userRouter.post('/login',(req,res)=>{
    console.log(req.body);
    var user = req.body;
    var sql = `select * from user where uname=? and upwd=?`;
    pool.query(sql,[user.uname,user.upwd],(err,result)=>{
        if(err) throw err;
        console.log(result);
    })
})

module.exports=userRouter;