const express =require('express')
const body =require('body-parser')
const pool = require('../pool')

var userRouter=express.Router()
userRouter.post('/reg',function(req,res){
    console.log(req.body)
    var reguser=req.body;
    var sql='insert into stu1 values(?,?)'
    pool.query(sql,[reguser.uname,reguser.upwd],function(err,result){
        console.log(result)
        if(err) throw err
        if(result.affectedRows>0){
            res.send('1')
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

userRouter.delete('/del/:uid',(req,res)=>{
    var uid = req.params.uid;
    var sql = `delete from user where uid=?`;
    pool.query(sql,[uid],function(err,result){
        if(err) throw err;
        console.log(result);
        if(result.affectedRows>0){
            console.log(result.affectedRows>0)
            res.send('1');
        }else{
            res.send('0')
        }
    })
})

module.exports=userRouter