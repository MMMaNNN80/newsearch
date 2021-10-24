import React, { useState } from 'react';
import '../App.css';
import { getConnection } from '../JS/connection';
import GETCARDS from './GETCARDS';

function SEARCHSTRING() {
   const [state,setState]=useState('')
   const [inputStyle,setinputStyle]=useState([]);

   async function getResponse(e){
    if(e.target.value){
 let  response =  await getConnection(e.target.value);
response.req = e.target.value
response.count= response.suggestions.length
  setState(response.suggestions);
 return response;
    }
}
function update(state){
    setState(state)
}
return (
       <div className="container">
            <div className={"lbl lead "}  >ПОИСК</div>

                <input type="text" name="searchstr" style = {{...inputStyle}}
                placeholder={'Введите поисковый запрос'} 
                onChange={ (e)=> {
                    if(e.target.value.length>0) {
            setinputStyle( 
                {textTransform:'uppercase'
                ,fontWeight:'500'
                ,letterSpacing: '1px'})}
                else {setinputStyle()} 
             getResponse(e);
                }
            
            }
                />
<GETCARDS state = {state} update = {update} /> 
  </div>

  
 
)
        }

    export default SEARCHSTRING;
