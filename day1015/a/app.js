const express = require('express')
const body=require('body-parser')
const { urlencoded } = require('body-parser')
var userRouter=require('./routers/userRouter')
var app =express()
app.listen(8080)
app.use(express.static('public'))
app.use(body.urlencoded({
    extended:false
}))
app.use('/user',userRouter)