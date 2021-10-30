const Pool = require('pg').Pool;
require("dotenv").config();

let conn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
     
}

 const pool = new  Pool(conn)
 
 module.exports =pool;


