
import GETTABLE from "../../COMPONENTS/GETTABLE";
import {getMassRows } from "../../JS/properties";
import React, {Fragment} from "react";
import {getEmpty } from "../../JS/properties";

const FINRESULT = ({mainForm}) => {


if(!mainForm.massFinReport || mainForm.massFinReport.length<1) 
{return (getEmpty('Данные о наличии отчета "Отчет о прибылях и убытках" отсутствуют'))}
 
    let mass=[]
   // console.log(mainForm.massFinReport)
    mass = mainForm.massFinReport.filter(el =>el.form.toLowerCase().includes('о прибылях и убытках'))
if(mass.length<1) {return null}
///console.log(mass) 
let current_year =''
let prev_year =''  
let prev_prev_year = '' 

mass.forEach((el,i)=>{
  if(el.curr===1 ) { current_year =`На 31.12.`+ el.period}   
  if(el.curr===2 ) { prev_year = `На 31.12.`+ el.period} 
  if(el.curr===3 ) { prev_prev_year = `На 31.12.`+ el.period}
})

let massData=[]
const head =
  [
  "Наименование показателя",	
  "Код",	
  current_year,	
  prev_year,	
  prev_prev_year]
 massData.push(head)
 massData.push(
    ['Выручка', '2110','','',''],
    ['Себестоимость продаж', '2120','','',''],
    ['Валовая прибыль (убыток)', '2100','','',''],
    ['Коммерческие расходы', '2210','','',''],
    ['Управленческие расходы', '2220','','',''],
    ['Прибыль (убыток) от продаж', '2200','','',''],
    ['Доходы от участия в других организациях', '2310','','',''],
    ['Проценты к получению', '2320','','',''],
    ['Проценты к уплате', '2330','','',''],
    ['Прочие доходы', '2340','','',''],
    ['Прочие расходы', '2350','','',''],
    ['Прибыль (убыток) до налогообложения', '2300','','',''],
    ['Налог на прибыль', '2410','','',''],
    ['в т.ч. текущий налог на прибыль"', '2411','','',''],
    ['отложенный налог на прибыль', '2412','','',''],
    ['Прочее', '2460','','',''],
    ['Чистая прибыль (убыток)', '2400','','',''],
    ['Результат от переоценки внеоборотных\nактивов, не включаемый в чистую прибыль (убыток) периода', '2510','','',''],
    ['Результат от прочих операций\nне включаемый в чистую прибыль (убыток)периода',  '2520','','',''],
    ['Совокупный финансовый результат периода', '2500','','',''],
    ['Справочно\n Базовая прибыль (убыток) на акцию', '2900','','',''],
    ['Разводненная прибыль (убыток) на акцию', '2910','','',''],
    )

massData.forEach(el=>{
    mass.forEach(elsrc=>{
        if (elsrc.curr===1 &&elsrc.code===el[1]){ el[2]=elsrc.p_value} 
        if (elsrc.curr===2 &&elsrc.code===el[1]){ el[3]= elsrc.p_value}
        if (elsrc.curr===3 &&elsrc.code===el[1]){ el[4]= elsrc.p_value}
    })

})

return (
<Fragment>


             <GETTABLE funcGetRows={[...getMassRows(massData)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl tblcolorhead"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Отчет о финансовых результатах"}
            endtbl = {true}
            />
        
</Fragment>
)

}
export default FINRESULT