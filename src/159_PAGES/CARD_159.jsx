import React, { Fragment } from 'react'
import { getMassForm} from "../JS/properties"
import GETTABLE from '../COMPONENTS/GETTABLE'
import { getRows } from '../JS/properties'
import MAIN_CARD from '../JS/MAIN_CARD'

const CARD_159 = ({mainForm,cardstate}) => {

    let masshd = []
    let mass = []
    if(mainForm.massFinReport && mainForm.massFinReport.length>1 && mainForm.massFinReport[0].fin_type==='rosstat_finreport') 
     {
       
        mass = mainForm.massFinReport.filter(el =>el.form.toLowerCase().includes('о прибылях и убытках') && el.curr ===1)
        
        masshd.push (['Количество филиалов',  mainForm.branches_count.value, 'ХД', {}])
        mass.forEach(el => {
        if(el.code ==='2110') { masshd.push((['Выручка', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}]))}
        if(el.code ==='2100') { masshd.push((['Валовая прибыль (убыток)', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}]))}
        if(el.code ==='2400') { masshd.push((['Чистая прибыль (убыток)', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}]))}
        if(el.code ==='2410') { masshd.push((['Налог на прибыль ', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}]))}
        if(el.code ==='2411') { masshd.push((['в т.ч. текущий налог на прибыль', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}]))}
        if(el.code ==='2412') { masshd.push((['отложенный налог на прибыль', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}]))}
            
    });}

    if (mainForm.massWorkersNumber && mainForm.massWorkersNumber.length>0) {
        
        mainForm.massWorkersNumber.forEach((el,i)=>{
           masshd.unshift ([`Средняя численность сотрудников`, `${el.value} чел  (данные за ${el.period}г)`, {}])
        
        }) }
         
        masshd.length ? mass =  getRows(masshd) : mass = []
function DATA () {
    return (
            <Fragment>
                <GETTABLE key={0} funcGetRows={getMassForm("159", 'OSN', mainForm)}
                    style={
                        {
                            tclass: ["mtbl"],
                            captionStyle: { "color": "lightgrey", "alignText": "center" }
                        }
                    } name={"Основная информация:"}

                />
                <GETTABLE key={1} funcGetRows={getMassForm("159", 'CONT', mainForm)}
                    style={
                        {
                            tclass: ["mtbl"],
                            captionStyle: { "color": "lightgrey", "alignText": "center", }
                        }
                    }
                    name={"Контакты:"}
                />
                {mass.length > 0 ? <GETTABLE key={2} funcGetRows={mass}
                    style={
                        {
                            tclass: ["mtbl"],
                            captionStyle: { "color": "lightgrey", "alignText": "center", }
                        }
                    }
                    name={"Признаки хозяйственной деятельности"}
                /> : ''}
  
        </Fragment>

    )
} 

if(cardstate===2) {
return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>) 
}   else {return null;}            
}
export default CARD_159;