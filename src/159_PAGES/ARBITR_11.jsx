
import React, {Fragment ,useState} from "react";
import MAIN_CARD from "../JS/MAIN_CARD";
import { getRows,getMassRows } from "../JS/properties";
import GETTABLE from "../COMPONENTS/GETTABLE";
import GETBTNLIST from "../COMPONENTS/GETBTNLIST";
import { getEmpty } from "../JS/properties";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";
import { getDetailArbitr_ejs } from "../JS/properties";

//import SPINER from "../JS/SPINER";


const ARBITR = ({mainForm, AObj})=>{

  
  const [actClass,setActClass] = useState({val: '2021',r:'all' })
  const [YeasRole, setYearsRole]  = useState(null)
  const [YeasCategory, setYeasCategory]  = useState(null)
  const [postYears,setPostYear] = useState({isActionYear: 0,val:null,  part:null, category:null})
  

  let inn=''
  let massRole=[]
  let massCategory = []


if (mainForm && mainForm.inn) {inn = mainForm.inn.value; } else {return null}
if (!AObj.mass || !AObj.mass || !AObj.mass.length) {return ( 

  <Fragment>
    <MAIN_CARD mainForm={mainForm} CHILDREN ={()=>{ return (
      <>
      <ZAGOLOVOK text={'Информация о участии в арбитражных делах'}/>
        
      {getEmpty('Отсутствуют данные в базе данных по арбитражным делам')} 
   
      </>
    )}}   />                   
    </Fragment> 
  
 )}
/////////////////////////////////////////////////////////////////////////////////////////
  /// ЛОГИКА //////////////////
/////////////////////////////////////////////////////////////////////////////////////////
  const massAgg = AObj.mass.filter(el=>el.src ==='ARBITR_AGG')
  const Activity =  (AObj.mass.filter(el=>el.src ==='ARBITR_AGG_CURR')[0].is_activity===1) ? 'Присутствуют' : 'Отсутствуют'
  const Filtersmass = AObj.mass.filter(el=>el.src ==='ARBITR_AGG_F')
   const massCategory_all = massAgg.filter(el=>el.sort ==='ARBITR_CATEGORY')
   massCategory = massCategory_all
   massRole =  massAgg.filter(el=>el.sort ==='ARBITR_ROLE')
   massRole = massRole.filter(el=>(YeasRole)?el.years === YeasRole :el.years ===massRole[0].years)
   .map(el=> {
         return [el.years,el.name,el.cnt, el.p_sum_rub,el.sum_rub]
  } )
  const massYears = [...new Set (massCategory.map(el=> el.years))]

    const  sumCntAll =  massRole.reduce((acc,el)=> acc+el[2],0)
    const  sumRubAll = massRole.reduce((acc,el)=> acc+el[4],0)
   //////////////////////////////////////////////////////////////////////
   const massheads = [ 'Годы'
                       ,'Роль участия в процессах'
                       ,'Количество дел'
                       ,'Суммы'
                     ]

    massRole.forEach(el=>el.pop())
    massRole.unshift (massheads)
    massRole.push([<div style={{background:'rgb(17, 66, 88)',height:'auto',textAlign:'left',color:'orange'}}></div>, 
    <div style={{background:'rgb(17, 66, 88)',color:'orange'}}>Всего</div>,
    <div style={{background:'rgb(17, 66, 88)',height:'auto',textAlign:'center' ,color:'orange'}}> {sumCntAll} </div>
    ,<div style={{background:'rgb(17, 66, 88)',height:'100%',textAlign:'center',fontSize:'14px' ,color:'orange'
    }}>
      {new Intl.NumberFormat('ru-RU').format(sumRubAll)} </div>])
///////////////////////////////////////////////////////////////////////

massCategory = massCategory.filter(el=>(YeasCategory)?el.years === YeasCategory :el.years ===massCategory[0].years).map(el=> {
  return [el.years,el.name,el.cnt, el.p_sum_rub,el.sum_rub]
} )

const  sumCntAll_cat = massCategory.reduce((acc,el)=> acc+el[2],0)
const  sumRubAll_cat = massCategory.reduce((acc,el)=> acc+el[4],0)
massCategory.forEach(el=>el.pop())
massCategory.unshift(massheads)
massCategory.push([<div style={{background:'rgb(17, 66, 88)',height:'auto',textAlign:'left',color:'orange'}}></div>, 
<div style={{background:'rgb(17, 66, 88)',color:'orange'}}>Всего</div>
,<div style={{background:'rgb(17, 66, 88)',height:'auto',textAlign:'center' ,color:'orange'}}> {sumCntAll_cat} </div>

,<div style={{background:'rgb(17, 66, 88)',height:'100%',textAlign:'center',fontSize:'14px' ,color:'orange'
}}>
  {new Intl.NumberFormat('ru-RU').format(sumRubAll_cat)} </div>])
       

function clickYearsHandler (val){

setActClass({val,r:'role'})
setYearsRole(val)

}
function clickCategoryHandler (val){
  setActClass({val,r:'category'})
  setYeasCategory(val)

}

function clickYearPostExport(el){
if(postYears.isActionYear===0) {setPostYear({isActionYear:1,val:el})} //ничего не выбрано,выбрали год
if(postYears.isActionYear===1) {setPostYear({isActionYear:2,val:postYears.val,category:el})} // выбрали категорию
if(postYears.isActionYear===2) {setPostYear({isActionYear:3,val:postYears.val,category:postYears.category,part:el})} // выбрали тип участия 
}


function postExportExcel (){
  let massP= []
  let massC= [] 

 // console.log(Filtersmass,postYears.val,postYears.part,postYears.category)
  massC = Filtersmass.filter(el=>el.years === (postYears.val  ? postYears.val :el.years) && el.partic === (postYears.part ? postYears.part : el.partic )  ) // && (postYears..part ? postYears..part : el.partic )  (postYears.val) ? postYears.val :el.years
                   .map(el=>el.category)
  massC =  Array.from(new Set(massC))

  massP= Filtersmass.filter(el=>el.years ===(postYears.val ?postYears.val:el.years) && el.category=== (postYears.category && postYears.category!=='Все'? postYears.category:el.category))
  . map(el=>el.partic)
 
  massP = Array.from(new Set(massP ))
 if(massP.length){ massP.unshift('Все')}
 if(massC.length ){massC.unshift('Все')}


                  
              

  ///massC= massAgg.filter(el=>el.sort ==='ARBITR_CATEGORY' && el.years ===postYears.val)
  if(postYears.isActionYear===0) // выбор периодов
 {
  return(
    <div style={{
       gridColumn:'1/5'
  ,justifySelf:'center'
  ,fontSize:'12px'
    ,pading:'5px',margin:'5px 5px'}}>
    
    <div style={{width:'auto',paddingBottom:'10px' ,fontSize:'20px'}}>Выберете доступный период</div>
    <ul style= {{pading:'0',margin:'0',listStyle: 'none' ,textAlign:'left'}} >
      { massYears.map((el,i)=>{
        return (
    <li key={i} onClick={()=>clickYearPostExport(el)} 
    style={{display: 'inline-block',}}>
      <div key={i}
    style = {{ 
    fontSize:'18px'
    ,color:'white'
    ,width:'min-content'
    ,padding:'8px'
    ,margin:'5px'
    ,border:'2px solid #6c16eb'
    ,borderRadius:'10px'
    }}>
      {el}</div> 
      </li>
        )
   })
   }
    </ul>
    </div>
  )
}

if(postYears.isActionYear===1) {
  return(
    <>
    <div style={{
      gridColumn:'1/2',pading:'5px',margin:'5px 5px'}}>
    <div style={{width:'auto',paddingBottom:'10px'}}>Выберете доступную категорию дел</div>
    <ul style= {{pading:'0',margin:'0',listStyle: 'none' ,textAlign:'left'}} >
    { massC.map((el,i)=>{
      return (
  <li key={i} onClick={()=>clickYearPostExport(el)} // категорию отдали
  style={{display: 'inline-flex',}}>
    <div key={i}
  style = {{ fontSize:'10px',color:'white', padding:'5px',margin:'5px',borderBottom:'1px solid grey'}}>
    {el}</div> 
    </li>
      )
 })
 }
  </ul>
    </div>
<div style={{
     gridColumn:'2'
    ,pading:'5px',margin:'5px 5px', borderLeft:'1px dotted orange'}}>
   <div style={{color:'white', width:'auto',paddingBottom:'10px', paddingLeft:'20px'}}>{`Выбран период: - ${postYears.val} год `}</div>
  
  </div>
{/* <div style={{gridColumn:'2',gridRow:2}}> <button style={{minWidth: '70px', color:'white',}} className="btn btn-primary p-1 "
  onClick={()=>getDetailArbitr_ejs(inn,postYears.val,postYears..part)}
  > СКАЧАТЬ </button>
  </div>  */}
  <div  style={{gridColumn:'3',gridRow:2}}>
      <button style={{color:'white',minWidth: '70px'}} className="btn btn-secondary p-1 "
  onClick={()=>setPostYear({val:null, isActionYear: 0, val2:null})}
  > СБРОСИТЬ </button>
  </div>
  </>
  )
}
  if(postYears.isActionYear===2) {
    return(
      <>
      <div style={{
        gridColumn:'1/2',pading:'5px',margin:'5px 5px'}}>
      <div style={{width:'auto',paddingBottom:'10px'}}>Выберете доступную роль участия в процессах</div>
      <ul style= {{pading:'0',margin:'0',listStyle: 'none' ,textAlign:'left'}} >
      { massP.map((el,i)=>{
        return (
    <li key={i} onClick={()=>clickYearPostExport(el)} //отдали тип участия
    style={{display: 'inline-flex',}}>
      <div key={i}
    style = {{ fontSize:'10px',color:'white', padding:'5px',margin:'5px',borderBottom:'1px solid grey'}}>
      {el}</div> 
      </li>
        )
   })
   }
    </ul>
      </div>
<div style={{
       gridColumn:'2'
      ,pading:'5px',margin:'5px 5px', borderLeft:'1px dotted orange'}}>
     <div style={{color:'white', width:'auto',paddingBottom:'10px', paddingLeft:'20px'}}>{`Выбран период - ${postYears.val} год `}</div>
     <div style={{color:'white', width:'auto',paddingBottom:'10px', paddingLeft:'20px'}}>{`Выбрана категория: - ${postYears.category}  `}</div>
    </div>
  {/* <div style={{gridColumn:'2',gridRow:2}}> <button style={{minWidth: '70px', color:'white',}} className="btn btn-primary p-1 "
    onClick={()=>getDetailArbitr_ejs(inn,postYears.val,postYears..part)}
    > СКАЧАТЬ </button>
    </div>  */}
    <div  style={{gridColumn:'3',gridRow:2}}>
        <button style={{color:'white',minWidth: '70px'}} className="btn btn-secondary p-1 "
    onClick={()=>setPostYear({val:null, isActionYear: 0, category:null,part:null})}
    > СБРОСИТЬ </button>
    </div>
    </>
    )
  }


  if(postYears.isActionYear===3) {
    return(
      <>
      <div style={{
        gridColumn:'1/3',pading:'5px',margin:'5px 5px',justifySelf:'center'}}>
          
      <div style={{color:'#6cec6c',textShadow:'0px 0px black',fontSize:'16px',width:'auto',paddingBottom:'10px',}}>Параметры выбраны успешно!</div>
               <div style={{color:'white', width:'auto',paddingBottom:'10px', paddingLeft:'20px'}}>{`Выбран период: - ${postYears.val} год `}</div>
     <div style={{color:'white', width:'auto',paddingBottom:'10px', paddingLeft:'20px'}}>{`Тип участия: - ${postYears.part}  `}</div>
     <div style={{color:'white', width:'auto',paddingBottom:'10px', paddingLeft:'20px'}}>{`Категория административных дел: - ${postYears.category}  `}</div>

   
      <div style={{color:'green',fontSize:'14px',width:'auto',paddingBottom:'10px',}}> Для скачивания нажмите на кнопку...</div>
      </div>
     
      <button style={{gridColumn:'3',gridRow:1, color:'white' ,minWidth: '70px'}} className="btn btn-secondary p-2 "
    onClick={()=>setPostYear({val:null, isActionYear: 0, category:null,part:null})}
    > СБРОСИТЬ </button>
        <button style={{gridColumn:'4',gridRow:1, color:'white',minWidth: '70px'}} className="btn btn-primary p-2 "
    onClick={()=>getDetailArbitr_ejs(inn,postYears)}
    > СКАЧАТЬ </button>
      </>
    )
  }

}


  const cnt_total =massCategory_all[0].cnt_total
  const sum_total =new Intl.NumberFormat('ru-RU').format(massCategory_all[0].sum_total)

  function GETARBITR () {
       return (
        <Fragment key={1}> 
           <ZAGOLOVOK text={'Сводная информация об участии в арбитражных делах'}/>
         <GETTABLE funcGetRows={  getRows(
           [[`Общее количество известных арбитражных дел (за период не более 5 лет)  `,`${cnt_total}`] ,
           [`Общая сумма исковых 
           требований по известным арбитражных делам (за период  не более 5 лет)  `,`${sum_total}`],
           [`Наличие активностей в  арбитражных делах в текущем году `,`${Activity}`]
          ]
           ) } style={{tclass: ['tblString'],}} /> <br/>
       

       
        <ZAGOLOVOK text={'Выгрузка арбитражных дел'}/> <br/>
                       <>
                       <div 
                       style={{background:'transparent',color:'orange',fontSize:'12px'
                      ,display: 'grid'
                      ,gridTemplateColumns:'50% auto min-content  min-content'
                      ,minWidth: '100%'
                      ,maxHeight:'auto'
                      ,justifyItems:"left"
                      ,alignItems:'stretch'
                      ,padding:'10px'
                      ,overflowY:'visible'
                      ,borderTop: '1px dotted rgb(42, 140, 170)'
                      ,borderBottom: '1px dotted rgb(42, 140, 170)'
                      
                    
                  }}
                       className="downloadGrid">
                         {postExportExcel()}
                         
                       </div>
                       </>
     <br/>
                       

<ZAGOLOVOK text={'Статистика'}/>

<GETTABLE  funcGetRows={getMassRows(...[massRole])}  //Регистрационные данные
            style={{
                tclass: ["mtbl tblcolorhead fixed-table"],
                captionStyle: {  "alignText": "left","fontSize":"12px" }
              }}
            name={
              <div className = 'gridArb' style ={{
                display:'grid',
                columnGap:'5px',
                 alignItems:'end',
                padding:'5px',
                gridTemplateColumns: 'max-content  min-content min-content min-content min-content  min-content min-content min-content'
                }}>
            <div style={{
              padding:'5px'
              ,color:'orange'
              ,gridColumn:'1',
              }}>Статистика  роли участия в административных делах
            </div>
               <GETBTNLIST 
               who = {'role'} 
                actClass={actClass} 
                mass={massYears} 
                func ={clickYearsHandler} />
            </div> 
            } endtbl={false}
            tStyle={{minHeight:'150px',width:'200px',textAlign:'center'}}
            colmass = {[<col width='25px'/>, <col width='150px' align="left"/>, <col width='30px' />,<col width='30%' /> ]}
            /> <br />

<GETTABLE funcGetRows={getMassRows(...[massCategory])}  //Регистрационные данные
            style={{
                tclass: ["mtbl tblcolorhead fixed-table"],
                captionStyle: {  "alignText": "left","fontSize":"12px" }
              }}
            name={
              <div className = 'gridArb' style ={{
                display:'grid',
                columnGap:'5px',
                 alignItems:'end',
                padding:'5px',
                gridTemplateColumns:  'max-content  min-content min-content min-content min-content min-content  min-content'
                }}>
            <div style={{
              color:'orange'
            , wordWrap:'normal'
            ,padding:'5px'
              ,gridColumn:'1',
              }}>Статистика категорий административных дел 
            </div>
          <GETBTNLIST  
          who = {'category'}  
          actClass={actClass} 
          mass={massYears} 
          func ={clickCategoryHandler} />
            </div>
            } endtbl={false}
            tStyle={{minHeight:'120px',textAlign:'center'}}
            colmass = {[<col width='25px'/>, <col width='150px' align="left"/>, <col width='30px' />,<col width='30%' /> ]}
            /> <br/>

         </Fragment>
       )
}

return(
<Fragment >
    <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={GETARBITR} />                   
</Fragment>
  )
}
export default ARBITR;




