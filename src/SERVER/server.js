
const express = require('express')
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 5000


app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//***************************************************** *
app.post('/post',  async(req, res) => {
  
  try {
    const sql = await req.body;
 //console.log(sql)
    
    const sqlstr  = 
    `SELECT  ${sql.fields} FROM 
    ${sql.scheme}.${sql.table}  ${sql.dopSql} `;
  
    //console.log(sqlstr);

    
    
     const respResult = await pool.query(sqlstr )


      res.json(respResult.rows);
      
    
  } catch (error) {
    console.log('Ошибка запроса')
    console.log(error)
  }
  })
  
//***************************************************** *
module.exports = app


















