import React, { useState } from 'react';
import '../App.css';

import {getResponse} from '../JS/properties'

function SEARCHSTRING(props) {
   const [inputStyle,setinputStyle]=useState([]);

//suggestions
const setSuggestions= async (e)=>{
const mass= await getResponse(e)
if(mass){props.objState.update(mass.suggestions)}
}
return (
       <div className="container">
            <div className={"lbl  "} >ПОИСК</div>
                <input type="text" name="searchstr" style = {{...inputStyle}}
                placeholder={'Введите поисковый запрос'} 
                onChange={ (e)=> {
                    if(e.target.value.length>0) {
            setinputStyle( 
                {textTransform:'uppercase'
                ,fontWeight:'500'
                ,letterSpacing: '1px'})}
                else {setinputStyle()} 
                  ;
        props.objState.setCardstate(0);
        setSuggestions(e);
                } 
            }
                />
                </div>
)
        }

    export default SEARCHSTRING;
