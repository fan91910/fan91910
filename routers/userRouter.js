const express =require('express')
const body =require('body-parser')
const pool = require('../pool')

var userRouter=express.Router()
userRouter.post('/reg',function(req,res){
    console.log(req.body)
    var reguser=req.body;
    var sql='insert into stu1(uname,upwd) values(?,?)'
    pool.query(sql,[reguser.uname,reguser.upwd],function(err,result){
        console.log(result)
        if(err) throw err
        if(result.affectedRows>0){
            res.send('1')
        }else{
            res.send('0')
        }
    })
})

userRouter.post('/login',function(req,res){
    console.log(req.body)
    var user=req.body
    var sql = `select * from stu1 where uname=? and upwd = ?`;
    pool.query(sql,[user.uname,user.upwd],function(err,result){
        if(err) throw err;
        console.log(result)
        if(result.length>0){
            res.send('1')
        }else{
            res.send('0')
        }
    })
})
userRouter.get('/list',function(req,res){
    var sql=`select * from stu1`
    pool.query(sql,function(err,result){
        if(err) throw err;
        console.log(result)
        if(result.length>0){
            res.send(result);
        }
    })
})

userRouter.delete('/del/:uid',function(req,res){
    var uid =req.params.uid;//通过路由传参数
    var sql='delete from stu1 where uid=?'
    pool.query(sql,[uid],function(err,result){
        if(err)throw err
        console.log(result)
        if(result.affectedRows>0){
            res.send("1")
        }else{
            res.send('0')
        }
    })
})
module.exports=userRouter