const mysql = require("mysql");

var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"root",
    database:"user",
    connectionLimit:20
})
module.exports=pool;
