const mysql = require("mysql")
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "user",
    connectionLimit: 20
})
module.exports = pool