import { getConnection } from "./connection";
import { getOBJpublic } from "./MAPPING_SQL";


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

 export function getRows(mass) {
  let masshttp = []
  

  for (let i = 0; i < mass.length; i++) {
     
      masshttp.push(
          
          <tr key={i} style={{}}>
              <th style={{}} scope="row">{mass[i][0]}</th>
              <td style={{...mass[i][3]}}>{mass[i][1]}</td>
          </tr>
          )
  } return masshttp
}

 export function getMassForm (server = "159",form = "OSN",mainForm = getOBJpublic()){
  let mass = []
  //---Основное меню

  if(server==="159"){mass.push([mainForm.dataport_id.name, mainForm.dataport_id.value, 'OSN', {"color": "lightgreen"}])}
  if(server ==="151") {mass.push([mainForm.sparkid.name, mainForm.sparkid.value, 'OSN', {"color": "cyan"}])}
  if(server === "151"){mass.push([mainForm.full_name.name, mainForm.full_name.value, 'OSN',{"color":"lightgreen", "fontSize": "16px","fontWeight":"700" ,"padding":"10px"}])}
  if(server === "159"){mass.push([mainForm.full_name.name, mainForm.full_name.value, 'OSN',{"color":"gold", "fontSize": "16px","fontWeight":"700" ,"padding":"10px"}])}
   
   
  mass.push([mainForm.name_eng.name, mainForm.name_eng.value, 'OSN',{}])
  mass.push([mainForm.date_first_reg.name, mainForm.date_first_reg.value, 'OSN', {}])
  mass.push([mainForm.ogrn.name, mainForm.ogrn.value, 'OSN', {}])
  mass.push([mainForm.inn.name, mainForm.inn.value, 'OSN', {}])
  mass.push([mainForm.kpp.name, mainForm.kpp.value, 'OSN', {}])
  mass.push([mainForm.okopf.name, mainForm.okopf.value, 'OSN', {}])
  mass.push([mainForm.okved_name.name,mainForm.okved_code.value +' '+ mainForm.okved_name.value, 'OSN', {}])
  mass.push([mainForm.capital.name, mainForm.capital.value, 'OSN', {}])
  mass.push([mainForm.status.name, mainForm.status.value, 'OSN', {}])
  mass.push([mainForm.leader.name, mainForm.leader.value, 'OSN', {}])

  //--------Контакты
  mass.push(([mainForm.address.name, mainForm.address.value, 'CONT', {}]))
  mass.push(([mainForm.phones.name, mainForm.phones.value, 'CONT', {}]))
  mass.push(([mainForm.phone_parsed.name, mainForm.phone_parsed.value, 'CONT', {}]))
  mass.push(([mainForm.email.name, mainForm.email.value, 'CONT', {}]))
  mass.push(([mainForm.web.name, mainForm.web.value, 'CONT', {}]))



 
  mass = mass.filter(el => el[2] === form)
  ///console.log(mass)

  mass =  getRows(mass)

 
  return mass   // 
}



 export const  getParamsObj = () => {
  const obj = {
    fields : "*",
    scheme : "EXTREP_MDM",
    table : "EXTENDEDREPORT",
    dopSql: "LIMIT 1",
    host:"/post"
    }
return  obj;
}





 