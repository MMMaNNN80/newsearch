
import React, { Fragment } from "react";
import GET_TABLE_SCR from "../JS/GET_TABLE_SCR.jsx";
import MAIN_CARD from "../JS/MAIN_CARD";
import ZAGOLOVOK  from "../COMPONENTS/ZAGOLOVOK";
import { getEmpty } from "../JS/properties.js";


const LIC_ZNAK = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))

  const mainForm = props.mainForm
  if (!mainForm) { return null }

  //console.log( mainForm.massLeadersHis)
  let massLic=[]
  let tovZnak = []

  if (mainForm.massLIC.length>0) {
        massLic = mainForm.massLIC.filter(el=>el.sort.includes('LIC'))
        tovZnak = mainForm.massLIC.filter(el=>el.sort.includes('TOV_ZNAK'))
      
        //-------- ЛИЦЕНЗИИ
         massLic = massLic.map((el,i) =>
    {return [i+1,
      (el.is_active === 1) ?
      <>
      <div>
          <div className="quadr" style={{ "display": "inline-flex" }}></div>
          <div style={{ "display": "inline",color:'black',fontSize:'13px' }}>{el.name}</div>

        </div>
      
      <span style={{color:'grey',fontSize:'11px'}}> {` c ${el.date_begin}  по ${el.date_end? el.date_end : ' настоящее время '} `} </span>
      </>
         : 
         <>
         <span style={{color:'black',fontSize:'11px'}}>{el.name}</span>
         <span style={{color:'grey',fontSize:'11px'}}> {` c ${el.date_begin}  по ${el.date_end? el.date_end : 'настоящее время'} `} </span>
         </>
        ,<div>
                   <div style={{color:'blue',fontSize:'13px'}}> {`Тип деятельности:`}</div> 
         <span style={{color:'black',fontSize:'13px'}}> {`${el.text}`} </span>

          <div style={{color:'blue',fontSize:'13px'}}> {`Орган выдачи:`}</div> 
         <span style={{color:'#d10d8f',fontSize:'14px',fontWeight:'700'}}> {`${el.regauthority}`} </span>  



        </div>
       ,<div>
       <span style={{color:'black',fontSize:'10px'}}> {`№ ${el.grn} от ${el.recdate} `} </span>  
      </div>
        
        ]})


   tovZnak = tovZnak.map((el,i) =>
   
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

    }

  function DATA() {
    return (
      <Fragment>
             <ZAGOLOVOK  text={'Лицензии, сертификаты и зарегистрированные товарные знаки'}/>
                         <div style={{ padding: '10px' }}>
                            <p style={{color:'gold',fontSize:'13px'}}>{`Информация о лицензиях`}</p>

                            {massLic.length>0 ?  <GET_TABLE_SCR
                                    massObjCol= 
                                        {[
                                            { name: '#', style: { width: '4%' } },
                                            { name: 'Номер лицензии', style: { width: '22%' } },
                                            { name: 'Кем выдано / Тип деятельности', style: { width: '65%' } },
                                            { name: 'Данные ГРН', style: { width: '15%' } },
                                        ]}
                                     massValues={ massLic} heightT={{ height:  'auto' }}
                                     
                                     styleCell = {{background:'white'}}
                                     /> :getEmpty("Отсутствует информация о лицензиях, выданных компании")} </div> 
                                     
                            <div style={{ padding: '5px' }}>
                            <p style={{color:'gold',fontSize:'13px'}}>{`Информация о зарегистрированных товарных знаках`}</p>

                            {tovZnak.length>0 ?   <GET_TABLE_SCR
                                    massObjCol= 
                                        {[
                                            { name: '#', style: { width: '4%' } },
                                           
                                            { name: 'Номер заявки', style: { width: '8%' } },
                                            { name: 'Дата регистрации товарного знака', style: { width: '15%' } },
                                            { name: 'Срок окончания действия', style: { width: '15%' } },
                                            { name: 'визуальное отображение', style: { width: '10%' } },
                                            { name: 'Ссылка на источник', style: { width: '12%' } },
                                        ]}
                                     massValues={ tovZnak} heightT={{ height:  '250px' }}
                                     
                                     styleCell = {{background:'white'}}
                                     thread = {{background:'#484798'}}
                                     /> : getEmpty("Отсутствует информация о зарегистрированных товарных знаках")}</div>
                            
      </Fragment>

    )
  }
  return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)
}

export default LIC_ZNAK;


