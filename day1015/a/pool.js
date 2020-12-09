const mysql =require('mysql')
var pool=mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'stuinfo',
    connectionLimit:20
})
module.exports=pool;