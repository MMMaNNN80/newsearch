
import React, { useState, useRef, useEffect} from "react";
import ZAGOLOVOK  from "../COMPONENTS/ZAGOLOVOK";
import {f_get_substates } from "../JS/SQL";






const SUBSTATES = ({dp_id}) => {
  const [massSub,setMassSub] = useState([])
  const [maxyear,setMaxYear] = useState(0);

  //let mainForm = JSON.parse(localStorage.getItem('159'))
const load = useRef(false)

useEffect( ()=>
f_get_substates(dp_id,5)
.then (mass=> {setMassSub(mass);return mass })
.then(mass=>  setMaxYear(Math.max.apply(null, mass.map(el=>el.year_))))
.then (load.current=true)
,[dp_id])
 


  function DATA() {
    return (
      <>
             <ZAGOLOVOK  text={'Информация об обращениях в налогоговую инспекцию'} fSize={12}/> 
             <br/>
             <div style={{mixBlendMode:'hard-light' ,background:'cyan',padding:'10px'}}>
                {
               
                massSub.filter(el=>el.src.includes('AGG') && el.year_ === maxyear)
                                          .map((el,i)=>{
                                            return (	<div key={i} style={{padding:'2px',color:'black',fontSize:'12px'}}>&#9658;{el.rec_type}</div>)
                                          })
                } 
                </div>
                <br/>                     
                         
      </>

    )
  }
  return (<> {DATA()}  </>)
}

export default SUBSTATES;


