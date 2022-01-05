import React, {  } from 'react'
import { getMassForm} from "../JS/properties"
import GETTABLE from '../COMPONENTS/GETTABLE'
import { getRows } from '../JS/properties'

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
            
    
    });
}

    if (mainForm.massWorkersNumber && mainForm.massWorkersNumber.length) {
        console.log( mainForm.massWorkersNumber)
        
        mainForm.massWorkersNumber.forEach((el,i)=>{
           
        
         masshd.unshift ([`Средняя численность сотрудников`, `${el.value} чел  (данные за ${el.period}г)`, {}])
        
        }) }
         
         
        masshd.length ? mass =  getRows(masshd) : mass = []

 if(cardstate===2) {
    return (
        <div className="form" style={{"background":"linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))"}} >
            <div className="spcard">
                <div className="lblCard">
                    <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
                    <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
                    <p className="sh_name">{mainForm.short_name.value}</p>
                    <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
                </div>
                <div className="main_card">
                    <GETTABLE funcGetRows={getMassForm("159",'OSN',mainForm)}
                        style={
                            {
                                tclass: ["mtbl"],
                                captionStyle: { "color": "lightgrey", "alignText": "center" }
                            }
                        } name={"Основная информация:"}

                    />
                                <GETTABLE funcGetRows={getMassForm("159",'CONT',mainForm)}
                        style={
                            {
                                tclass: ["mtbl"],
                                captionStyle: { "color": "lightgrey", "alignText": "center", }
                            }
                        }
                        name={"Контакты:"}
                    />

                   {mass.length>1 ? <GETTABLE funcGetRows={mass}
                        style={
                            {
                                tclass: ["mtbl"],
                                captionStyle: { "color": "lightgrey", "alignText": "center", }
                            }
                        }
                        name={"Признаки хозяйственной деятельности"}
                    /> :''}

                </div>
            </div>
        </div>

    )
} else {return null;}                 

}
export default CARD_159;