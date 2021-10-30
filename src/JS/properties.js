import { getConnection } from "./connection";



export async function getResponse(e){
  if(e.target.value){
  let  response =  await getConnection(e.target.value);
  if(response){
    response.suggestions.map(el=> {
   el.req = e.target.value;
   el.count= response.suggestions.length;
   return el;

 })
 
 return response;
  }
  return null;
     }
 }