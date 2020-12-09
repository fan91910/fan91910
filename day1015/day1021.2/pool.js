const mysql = require('mysql');
// 创建连接池对象
var pool= mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'root',
  database:'user',
  connectionLimit:20

});
module.exports=pool;