
import GETTABLE from "../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../JS/properties";
import React, {Fragment} from "react";
import { getEmpty } from "../../JS/properties";

const BALANCE_CSV = ({mainForm}) => {



let massPeriod=[]

if(!mainForm.massFinReport || mainForm.massFinReport.length<1) 
{return (getEmpty('Данные о наличии отчета "Бухгалтерский баланс" отсутствуют'))}


let mass=[]
// Определяем БАЛАНСЫ ДЛЯ СТРАХОВЫХ КОМПАНИЙ И БАНКОВ
    mass = mainForm.massFinReport.filter
             (el =>(el.okud.includes('0409806') && el.sort==='DATA') || 
             (el.okud.includes('0420125') && el.sort==='DATA'))
  
    if(mass.length<1) 
    {return (getEmpty('Данные о наличии отчета "Бухгалтерский баланс" отсутствуют'))}
 

massPeriod = mainForm.massFinReport
.filter(el=> el.sort==='PERIODS_OKUDS' && (el.okud.includes('0409806')|| el.okud.includes('0420125') ))

const okud = massPeriod[0].okud
console.log(okud)


massPeriod = massPeriod.map((el,i)=>{
    console.log(el.period)
    if (okud ==='0409806') {
return (
`Данные за ${i===0?'':'предыдущий'} отчетный период ( ${el.period}г),
тыс. руб.`)
    }

    if (okud ==='0420125') {
        return (
        `Данные(${el.period}г),
        тыс. руб.`)
            }
            return null  
} )
   
 console.log(massPeriod)  
//////////////////////////////////////////////////////////
//////////ДЛЯ БАНКОВ и СТРАХОВЫХ БАЛАНСЫ
//////////////////////////////////////////////////////////

massPeriod.unshift(
    "№",
    okud==='0409806'? "Наименование статьи" : 'Наименование показателя',
    "Номер пояснения"
    )

let massData=[]
mass.forEach(el=>  massData.push(
     [
el.code,
el.name,
el.nom_p,
el.p_value,
el.p_prev_value
     ]
))

massData.unshift(massPeriod)
console.log(massData)


    return (
        <Fragment>
            <GETTABLE funcGetRows={[...getMassRows(massData)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl tblcolorhead"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Бухгалтерский баланс"}
                endtbl = {true}
                />
        </Fragment>
    )

}
export default BALANCE_CSV