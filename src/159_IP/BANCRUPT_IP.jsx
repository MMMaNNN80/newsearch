import React, { useRef,Fragment,useState } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import MAIN_CARD from "../JS/MAIN_CARD";
import {  getRows } from "../JS/properties";
import { getMassRows,getMainText } from "../JS/properties";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";
import GET_MODAL from "../JS/GET_MODAL";
import { getBancruptMessages_ejs } from "../JS/preExportExcel";

const BANCRUPT_IP= ({activeModal,setActiveModal, massIP})=>{
let massBancrot= []
let massCases = []
let massMainINFO=[]
let massMessage=[]

const txt = useRef('');
const sort_ = useRef(true)
const [court,setCourt] = useState(true)
const [sort,setSort] =  useState(true)

///---352815106764


let mainForm = {}

 mainForm.massBancrupt =  massIP.mass.filter(el=>el.src === 'BANCRUPT')


 if (mainForm.massBancrupt.length===0)
{
return (
  
    <Fragment >
        <MAIN_CARD name = {`ИП ${massIP.mass[0].fullnamerus}` } CHILDREN =
        {
         ()=> 
         <div style={{display:'block' ,padding:'8rem'}}>
           <ZAGOLOVOK text = {'Отсутствуют сведения о банкротных делах'} /> 
           
           </div>
            



        } />   
            
    </Fragment>
      )
}
 




// ДАННЫЕ




  if (mainForm && mainForm.massBancrupt &&  mainForm.massBancrupt.length>0 )  
  {

  massBancrot = mainForm.massBancrupt.filter(el=>el.sort === 'BANCRUPT_INFO')
 

  const style =  massBancrot[0].isacting ===1 ? { width:'10px',height:'10px',background: 'orange' } : {width:'10px', height:'10px',background: 'red' } 
  massMainINFO =  [
  [`Категория банкрота`,`${massBancrot[0].category}`] , 
  [`Регион  должника `,`${massBancrot[0].region}`],
  [`СНИЛС`,`${massBancrot[0].snils}`],
  [`Адрес`,`${massBancrot[0].address}`],
  [`Активность банкротства (по полученным сообщениям) `,`${massBancrot[0].first_publish_date} - ${massBancrot[0].lastmessagedate}`],
  [`Статус должника`,
  
  <span style={{display:'flex'}}>
          <div className="quadr" style={style}></div>
          <div style={{ "display": "inline-flex"}}>{massBancrot[0].status_type}</div>

  </span> 
  ]
]
if(massBancrot[0].namehistory.length >0 ) {massMainINFO.push([`Смена фамилии`,`${massBancrot[0].namehistory}`])}
mainForm.massBancrupt.filter(el=>el.sort === 'CASE_INFO').forEach
  (el => {
    
    let mass = []
    if (el.isapplicantcreditorg) {mass.push('Конкурсный кредитор является кредитной организацией')}
    if (el.isapplicantcreditorg===false) {mass.push('Конкурсный кредитор не является кредитной организацией')}
    if (el.isliabilitysecured) {mass.push('Требование обеспечено залогом')}
    if (el.isliabilitysecured ===false) {mass.push('Требование не обеспечено залогом')}
    if (el.isliabilitysecured ===null) {mass.push('Требование обеспечения залогом - не используется в данном случае')}

    massCases.push([
       el.casenumber
       ,el.datecreate
       ,el.court
      ,el.applicanttype
     
      , <ul> {mass.map ((el,i)=>
      {
        return <li key={i}>{el}</li>   
      }
      
      )}
      </ul>
    ])  
  });
  
  massCases.unshift(['Номер дела','Дата создания дела','Суд', 'Тип заявителя','Доп. информация'])


  ///----Cообщения

  massMessage = mainForm.massBancrupt.filter(el=>el.sort === 'MESSAGE')

  massMessage.sort((a,b)=> {if(sort_.current)  return(a.rn - b.rn) ; return(b.rn - a.rn)})

  if(court) {massMessage = massMessage.filter(el=>el.isdecision === 1)}

  massMessage = massMessage.map((el) =>{
    return ([el.message_type
             ,el.publish_date
            ,el.decisiontype_name
            ,el.decision_date
            ,el.text.length> 1 ?
               <button key={el.msg_id} value= {el.msg_id}
                       onClick={  (e)=>{     
                       txt.current = e.target.value;
                       setActiveModal({active:true, id:0})
             }}
            className="btn btn-secondary">Приложения</button>
            : '' 
            ,<><span key={el.msg_id}  style={{color:'#60eed1'}} 
            onClick={()=>{alert(el.publisher_inn)}}>{el.publisher_inn}</span> <span>{el.publisher_name}</span> </>
          ])
  })


  massMessage.unshift([
    'Тип сообщений'
    , <div style={{display:'flex'}}> <div>Дата публикации</div>
                      <button
                      style={{minWidth:'15px'}}
                      className="btn btn-outline-info"
                      onClick={()=>{ sort_.current=sort;setSort(!sort)}}
                      ><>&uarr;&darr;</> 
                    
                      
                      </button></div>
    , 'Судебное решение'
    , 'Дата судебного решения'
    , 'Вложения'
    , 'Данные о публикующем'
  
  ])


let  captionStyle = { display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '5px' }


//7728569814   
// компонента отображения 
function DATA () { 
 return ( <> 
       <ZAGOLOVOK text = {'Сведения о банкротных делах'}/>  <br/>
     
      {getMainText ('Общая информация о банкроте')}
  
        <GETTABLE key={0} funcGetRows={  getRows(massMainINFO
         
          ) } style={{tclass: ['tblString'],}} /> <br/>

      {getMainText(`Информация о делах`)}
  

        <GETTABLE key={1} funcGetRows={[...getMassRows(massCases)]}  //
            style={{
                tclass: ["mtbl tblcolorhead"]
              }}
        
            endtbl = {true}
            />  <br/>

         <GETTABLE key={2} funcGetRows={[...getMassRows(massMessage)]}  //
            style={{
                tclass: ["mtbl tblcolorhead"] 
              }} 
              captionStyle  = {captionStyle}
              name ={get_name()}             
        cut={4}
            endtbl = {true}
            />

      </>
    )
  }



if (mainForm.massBancrupt && mainForm.massBancrupt.length!==0 && activeModal.id===0)
{
return (
  
    <Fragment >
        <MAIN_CARD name = {`ИП ${massIP.mass[0].fullnamerus}` } CHILDREN ={DATA} />   
        {activeModal.id===0 ?  <GET_MODAL 
         activeModal={activeModal} 
         setActiveModal={setActiveModal}  
         CHILDREN = {getMessage(txt.current)}
         text ={'ПРИЛОЖЕНИЯ К БАНКРОТНЫМ СООБЩЕНИЯМ'}
         styleHead={{
             fontSize:'25px'
           , fontWeight:'700'
           , color: '#4263cd'
           ,textShadow:'1px 1px black'
           ,fontFamily: 'fangsong'
        
        }}
        
         />   : null}       
    </Fragment>
      )
}  
  } else return null;




function getMessage (id){

  
  
  const mass=mainForm.massBancrupt.filter(el=>el.sort === 'MESSAGE' && el.msg_id.toString()===id.toString())


  if (mass.length>0){
  return(
      <>
      <div style={{padding:'50px'}}>
       <div style={{display:'flex', justifyContent: 'space-between'}}>
       <div> {`Номер дела:`}</div>
       <div style={{color: '#e54540', fontSize:'20px', fontWeight:'700'}}> {mass[0].casenumber}</div>
         </div>   
         <div style={{display:'flex', justifyContent: 'space-between'}}>
       <div> {`Тип сообщения:  `}</div>
        <div style={{ fontSize:'18px', fontWeight:'700'}}>    {mass[0].message_type}          </div>
         </div>       
     
<div>
<hr/>
      <div style={{padding:'10px'}}> 

        <p style={{fontSize:'18px', lineHeight: '1.7',textIndent:'30px'}}>
        {mass[0].text} 
  </p>      
      </div>
</div>
      </div>

  

      </>
  
  )
  } 
   
    }
function get_name() {

  const mass = mainForm.massBancrupt.filter(el=>el.sort === 'MESSAGE')
  return (
    <div>
    <div style={{ display: 'flex',alignItems:'center',alignContent: 'stretch',justifyContent:'stretch'}}>
        <div style={{ 
          fontSize:'12px',"color":"gold", "padding":0
          , "margin":"0px","textAlign":"left" , fontWeight:"500"
           }}>{getMainText(`Банкротные сообщения (дела:  ${massBancrot[0].casenumber})`)} </div>
    
           <button className={`btn btn-outline-info`}
           onClick={()=>  setCourt(!court)}
     
            style={{
              border: '1px solid violet', maxWidth: 'auto', minWidth:'70px',
              padding: '5px', opacity: '0.8', marginLeft:'15px'
              
            }}
          >{court?'Cудебные решения':'Все'}</button>
          <img alt='Excel' src = '..\img\excel_import.png' style={{height:'40px'}} 
          onClick={()=>{getBancruptMessages_ejs('',mass,'143b40','dff4f7')}}
          
          />                           
      </div> 
  
       </div> 
  )
  
  }

} 

export default BANCRUPT_IP;




