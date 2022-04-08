import React, { Fragment, useState } from 'react'
import { getMassForm } from "../JS/properties"
import GETTABLE from '../COMPONENTS/GETTABLE'
import { getRows} from '../JS/properties'
import MAIN_CARD from '../JS/MAIN_CARD'
import PROS_FILTER from './PROS_FILTER'
import { f_get_knm } from '../JS/SQL'



const CARD_159 = ({ mainForm, cardstate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [massMain,setMassMain] = useState([])

    let masshd = []
    let mass = []
    if (mainForm.massFinReport && mainForm.massFinReport.length > 1 && mainForm.massFinReport[0].fin_type === 'rosstat_finreport') {

        mass = mainForm.massFinReport.filter(el => el.form.toLowerCase().includes('о прибылях и убытках') && el.curr === 1)

        masshd.push(['Количество филиалов', mainForm.branches_count.value, 'ХД', {}])
        mass.forEach(el => {
            if (el.code === '2110') { masshd.push((['Выручка', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}])) }
            if (el.code === '2100') { masshd.push((['Валовая прибыль (убыток)', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}])) }
            if (el.code === '2400') { masshd.push((['Чистая прибыль (убыток)', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}])) }
            if (el.code === '2410') { masshd.push((['Налог на прибыль ', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}])) }
            if (el.code === '2411') { masshd.push((['в т.ч. текущий налог на прибыль', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}])) }
            if (el.code === '2412') { masshd.push((['отложенный налог на прибыль', `${el.p_value} (актульно на 31.12.${el.period}) `, 'ХД', {}])) }

        });
    }

    if (mainForm.massWorkersNumber && mainForm.massWorkersNumber.length > 0) {

        mainForm.massWorkersNumber.forEach((el, i) => {
            masshd.unshift([`Средняя численность сотрудников`, `${el.value} чел  (данные за ${el.period}г)`, {}])

        })
    }

    masshd.length ? mass = getRows(masshd) : mass = []
    function DATA() {
      
        return (
            <Fragment>
                {!isOpen ? <>
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
                </> : null}
                <KNM />
            </Fragment>

        )



    }
    const KNM = () => {
    
return (<>
            <div style={{ "color": "lightgrey", "alignText": "center", paddingTop: '5px',paddingBottom:'5px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Сведения о проверках государственными органами</span>
                
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',color: 'yellow', fontSize: '10px', width: '100%', background: '#3e47a7', padding: '8px' }}> 
             <span>{mainForm.knm_cnt >0 ? `Присутствуют данные о ${mainForm.knm_cnt} проверке/ах`: `Отсутствуют данные о проверке/ах госорганами` }
             </span>

             {mainForm.knm_cnt >0 ? 
             <span onClick={() => 
                { 
                     setIsOpen(!isOpen) 

                    if(!isOpen && mainForm.dataport_id.value) { 
                       f_get_knm (mainForm.dataport_id.value)
                       .then(mass=> {
                             
                        setMassMain(mass)
                    })
                    }
                
                }}
                    style={{
                        gridColumn: '5'
                        , alignSelf: 'center'
                        , verticalAlign: 'center'
                        , justifySelf: 'center'
                        , color: 'white', transform: !isOpen ? 'rotate(90deg)' : 'rotate(0deg)', fontSize: '16px', cursor: 'pointer'
                    }}>| |</span>:null}
            </div>
            {isOpen && massMain ? <div>
                <PROS_FILTER massMain={massMain } />
            </div> : null}
        </>)


    }




    if (cardstate === 2) {
        return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)
    } else { return null; }



}
export default CARD_159;