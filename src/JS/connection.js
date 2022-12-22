import { getMainform } from './MAPPING_SQL';


const href = 'http://10.42.108.144:8080/suggestions/api/4_1/rs/suggest/party';

export async function getConnection(request) {

  if(request && request.length>0) {request=request.replace(/[^a-zа-яё0-9\s]/gi, ' s')}
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


    if (response.status === 200) { return response.json();}
    
  } catch (e) {
    console.log('getConnection', e)
    return '';
  }
}

export const getResponsePg =  async ( obj

) => {
  //console.log(host)
  const response =
     await fetch(`http://10.42.78.166:38169/api/1.0${obj.host}`,
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
//  console.log(jsonData)

 
 console.log('загружаем данные с БД');
return  jsonData;
}


export async function  render (obj) {


  return await getMainform(obj)
}





    




