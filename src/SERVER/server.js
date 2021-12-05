
const express = require('express')
const app = express();
const cors = require('cors');
const p = require('./db');
const p151=  require('./db151')
const port = 5000


app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
//***************************************************** *
app.post('/159',  async(req, res) => {
  
console.log('159')
  try {
    const sql = await req.body;
// console.log(sql)
    const sqlstr  = 
    `SELECT  ${sql.fields} FROM  ${sql.scheme}.${sql.table}  ${sql.dopSql} `;

  
    console.log(sqlstr);
     const respResult = await p.query(sqlstr )
      res.json(respResult.rows); 
  } catch (error) {
    console.log('Ошибка запроса')
   console.log(error)
  }
  })

   app.post('/151',  async(req, res) => {
  
    try {
      console.log('151')
     const sql = await req.body;
   //console.log(sql)
      
      const sqlstr  = 
      `SELECT  ${sql.fields} FROM ${sql.scheme}.${sql.table}  ${sql.dopSql} `;
    
     //console.log(sqlstr + '151');
  
      
      
       const respResult = await p151.query(sqlstr )
       console.log(respResult);
  
        res.json(respResult.rows);
        
      
    } catch (error) {
      console.log('Ошибка запроса')
     // console.log(error)
    }
    })
  
//***************************************************** *
module.exports = app


















