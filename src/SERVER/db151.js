const Pool = require('pg').Pool;
require("dotenv").config();

let conn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
     
}

let conn151 = conn
conn151.host = '10.42.76.151'


 const pool151 = new  Pool(conn151)


 module.exports = pool151; 

 


