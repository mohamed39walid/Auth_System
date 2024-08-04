const mysql2 = require('mysql2')


const conn = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "user_auth_system",
    password:"",
})


module.exports = conn