import React  from 'react';
import s from '../../CSS/cownerslinks.module.css'


const HOLDER = ({h})=>{
return (
    <div className= {s.cards}> 
    <div style={{color:'black'}}>
     {h?.length && h.map((c,i)=>{
       return (<div key={i} style ={{borderRadius:10}}>
                 <div style={{display:'flex',justifyContent:'flex-start'
                 ,borderBottom:'1px solid red'
                 ,padding:'5px'
                 ,margin:'5px'
                 ,fontSize:'10px'
                 }}>
                 <span style={{color:'blue',fontWeight:'700'}}>{`ИНН:`}</span>
                 <span style={{marginLeft:'2px',color:'blue',fontWeight:'700'}}>{c.inn}</span>
                 <span style={{marginLeft:'5px',fontWeight:'700',color:'black'}}>{`ОГРН:`}</span>
                 <span style={{marginLeft:'2px',color:'black'}}>{c.ogrn}</span>
                 </div>

            <div style= {{padding:'15px'
            ,background:'#4f6a64'
            ,letterSpacing:1
            ,color:'white',fontSize:'12px',fontWeight:'bold'}}> 
            {c.fullnamerus} 
            </div>
            <div style= {{padding:'10px'
            ,color:'black',fontSize:'10px',fontWeight:'bold'}}> 
            {c.address} 
            </div>

               </div>)
     })} 


    </div>
    </div>  
  )

}

export default HOLDER;
