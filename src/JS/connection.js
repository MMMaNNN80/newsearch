
const href = 'http://10.42.108.144:8080/suggestions/api/4_1/rs/suggest/party';

 export async function getConnection (request) {

    const response =  await  fetch(href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }, 
        body: `{
            "query": "${request}",
            "count":10              
    }`

      })
      
      
      
      if (response.status === 200    ){
         
       return response.json();
        
    }
      return '';
    }


