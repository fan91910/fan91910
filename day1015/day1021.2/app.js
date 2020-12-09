const express = require('express');
const querystring=require('querystring');
var userRouter = require('./routers/userRouter');
// 导入第三方中间件
var body = require('body-parser');
//  创建服务器
var app = express();
app.listen(8080);

app.use(body.urlencoded({
  extended:false// 不使用第三方qs模块，而是使用核心模块querystring
}))

// 1，页面       路由
//  注册页面     静态资源  /reg      /user/reg
//  登录页面      /login            /user/login

// 1,静态文件夹  放静态资源
// 2，创建路由器
// 3，中间件

// 1， 加载静态资源
app.use(express.static('public'));
// 3中间件
app.use('/user/reg',function(req,res,next){
  // console.log(req.query);
  console.log('中间件');
  // 判断是否为空  不为空注册成功  否则注册失败
  // req.on('data',function(mydata){
  //   var obj = querystring.parse(mydata.toString());
  //   console.log(obj);
  //   if(obj.uname.length>0 && obj.upwd.length>0){
  //     // 注册成功  执行下一步 路由
  //     next();
  //   }else{
  //    res.send('账号或密码为空')
  //   }
  //   })
// 使用第三方中间件 获取post请求数据
  console.log(req.body);
  if(req.body.uname.length>0 && req.body.upwd.length>0){
    next();
  }else{
       res.send('账号或密码为空')
    }
  
})
app.use('/user/login',function(req,res,next){
  console.log(req.query);
  console.log('中间件');
  // 判断是否为空  不为空注册成功  否则注册失败
  var user = req.query;
  if(user.uname.length>0 && user.upwd.length>0){
    // 注册成功  执行下一步 路由
    next();
  }else{
   res.send('账号或密码为空')
  }
  
})

// 2,创建路由器
app.use('/user',userRouter);








