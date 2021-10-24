import React, { useState } from 'react';
import '../App.css';
import { getConnection } from '../JS/connection';




function SEARCHSTRING() {
   const [state,setState]=useState('')

async function getResponse(e){
    if(e.target.value){
 let  response =  await getConnection(e.target.value);
response.req = e.target.value
response.count= response.suggestions.length
 await setState(response);
 return response;

    }

}


return (
 

  
    <div className="container">
            <div className={"lbl lead "} >ПОИСК</div>

                <input type="text" name="searchstr"
                placeholder={'Введите поисковый запрос'} 
                onChange={
              (e)=> {getResponse(e);} }
                />

<GETCARDS mass= {state} />    

  </div>

  
 
)
}

function GETCARDS(props) {



  return (
      <div className="cards">
     
    <CARDS/>
          
      </div>
  )

  function CARDS() { 

    if(props.mass && props.mass.req.length>0)
    { 
    const mass = props.mass.suggestions
console.log(props.mass)




return  mass.map ((obj,num) => 
     { 
const shortname = obj.value ;
const  data = obj.data; 
let color=[];
obj.key = num
obj.req = props.mass.req
obj.count = props.mass.count
if  (data.branch_type ==='MAIN') {data.branch_type  = 'Головная компания'}
if  (data.branch_type ==='BRANCH')  {data.branch_type  = 'Филиал'}
if ( data.state && data.state.status === "ACTIVE") {  color = {backgroundColor:"green"}}
else if (data.state && data.state.liquidation_date ) {
    color = {backgroundColor:"red"}  
} 
else  {
    color = {backgroundColor:"blue"}  
} 

    return (
           <div className="card" key = {obj.key}>
               <div className="status " style = {color}></div>


              <div className="reqv  lead">

              &#9885;  {' ИНН: ' + data.inn +' КПП: '+ (data.kpp?data.kpp:'-') + ' ОГРН: ' + (data.ogrn ? data.ogrn:'-') } &#9885;
               </div>
                <div className="orginfo">
                    <div className="orgname lead">
                        {shortname}
                    </div>
                   <div className="orgform">
                   &#9971;  { 
                data.branch_type
                       }
                   </div>

                    <div className="orgleader">
                        {
              !data.management? '' : data.management.post.toLowerCase() +': ' + data.management.name
                        }
                   </div>
                    <hr/>

                    <div className="orgaddress monospace lead">
                        {data.address.unrestricted_value}
                    </div>

                </div>
                </div>
     )
                  
       } 

                )
    } else { return '';}
   

                }

}


  



    export default SEARCHSTRING;
