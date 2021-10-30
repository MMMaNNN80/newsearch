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
  const response =
     await fetch('http://localhost:5000/post',
  {
  method: "POST",
  headers: { "Content-Type": "application/json"},
  body:`{
    "fields": "${obj.fields}",
    "scheme": "${obj.scheme}",
    "table": "${obj.table}",
    "dopSql": "${obj.dopSql}"
  }`

}
  ) 
  
 const jsonData= await response.json()
return jsonData;
}

export const  getParamsObj = () => {
  const obj = {
    fields : "*",
    scheme : "EXTREP_MDM",
    table : "EXTENDEDREPORT",
    dopSql: "LIMIT 1"
    }
return  obj;
}





    




