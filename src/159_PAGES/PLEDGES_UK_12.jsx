
import React, { useState,Fragment, useRef } from "react";
import { f_getpledges_detail,f_getpledges_participants } from "../JS/SQL";
import GETTABLE from "../COMPONENTS/GETTABLE";
import MAIN_CARD from "../JS/MAIN_CARD";
import {  getMassRows,getRows,getMainText} from "../JS/properties";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";
import { getEmpty } from "../JS/properties";
import GET_TABLE_SRC from "../JS/GET_TABLE_SCR"
import {  NavLink } from "react-bootstrap";
import GET_MODAL from  "../JS/GET_MODAL.jsx"
import { getQuadr } from "../JS/properties";
import SPINER from "../JS/SPINER";

 

const PLEDGES_UK = ({mainForm,pledges})=>{
  
  const [massDetail,setMassDetail] = useState([])
  const [activeModal,setActiveModal] = useState({active: true, id:0})
  const [massPart ,setMassPart] = useState({mass: [],years:null}) 
  const [isOpen,setisOpen] = useState(false)
  const type = useRef('ВСЕ')
  const massAll = useRef([])
  const [dataLoad, setDataLoad] = useState(false)

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
let participant 
let str 


if(  massPart.mass && massPart.mass.filter(el=> el.src.includes('TYPE').length>1 )) {
massBtn =  massAll.current.filter(el=> el.src.includes('TYPE') ).map(el=>el.type_) 
if(massBtn.length===1) {str= massBtn.join(''); massBtn =[];}
if (massBtn.length>0) {massBtn.unshift('ВСЕ')}

}
//let massFL = []
if (pledges.mass.length>0 && pledges.mass.filter(el=>el.src.includes('COUNT') && el.sort.includes('Всего'))[0].cnt!==0 ){
 
 //console.log(massBtn)
participant = pledges.mass.filter(el=> el.src.includes('MAIN')).map(el=>el.p)[0]
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
  return  [<span style={{fontSize:'10px'}}>{i+1}</span>, 
    <div style={{verticalAlign:'top'}}>
      <div style={{ "display": "flex"}}>
      {el.inn? <div style={{"display": "flex",paddingBottom:'2px',marginRight:'10px'}}><span> №/ИНН: </span> <span>{el.inn}</span> </div>:null}
      {el.ogrn? <div style={{"display": "flex",paddingBottom:'2px'}}><span> {el.type_.includes('ИП') ? `ОГРНИП:` : `ОГРН`} </span> <span>{el.ogrn}</span> </div>:null} 
      </div>
    <div style={{ "display": "flex", color: el.type_.includes('ИП')? '#66f3f3': '#f0950d', fontWeight: '700', fontSize:'14px' }}>
    {el.type_.includes('ИП') ? 'ИП '+ el.fullname: el.fullname}
    </div>
    {el.address? <span>{el.address}</span> :null}
    </div>
    ,el.role_ + `  (${ el.type_ })`
    ,<NavLink onClick={async ()=>{await getpledges_detail(el.participant_id);setActiveModal({active:true}) }} >Залоговые сообщения</NavLink>

  ]})


}

async function getpledges_detail(participant_id) {
    console.log(massPart.years)
 await f_getpledges_detail(participant,participant_id,massPart.years ).then(mass => {
 setMassDetail(mass)
 }) 
}


//===================================================================================================


// компонента отображения 
function DATA () { 
 ///console.log(massAll.current)
  
 //  Кнопки годов
 const massY = massYears.map(el=>{
  return  (
 <button onClick={async (e)=>{
  setDataLoad(true) 
  await f_getpledges_participants(participant,el.years)
  .then((mass) => 
  {massAll.current = mass;
  type.current = 'ВСЕ'; 
  
  setMassPart({mass,years:el.years})} )
  setDataLoad(false)
  
}}
 style={{background: el.years === massPart.years ? '#0dcaf0': 'transparent', padding:'5px',fontSize:'10px',minWidth:'40px',marginLeft:'10px',marginBottom:'10px'}}
  className="btn btn-outline-info"> {el.years}</button>
)})
 
 return (
   <> 
   <ZAGOLOVOK text = {'Сведения о залоговых обязательствах'}/>


   {!isOpen || mainForm.massPledgesUK.length>0 ? <GETTABLE funcGetRows={[...getMassRows(mass)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: {"paddingBottom":"15px", "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Сведения об обременении доли в уставном капитале в форме договора залога по данным ЕГРЮЛ"}
            endtbl = {false} /> : <>{getEmpty(`Отсутствуют сведения о залогах под уставной капитал`)}<br/></>}

            

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
  {getMainText (`Просмотр участников известных залоговых сделок`)}
<div  style={{
 display:'grid'
,alignItems:'center'
,gridTemplateColumns: '220px auto auto 10px' 
,width:'100%' 
,background:'#33335d',padding:'10px',borderRadius:'5px'}}>
  <div style={{gridColumn:'1',color:'aqua', fontSize:'11px',paddingBottom:'10px'}}>Выберите доступный период:</div>
  <div onClick={()=>{setisOpen(!isOpen)}}
  style={{gridColumn:'5'
  ,alignSelf:'center'
  ,verticalAlign:'center'
  ,justifySelf:'center'
  ,color:'white',transform: isOpen? 'rotate(90deg)' : 'rotate(0deg)' , fontSize:'16px',paddingBottom:'10px',cursor:'pointer'}}>| |</div>
  <div style={{gridColumn:'1',display:'inline-block', borderRight:'1px dotted aqua' }}> 
  
  {/* Кнопки годов */}
 {massY }</div>   
{ massAllParts.length>0 ? 
<>
  <div style={{display:'inline-block',gridColumn:'2',gridRow:'1',color:'aqua', fontSize:'11px',marginLeft:'10px',paddingBottom:'10px'}}>Выберите тип участника:</div>
 <div style={{gridColumn:'2',gridRow:'2/4',paddingLeft:'10px',height:'100%',fontSize:'10px', color:'#66e283',alignSelf:'flex-start'}}>
 
<div style={{gridColumn:'3',gridRow:2}}> 
{  //  Кнопки типов участников 
massBtn.length>0 ? massBtn.map(el=>{

  if(el.includes('Иностр')) {el= 'Иностр'}
   return  (
 <button  
 onClick={()=>{
   
  type.current=el;
   if(!el.includes('ВСЕ')) {setMassPart({mass: massAll.current.filter(elem=>elem.type_.includes(el) ), years:massPart.years})}
   if(el.includes('ВСЕ')) {setMassPart({mass: massAll.current, years:massPart.years})}
   
  }
  
 }
 style={{background: el.includes(type.current)  ? '#0dcaf0': 'transparent', padding:'5px',fontSize:'10px',minWidth:'40px',marginLeft:'10px',marginBottom:'10px'}}
  className="btn btn-outline-info"> {el}</button>
)}) :  <div>{`В данных за ${massPart.years} год присутствут только ${str}`}</div>
}
</div>
  </div></>:null}
</div></> :null} <br/>
       </>  : null}

      {/* Таблица участников */}
      
         {massAllParts.length>0? <>  
<div style={{paddingBottom:'5px'}}>
{getMainText (`Участники совместных залоговых сделок   ****${massPart.years} год, найдено ${massAllParts.length} ****`)} 
</div>
    {dataLoad ? <SPINER val={'100'}/> :  <GET_TABLE_SRC key={2} 
    styleCell={{color:'white',background:'#33335d',fontSize:'11px',border:'1px solid grey' }}
    thread={{background:'#0f5396',borderBottom:'2px solid black',fontSize:'10px'}}
                                    massObjCol={
                                        [
                                            { name: '#', style: { width: '5%' } },
                                            { name: 'Общие данные по организации', style: { width: '60%' } },
                                            { name: 'Роли организации в залоге', style: { width: '20%' } },
                                            { name: 'Ссылки на сообщения', style: { width: '20%' } },
                                 

                                        ]} massValues={massAllParts} heightT={{ maxHeight:!isOpen ?'150px':'400px' }} /> 
                                      } </> : null}  </>
    )}

function CHILDREN(){

  const [opDop,setopData] = useState({message_id:null,isOpen:false})

   //++++++++++++++++++++++++++++
 
  const mass = massDetail.filter(el=> el.src.includes(`OSN_NABOR`)).filter(el=> el.rn===1).map((el,i) => { 
  //++++++++++++++++++++++++++++


  const massDop = massDetail.filter(dop =>dop.src.includes(`DOP`))
  const text = massDop.filter(dop=> dop.message_id === el.message_id).map(dop=>dop.text_).join('')
  const datePerfome = massDop.filter(dop=> dop.message_id === el.message_id).map(dop=>dop.dateofperfomance).join('')
  const MassSubj = massDetail.filter(sub =>sub.src.includes(`SUBJ`)) 

  console.log(MassSubj.filter(elem=> elem.message_id === el.message_id).map(elem=> <div style={{color:'red'}}>{elem.ClassifierName}</div>))
  const MassPart =  massDetail.filter(p =>p.src.includes(`PART`) ) 
  
  return [   
    <>
    <div style={{display:'flex',alignItems:'center'}}>
      <div style = {{border: '1px solid red',borderRadius:'20px',padding:'6px'}}>{i+1}</div>
    {getQuadr(null,{background:'green',height:'10px',width:'10px',borderRadius:'10px',marginLeft:'5px'})}
    <div style={{marginLeft:'5px',fontWeight:'700'}}> {el.datepublish} </div> 
    
     {datePerfome ? <div style={{color:'brown',marginLeft:'20px',marginRight:'5px'}}> {`* Дата исполнения договора: ${datePerfome} *`} </div> : null } 
     </div>
   
    </>
    ,<><div style={{paddingBottom:'5px'}}>{text}</div>
    <div style={{display:'grid',gridTemplateColumns: '130px auto auto auto 200px', padding:'5px',columnGap:'5px'}}>
 <div style={{color:'blue',gridRow:'1/2',gridColumn:'1/3'}}>УЧАСТНИКИ СДЕЛКИ:</div>
  {MassPart ? MassPart.filter(p=> p.message_id === el.main_message_id)
  .map(p=> { 
    let  name = <></> 

if (p.type_.includes("ИП") || p.type_.includes("ЮЛ") || p.type_.includes("ФЛ")) {
  name = <>
  {p.inn ?<div style={{gridColumn:2}}> <span>ИНН: </span> <span style={{color:'blue'}}>{p.inn} </span>  </div> : null}
  <span style ={{gridColumn:'3/4',fontSize:'13px',fontWeight:'700',color:'#006f90'}}>{p.type_.includes("ИП") ? `ИП ${p.fullname}` : p.fullname} </span>
  </> }

if (p.type_.includes("Иностр") ) {
  name = <>
  {p.inn ?<div style={{gridColumn:2}}> <span>№: </span> <span style={{color:'blue'}}>{p.inn} </span> </div> : null}
  <span style ={{gridColumn:'3/4',fontSize:'13px',color:'#006f90'}}>{`${p.type_} (${p.country})`} </span>
  </> }

 return (
 <>
   <div style={{marginRight:'5px',gridColumn: 1}}> {p.role_}</div> 
             {name}
   
   </>
  )
  }
  ) : null}
  <div style={{gridColumn: '5',paddingLeft:'5px',gridRow:'1/4',borderLeft:'1px dotted red'}}>
   <div style={{color:'blue',}}>ПРЕДМЕТ СДЕЛКИ:</div>
  <div > 
      {MassSubj
        .filter(elem=> elem.message_id === el.message_id)
        .map(elem=> 
         <div style={{color:'#726666'}}>{elem.classifiername ? elem.classifiername.toUpperCase(): 'НЕ УКАЗАНО'}</div>) }
        </div>
        </div>

 
     </div>
     {el.linked_message_id ? <div style={{paddingBottom:'5px',paddingTop:'5px',color:'blue', gridColumn:'1/3'}}>
        
          <button style={{padding:'3px'}} className={'btn btn-secondary'} onClick={()=>{setopData({message_id:el.message_id,isOpen:!opDop.isOpen})}}
          >СВЯЗАННЫЕ СООБЩЕНИЯ:
          </button>
          </div>  :null}
                
{ opDop.isOpen && opDop.message_id===el.message_id  ?
massDetail
.filter(elem=> elem.src.includes(`OSN_NABOR`) && elem.rn !==1 && elem.main_message_id=== el.main_message_id)
.map( el=>
<>
<span style={{gridColumn:'1/3'}}>{`${el.datepublish} ${el.type_}`}</span>
{massDop.filter(dop=> dop.message_id === el.message_id)
        .map(dop=> <div style={{gridColumn:'3/6'}}>{dop.text_}</div>)
}

</>) :null}  
    </> 
      ]})
return (
 <>
<div style={{padding:'20px'}}>
<div style={{ fontWeight:'700',paddingBottom:'20px',fontSize:'20px'}}>{`ЗАЛОГОВЫЕ ДОГОВОРА (найдено - ${mass.length} за ${massPart.years}г )`}</div>
  
    <div style={{minHeight:'auto',maxHeight:'400px',width:'700px',overflow:'auto',fontSize:'12px',padding:'5px'

  
  }}>

{mass.map (el=>{return <><div>{el}</div> <hr/><br/></>})}

</div>
</div>
</>)
}
return(
    <Fragment >
   { (massDetail && massDetail.length>0) ? <GET_MODAL
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            
            text={`СВЕДЕНИЯ О СВЯЗАННЫХ  СДЕЛКАХ`}
            styleHead={{
                fontSize: '30px'
                , padding: '20px'
                , fontFamily: 'ui-monospace'
                , fontWeight: '700'
                , color: '#006f90'
            }}
            CHILDREN={<CHILDREN key={1} />}
            styleBody={{
                minWidth: '600px'
                , maxWidth: '1000px', height: 'auto'
                , background: 'white'       
            }}
        /> : null}
        <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={  DATA } />                   
    </Fragment>
      )

}

export default PLEDGES_UK;




