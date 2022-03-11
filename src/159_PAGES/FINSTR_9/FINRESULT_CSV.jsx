
import GETTABLE from "../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../JS/properties";
import React, {Fragment} from "react";
import { getEmpty,getQuadr } from "../../JS/properties";

const FINRESULT_CSV = ({mainForm}) => {



let massPeriod=[]

if(!mainForm.massFinReportCSV || mainForm.massFinReportCSV.length<1) 
{return (getEmpty('Данные о наличии отчета "Отчет о финансовых результатах" отсутствуют'))}


let mass=[]
// Определяем ФИНАНСОВЫЕ РЕЗУЛЬТАТЫ ДЛЯ СТРАХОВЫХ КОМПАНИЙ И БАНКОВ
    mass = mainForm.massFinReportCSV.filter
             (el =>(el.okud.includes('0409807') && el.sort==='DATA') || 
             (el.okud.includes('0420126') && el.sort==='DATA' )) //&& el.who_is_str !=='empty_data'
  
    if(mass.length<1) 
    {return (getEmpty('Данные о наличии отчета "Отчет о финансовых результатах" отсутствуют'))}
 

massPeriod = mainForm.massFinReportCSV
.filter(el=> el.sort==='PERIODS_OKUDS' && (el.okud.includes('0409807-1')|| el.okud.includes('0420126') ))

let okud = massPeriod[0].okud
let okudBanki;



console.log(mass)


massPeriod = massPeriod.map((el,i)=>{
    console.log(el.period)
    if (okud.includes('0409807-1')) {
        okudBanki =  '0409807'
return (
`Данные за ${i===0?'':'предыдущий'} отчетный период ( ${el.period}г),
тыс. руб.`)
    }

    if (okud ==='0420126') {
        return (
        `Данные за (${el.period}г),
        тыс. руб.`)
            }
            return null  
} )
   
 console.log(massPeriod)  
//////////////////////////////////////////////////////////
//////////ДЛЯ БАНКОВ и СТРАХОВЫХ ФИНАНСОВЫЕ РЕЗУЛЬТАТЫ
//////////////////////////////////////////////////////////

massPeriod.unshift(
    "№",
    okud.includes('0409807')? "Наименование статьи" : 'Наименование показателя',
    "Номер пояснения"
    )

let massData=[]
let massData2= []

mass.forEach(el=> { 
    if (okud ==='0420126')
    massData.push(
     [
el.code,
el.who_is_str ===`headtxt`? getQuadr(el.name) :el.name,
el.nom_p,
el.p_value,
el.p_prev_value
     ]   
)

if (el.okud.includes('0409807-1'))
massData.push(
 [
el.code,
el.who_is_str ===`headtxt`? getQuadr(el.name) :el.name,
el.nom_p,
el.p_value,
el.p_prev_value
 ]
)
if (el.okud.includes('0409807-2'))
massData2.push(
 [
el.code,
el.who_is_str ===`headtxt`? getQuadr(el.name) :el.name,
el.nom_p,
el.p_value,
el.p_prev_value
 ]
)
})

massData.unshift(massPeriod)
massData2.unshift(massPeriod)
// console.log(massData)

 
if (okud.includes('0420126') ){
    return (
        <Fragment>
            <GETTABLE funcGetRows={[...getMassRows(massData,true)]} 
                style={{
                    tclass: ["mtbl tblcolorhead"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={`Отчет о финансовых результатах ${okud==='0420126'?'страховых организаций':'' }  (ОКУД: ${okud})`}
                endtbl = {true}
                />
        </Fragment>
    )
            } 

if (okud.includes('0409807')){
    return (
        <Fragment>
            <div style={{background: 'radial-gradient(#20213a, transparent)', padding:'5px'}}>
            
                    <GETTABLE funcGetRows={[...getMassRows(massData,true)]} 
            style={{
                tclass: ["mtbl tblcolorhead"],
                captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
            }}
                name= {<> <div>{`Отчет о финансовых результатах (ОКУД: ${okudBanki})`}</div> 
                {getQuadr(<span style={{color:'#17e2ec',padding:'2px'}}>{`Раздел 1. Прибыли и убытки`}</span>)}</>}
                endtbl = {true}
                />   
                       <GETTABLE funcGetRows={[...getMassRows(massData2,true)]} 
            style={{
                tclass: ["mtbl tblcolorhead"],
                captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
            }}
                name= {<> {getQuadr(<span style={{color:'#17e2ec',padding:'2px'}}>{`Раздел 2. Прочий совокупный доход`}</span>)} </>}
                endtbl = {true}
                />  
                <br/> 
                </div>
        </Fragment>
    )
            }
}


export default FINRESULT_CSV