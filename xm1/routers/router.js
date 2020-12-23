const express = require("express");
const body = require('body-parser');
const pool = require('../pool');
const { send } = require('process');
var userRouter = express.Router();


userRouter.post('/check',function(req,res){
    console.log(req.body);
    var sql = "select * from userdata where uname=?";
    pool.query(sql,[req.body.uname],function(err,result){
        if(err) throw err
        if(result.length>0){
            res.send("1");
        }else{
            res.send('0')
        }
        
    })
    
    });
    
    userRouter.post('/reg',function(req,res){
      var data = req.body;
      var sql="insert into userdata(uname,upwd) values(?,?)";
      pool.query(sql,[data.uname,data.upwd],function(err,result){
        if(err) throw err;
        if(result.affectedRows>0){
          res.send('1')
        }else{
          res.send('0')
        }
      })
    }) ;
    userRouter.post('/login',function(req,res){
      var data = req.body;
      // console.log(data.uname,data.upwd+'------------');
      var sql="select * from userdata where uname=? and upwd=?";
      pool.query(sql,[data.uname,data.upwd],function(err,result){
        if(err) throw err;
        console.log(result.length>0)
        if(result.length>0){
          res.send('1')
        }else{
          res.send('0')
        }
      });
    });
    module.exports=userRouter;
