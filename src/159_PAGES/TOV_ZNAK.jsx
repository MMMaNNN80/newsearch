
import React, { Fragment } from "react";
import GET_TABLE_SCR from "../JS/GET_TABLE_SCR.jsx";
import { getEmpty } from "../JS/properties.js";
import SPINER from "../JS/SPINER";



const TOV_ZNAK = ({ tovZnak}) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))

///if(tovZnak && tovZnak.mass.length===0) {return null}

let tovZnakMass =[]

        tovZnakMass = tovZnak.mass.map((el,i) =>
   
   {
    const logo =el.url_logo
    return [   (el.is_active === 1) ?
    <div>
          <div  style={{ "display": "inline-flex" }}>{i+1}</div>
          <div className="quadr"  style={{ "display": "inline",color:'black',fontSize:'13px',marginLeft:'5px' }}>   </div>

        </div> : i+1
  
      , <span style={{color:'black',fontSize:'14px'}}>{el.registration_number}</span>
      ,<div>
        <span style={{color:'black',fontSize:'14px'}}> {`${new Date(el.registration_date).toLocaleDateString()}`} </span>  
       </div>
       ,  
       <div>
        <span style={{color:'black',fontSize:'14px'}}> {`${new Date(el.expiration_date).toLocaleDateString()}`} </span>  
       </div>
       ,<img alt="" src={`${logo}`} width={70} />
      ,<div>
        <a  href={el.publication_url}
           target={"_blank"}
           rel="noopener noreferrer">
      <button className="btn btn-secondary p-1"> {`Ссылка на источник`}</button>
      </a>
     </div>
       
       ]})
            

    return (
      <Fragment>

                                     
                             <div style={{ padding: '5px' }}>
                            <p style={{color:'gold',fontSize:'13px'}}>{`Информация о зарегистрированных товарных знаках`}</p>

                            {tovZnak.mass.length>0 ?   <GET_TABLE_SCR
                                    massObjCol= 
                                        {[
                                            { name: '#', style: { width: '4%' } },
                                           
                                            { name: 'Номер заявки', style: { width: '8%' } },
                                            { name: 'Дата регистрации товарного знака', style: { width: '15%' } },
                                            { name: 'Срок окончания действия', style: { width: '15%' } },
                                            { name: 'Зарегистрированный знак', style: { width: '13%' } },
                                            { name: 'Ссылка на источник', style: { width: '12%' } },
                                        ]}
                                     massValues={ tovZnakMass} heightT={{ height:  '250px' }}
                                     
                                     styleCell = {{background:'white'}}
                                     thread = {{background:'#484798'}}
                                     /> : 
                                    !tovZnak.loading ? getEmpty("Отсутствует информация о зарегистрированных товарных знаках"): <SPINER val={'100'} />}</div>
                            
      </Fragment>

    ) 
  

}

export default TOV_ZNAK;


