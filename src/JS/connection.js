import { getMainform } from './MAPPING_SQL';

const href = 'http://10.42.108.144:8080/suggestions/api/4_1/rs/suggest/party';

export async function getConnection(request) {
  try {
    const response = await fetch(href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: `{
            "query": "${request}",
            "count":10              
    }`
    })

    if (response.status === 200) {

      return response.json();
    }
    return '';
  } catch (e) {
    console.log('Проблемы с подключением', e)
    return null;
  }
}

export const getResponsePg =  async ( obj

) => {
  //'http://localhost:5000/post'
  //'http://localhost:5000/151'
  let host =obj.host // `${obj.end_point}`
  //console.log(host)
  const response =
     await fetch(host,
  {
  method: "POST",
  headers: {
     "Content-Type": "application/json"  
},
  body:`{
    "fields": "${obj.fields}",
    "scheme": "${obj.scheme}",
    "table": "${obj.table}",
    "dopSql": "${obj.dopSql}"
  }`

}
  ) 
  
 const jsonData= await response.json()
 ///console.log(jsonData)

 
 console.log('загружаем данные с БД');
return await jsonData;
}

export async function  render (obj) {


  return await getMainform(obj)
}





    




