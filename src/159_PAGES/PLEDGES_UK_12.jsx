
import React, { useState,Fragment, useRef } from "react";
import { f_getpledges_participants } from "../JS/SQL";
import GETTABLE from "../COMPONENTS/GETTABLE";
import MAIN_CARD from "../JS/MAIN_CARD";
import { getMassRows ,getRows,getMainText} from "../JS/properties";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";
import { getEmpty } from "../JS/properties";
import GET_TABLE_SRC from "../JS/GET_TABLE_SCR"
import {  NavLink } from "react-bootstrap";








const PLEDGES_UK = ({mainForm,pledges})=>{

  
  const [massPart ,setMassPart] = useState({mass: [],years:null}) 
  const [isOpen,setisOpen] = useState(false)
  const type = useRef('ВСЕ')
  const massAll = useRef([])

// ДАННЫЕ
  let mass= []
  if (mainForm && mainForm.massPledgesUK &&  mainForm.massPledgesUK.length>0 )  
  mass.push([`Дата заключения договора`,`Дата регистрации`,`№ договора`, `Данные залогодержателя`,'Нотариус',`Сведения ГРН`])
  // console.log(mass)
  mainForm.massPledgesUK.forEach(el => {

  mass.push([el.doc_date,el.date_reg,el.contract_number,
    `ИНН: ${el.p_inn ? el.p_inn:''} \n ${el.pl_name}`,
    el.notarius,
    `${el.grn} от ${el.grn_date}` ])
})

let massPleges = []
let massYears = []
let min_
let max_
let massAllParts = []
let massBtn = []


if(  massPart.mass && massPart.mass.filter(el=> el.src.includes('TYPE').length>1 )) {
massBtn =  massAll.current.filter(el=> el.src.includes('TYPE') ).map(el=>el.type_) 
}
//let massFL = []
if (pledges.mass && pledges.mass.length>0 ) {
 
 console.log(massBtn)

massPleges =  [
  [`Роль участия в залогах`,`${pledges.mass.filter(el=>el.src.includes('ROLE')).map(el=> {return el.role_}).join(' , ')}`] , 
  [`Всего известных залоговых сделок за период `,`${pledges.mass.filter(el=>el.src.includes('COUNT') && el.sort.includes('Всего')).map(el=>el.cnt).join(',')}`] ,
  ]

   min_ = pledges.mass.filter(el=>el.src.includes('PERIOD')).map(el=>el.min_).join('')
   max_ = pledges.mass.filter(el=>el.src.includes('PERIOD')).map(el=>el.max_).join('')

   massYears =  pledges.mass.filter(el=>el.src.includes('YEARS'))
//===================================================================================================

massAllParts = massPart.mass ? massPart.mass.filter(el =>el.src.includes('PART')):[]

massAllParts = massAllParts.map((el,i)=> {
  return  [i+1, 
    <div style={{verticalAlign:'top'}}>
       {el.inn? <div style={{"display": "flex",paddingBottom:'2px'}}><span> №/ИНН: </span> <span>{el.inn}</span> </div>:null}
      {el.ogrn? <div style={{"display": "flex",paddingBottom:'2px'}}><span> {el.type_.includes('ИП') ? `ОГРНИП:` : `ОГРН`} </span> <span>{el.ogrn}</span> </div>:null} 
    <div style={{ "display": "flex", color: el.type_.includes('ИП')? '#01f321': 'orange', fontWeight: '700', fontSize:'14px' }}>
    {el.type_.includes('ИП') ? 'ИП '+ el.fullname: el.fullname}
    </div>
    {el.address? <span>{el.address}</span> :null}
    </div>
    ,el.role_ + `  (${ el.type_ })`
    ,<NavLink onClick={()=>alert(el.participant_id)} >Залоговые сообщения</NavLink>
  ]})



//===================================================================================================




       }


// компонента отображения 
function DATA () { 
 console.log(massAll.current)

 return (
   <> 
       <ZAGOLOVOK text = {'Сведения о залоговых обязательствах'}/>

  
    {massPleges.length>0 && pledges.mass.filter(el=>el.src.includes('END').length>0) ?
    <>
     {!isOpen ? 
    <>     <br/>

       {getMainText (`Общая информация по залогам за период ${min_?min_:''} -  ${max_?max_:''}`)}
  
  <GETTABLE key={0} funcGetRows={  getRows(massPleges
   
    ) } style={{tclass: ['tblString'],}} /> <br/> 
    </>

    :null}


{massYears && massYears.length>0 ? <>
  {getMainText (`Настройки для просмотра  участников известных залоговых сделок`)}

<div  style={{
 display:'grid'
,alignItems:'center'
,gridTemplateColumns: '250px 100px auto 10px' 
,width:'100%' 
,background:'#38384b',padding:'10px',borderRadius:'5px'}}>
  <div style={{gridColumn:'1',color:'aqua', fontSize:'11px',paddingBottom:'10px'}}>Выберите доступный период:</div>
  <div onClick={()=>{setisOpen(!isOpen)}}
  
  style={{gridColumn:'5'
  ,alignSelf:'center'
  ,verticalAlign:'center'
  ,justifySelf:'center'
  ,color:'white',transform: isOpen? 'rotate(90deg)' : 'rotate(0deg)' , fontSize:'16px',paddingBottom:'10px',cursor:'pointer'}}>| |</div>
  <div style={{gridColumn:'1',display:'inline-block', borderRight:'1px dotted aqua' }}> 

 {
  //  Кнопки годов
 massYears.map(el=>{
  return  (
 <button onClick={async (e)=>{
   await f_getpledges_participants(mainForm.dataport_id.value,massPart.years)
  .then((mass) => {massAll.current = mass;type.current = 'ВСЕ'; 
  setMassPart({mass,years:el.years})} )}}
 style={{background: el.years === massPart.years ? '#0dcaf0': 'transparent', padding:'5px',fontSize:'10px',minWidth:'50px',marginLeft:'10px',marginBottom:'10px'}}
  className="btn btn-outline-info"> {el.years}</button>
)}) }</div> 
 <div style={{gridColumn:'2',gridRow:'2',paddingLeft:'10px',fontSize:'10px', color:'#66e283',alignSelf:'flex-start'}}> {massPart.years?`Выбран: ${massPart.years} год`:`Ничего не выбрано` } </div>
 <div style={{gridColumn:'3',gridRow:'2/4',paddingLeft:'10px',height:'100%',fontSize:'10px', color:'#66e283',alignSelf:'flex-start',borderLeft:'1px dotted aqua'}}>
 <div style={{display:'inline-block',gridColumn:'3',gridRow:'1',color:'aqua', fontSize:'11px',paddingBottom:'10px'}}>Выберите тип участника:</div>
<div style={{gridRow:2,gridColumn:'3'}}> 
{  //  Кнопки типов участников 
massBtn.length>0 ?
massBtn.map(el=>{
  if(el.includes('Иностр')) {el= 'Иностр'}
  return  (
 <button  onClick={()=>{
  type.current=el;
   setMassPart({mass: massAll.current.filter(elem=>elem.type_.includes(el)), years:massPart.years})}
 }
 style={{background: el.includes(type.current)  ? '#0dcaf0': 'transparent', padding:'5px',fontSize:'10px',minWidth:'50px',marginLeft:'10px',marginBottom:'10px'}}
  className="btn btn-outline-info"> {el}</button>
)}) : ''

}
</div>
  </div>
</div></> :null} <br/>
       </>  : null}

    <>
    {getMainText (`УЧАСТНИКИ СОВМЕСТНЫХ ЗАЛОГОВЫХ СДЕЛОК  ЗА ${massPart.years} год (Количество - ${massAllParts.length} )`)}  
     <GET_TABLE_SRC key={2} 
    styleCell={{color:'white',background:'#38456f',fontSize:'11px',border:'1px solid grey' }}
    thread={{background:'#2c5f76',borderBottom:'2px solid black'}}
                                    massObjCol={
                                        [
                                            { name: '#', style: { width: '7%' } },
                                            { name: 'Общие данные по организации', style: { width: '50%' } },
                                            { name: 'Роли организации в залоге', style: { width: '25%' } },
                                            { name: 'Ссылки на сообщения', style: { width: '20%' } },
                                 

                                        ]} massValues={massAllParts} heightT={{ maxHeight:!isOpen ?'100px':'400px' }} />
                                    </>  
                                       
 
     {mainForm.massPledgesUK.length>0 ? <GETTABLE funcGetRows={[...getMassRows(mass)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: {"paddingBottom":"15px", "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Сведения об обременении доли в уставном капитале в форме договора залога по данным ЕГРЮЛ"}
            endtbl = {false} /> : getEmpty(`Отсутствуют сведения о залогах под уставной капитал`)}
      </>
    )
  }
return(
    <Fragment >
        <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} />                   
    </Fragment>
      )

}

export default PLEDGES_UK;




