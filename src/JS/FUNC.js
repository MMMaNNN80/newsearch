import React,{useState,Fragment}from "react"
import { getDetailzakupki_ejs } from "./properties"
import GETTABLE from "../COMPONENTS/GETTABLE"
import { getMassRows } from "./properties"



 const GETGOSZAKUPKIGOV= ({FZ,inn,mass,excHback,excHtxt}) =>{
    const [loading,setLoading]=useState(false)
    
    if (!mass && mass.length<1) {return null}
    let mainMass =[] 



    FZ===44? mainMass = mass.mass44FZAGG :
             mainMass =  mass.mass223FZAGG
mainMass= mainMass.filter(el=>el.sort === 'ЗАКАЗЧИК')
const mass_P = mainMass.filter(el=>el.sort === 'ПОСТАВЩИК')

if (!mainMass || mainMass.length<1) {return null}

let perTenders = '0'
let cnt =''
let max_cnt = ''
let currency_name=''

             let massYears = []
             mainMass.forEach(el=>{if(!massYears.includes(el.years)) {massYears.push(el.years)}}) 

             let currencymass =[]
             mainMass.forEach(el=>{if(!currencymass.includes(el.currency_name)) 
              {currencymass.push(el.currency_name)}}) 
             
              const head =[ 'Информация о закупках' ]
              mass=[]
              mass.push(head)
          
             let massx=[]
        
             massYears.forEach(year=>{
              mass.push
              ([
                <>
               <div style={{display:'grid', 
               gridTemplateColumns: 'auto auto minmax(auto,80px) auto 1fr auto 20px'
               ,columnGap:'5px',rowGap:'2px',padding:'5px' }}> 
                     {/* ГОДЫ */}
                   <div style={{
                          
                            gridColumn:1, gridRow:1
                           , color: 'lightblue'
                           , fontSize: '12px'
                           ,border: '1px solid',
                           height:'min-content',
                           borderRadius:'2px',
                           marginRight:'8px',
                           padding:'5px'
                           ,alignSelf:'center'
                       }}>{year}</div>

                       {/* Количество тендеров */}

{mainMass.forEach(el => {
if (el.years === year) {
   cnt =el.cnt_year // количество тендеров в год
   max_cnt =  el.max_cnt_year //максимальное количество за все годы
   perTenders = cnt / max_cnt * 100  // процент 
}})}
     <div style={{
       gridColumn:2,gridRow:1
      ,height: '20px'
      ,width:'45px'
      ,padding:'1px'
      ,textAlign:'center'
      ,alignSelf:'center'
        ,fontSize:'12px'
        ,color:'violet',
        border:'1px solid',
        borderRadius:'10px',
        float: 'left'
        }}>  { `${Math.round(perTenders)}%`}  </div>
            
            <div style={{ fontSize:'12px'
    ,gridColumn:3,
     gridRow:1 ,
     zIndex:2,alignSelf:'center'  }}>

{` ${cnt}`}</div>
   
   <div className={{}} style={{
        gridColumn:'3',gridRow:1, alignSelf:'center' 
        ,position:'relative'
        }}> 
        
        
        
   <div className={`graf_${FZ}`} style={{  ...{ width: `${perTenders}%`
   ,height:'20px'  ,alignSelf:'center',position:'relative'} }}>


     
   </div>
    </div> 
 
     {/* Суммы по разным валютам */}
  
    {
    
    
    mainMass.forEach((el,i) => {
    
if (el.years === year) {
 currency_name = el.currency_name

 massx.push (
   <>

   {/* Типы валют */}
   <div className ='lead' key={i} 
 style={{color:'white', fontSize:'10px' ,gridColumn:1

}}>{`${currency_name}`}</div>

{/* Количество по валюте */}

<div style={{
    gridColumn:2
  , paddingLeft:'5px'
  
  }}>{`${el.cnt}`}</div>

<div style={{ 
        alignSelf:'start'
        ,textAlign:'center'
        ,height: 'auto'
        ,width:'auto'
        ,padding:'2px'
        ,fontSize:'12px'
        ,color:'orange'
        ,border:'1px solid',
         borderRadius:'10px',
       gridcolumn :2
       
         
         }}> { `${Math.round(el.cnt/el.cnt_year * 100)}%`} 
          </div>

                 {/* Количество в %         
       <div className={{}} style={{ width: '90%'}}> 
    <div className={`graf_${FZ}_sum`} style={{ ...{
                     height:'10px'
                     ,width: `${el.cnt/el.cnt_year* 100}%`
                     ,gridcolumn:3
                     }}}>    
                </div>
                </div> */}
               



    <div style={{  gridColumn:4
      ,alignSelf:'start'
      ,textAlign:'left'
        , fontSize:'10px'
         ,zIndex:1
        ,fontWeight:'500'
      
        ,color:'violet' }}>{` ${el.p_price} у.е. `}</div>   

</>
)
}
})  }




<div className={'smallGrid' } style={{
   gridcolumn:4
  ,gridRow:1
  ,display:'grid'
  ,gridTemplateColumns: 'auto 40px auto 5fr  auto auto'
  ,columnGap:'5px'
  ,alignSelf:'center'
  ,opacity:'0.9'
  
  }}>
{[...massx]}
</div>

 {/* Кнопка */}
 <div className={'btn_block'} 
 style={{gridColumn:'6',gridRow:'1/2',padding:'2px'
}} 
 onClick={() => ExcelDownloadHandler(year)}>
 { !loading?  
<>          
        <img
           src='..\img\excel_import.png' style={{ 
               height: '35px',
               margin: '1px' }} 
           alt="Скачать"></img> 
           <div style = {{ fontSize:'10px',alignSelf:'end',color:'white'
           }} >Скачать </div> 
</>
           
           :  
           
         <div style = {{ fontSize:'10px',alignSelf:'end'
        ,color:'white'}} >
          ЗАГРУЗКА</div> 
       
}
</div>

                       
                       
                       </div>
                    </>  
  ])
             
              mainMass.forEach(el => {

              if (el.years === year) {
                get_zakupkiPost(el,currencymass)
              }
           
          //   })
            })})
          

          

            function get_zakupkiPost (el, currencymass) {  
                massx = mass_P
                massx=massx.filter(element => element.years ===el.years)      
           if (massx.length >0)  {
               return (
                   <>
              <div style={
                  {gridColumn:'1/6',gridRow:2
              ,display:'block'
              ,padding:0
              ,margin:0
              ,alignSelf:'self-start'
              ,fontSize:'10px'
               ,color:'white'
              ,borderRadius:'10px'}}> 
                 {`Являлся Поставщиком в ${massx[0].cnt} контрактах:  ${massx[0].p_price}`}
                   </div>
                   </>
                ) 
        
              } 
          }


          async function ExcelDownloadHandler(years) {
            setLoading(true)
          await    getDetailzakupki_ejs(inn,years,FZ,excHback, excHtxt )
          //getDetailzakupki(inn, years, 44)
          setLoading(false)
        }

return (<Fragment>

          <GETTABLE funcGetRows={[...getMassRows(mass)]}  //Регистрационные данные
          style={{
              tclass: [`fz${FZ}  tblcolorhead`],
              captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
          }}
          name={`Данные о закупках в соответствии с ${FZ}-ФЗ `}
          endtbl={true}
          tStyle={{
              width: '90%',
              margin: 'auto',
              justifyContent: 'center'
              
          }}
          cut={4}
      /> <br/>
      </Fragment>
)
    



} 

export  default GETGOSZAKUPKIGOV;