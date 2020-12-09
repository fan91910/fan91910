const express = require('express');
const querystring = require('querystring');
const path = require('path');
const mysql = require('mysql')
var body = require('body-parser');
var pool = require('../pool')
// 创建路由器
var userRouter = express.Router();
// 向路由器添加路由
// userRouter.get('/reg',function(req,res){
//   var url = path.resolve(__dirname, '..');
//   res.sendFile(url+'/public/login.html');
// })
// 接收post请求
userRouter.post('/reg',function(req,res){
// 连接数据库
// var con = mysql.createConnection({
//   host:'127.0.0.1',
//   port:'3306',
//   user:'root',
//   password:'root',
//   database:'user'
// });
// 0.03
// 1000/20=50
// 50*0.03=0.00150
console.log(req.body)
// 连接
// con.connect();
var sql = "insert into user values(?,?)";
pool.query(sql,[req.body.uname,req.body.upwd],function(err,result){
  if(err) throw err;
  if(result.affectedRows>0){
    var url = path.resolve(__dirname, '..');
  res.sendFile(url+'/public/login.html');
  }else{
    res.send('注册失败')
  }
})



  
  
})
 //    需要改成post
userRouter.get('/login',function(req,res){
  // 1,获取用户登录输入的账号密码 改成post
  // req.body.uname
  var sql = "select * from user where uname=? and upwd=?"
  pool.query(sql,[req.body.uname,req.body.upwd],function(err,result){
    // 得到数组
      if(result.length>0){
        res.send('登录成功')
      }else{
        res.send('登录失败，账号或者密码错误')
      }  

  })
  res.send('登录成功');  
})

module.exports=userRouter;