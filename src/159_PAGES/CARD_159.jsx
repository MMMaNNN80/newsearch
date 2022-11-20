import React, { Fragment } from 'react'
import { getMassForm,getMassRows } from "../JS/properties"
import GETTABLE from '../COMPONENTS/GETTABLE'
import { getRows} from '../JS/properties'
import MAIN_CARD from '../JS/MAIN_CARD'
import ZAGOLOVOK from '../COMPONENTS/ZAGOLOVOK'
import { getQuadr } from '../JS/properties'




const CARD_159 = ({ mainForm, cardstate }) => {

    let masshd = []
    let mass = []
    let  massReestr = []
     massReestr = mainForm?.massReestr?.map((el,i)=>{ 
        let background = 'green';
        if(el.link.includes('rnp') && el.status.includes('не')) {background='pink'}
        if(el.link.includes('reestr') && !el.status.includes('не')) {background='yellow'}
        return (
        [i+1,
         el.name,
         el.link,
         <div>  {getQuadr(el.status,{height:'10px',width:'30px',background:background})} </div>
        ] )} )
        massReestr?.unshift(['#',`Наименование списка`, `Источник`, `Статус`])


    if ( mainForm?.massFinReport?.length > 1 && mainForm.massFinReport[0].fin_type === 'rosstat_finreport') {

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

    if (mainForm?.massWorkersNumber?.length > 0) {
  const jsx = mainForm.massWorkersNumber.map ((el, i) => {
    return (
    <li style={{padding:'2px'}} key={i}>
<span>{`${el.period}г -${el.value} чел`}</span>  {el.diff ? <span style={{background: el.diff>=0 ?'green':'darkblue', padding:'4px',fontSize:'12px',fontWeight:'700'}}>{ el.diff>=0 ? <>&uarr;</> : <>&darr;</>  } {el.diff}</span>:''}
  </li>)})
     
            masshd.unshift([`Средняя численность сотрудников`,  
          <div style={{padding:'5px'}}><ul >{jsx}</ul></div>   , {}])

        
    }

    masshd?.length ? mass = getRows(masshd) : mass = []
    function DATA() {
      
        return (
            <Fragment>
                 <ZAGOLOVOK  text={'Карточка компании'}/>
                
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
                   
                   {massReestr && massReestr.length > 1 ? <GETTABLE key={2} funcGetRows ={getMassRows(massReestr)}
                        style={
                            {
                                tclass: ["mtbl"],
                                captionStyle: { "color": "lightgrey", "alignText": "center", }
                            }
                        }
                        name={"Позитивные, негативные,  списки (по данным Росстат):"}
                    /> : ''}
   
                    {mass.length > 0 ? <GETTABLE key={3} funcGetRows={mass}
                        style={
                            {
                                tclass: ["mtbl"],
                                captionStyle: { "color": "lightgrey", "alignText": "center", }
                            }
                        }
                        name={"Признаки хозяйственной деятельности:"}
                    /> : ''}
            
                <KNM />

               

            </Fragment>

        )



    }
    const KNM = () => {
    
return (<>
            <div style={{ "color": "lightgrey", "alignText": "center", paddingTop: '5px',paddingBottom:'5px'
            , display: 'flex', justifyContent: 'space-between' }}>
                <span>Сведения о проверках государственными органами</span>
                
            </div>
            <div style={{ display:'flex',justifyContent:'space-between',color: 'yellow', fontSize: '10px', width: '100%', background: '#3e47a7', padding: '8px' }}> 
             <span>{mainForm.knm_cnt >0 ? `Присутствуют данные о ${mainForm.knm_cnt} проверке/ах`: `Отсутствуют данные о проверке/ах госорганами` }
             </span>

            </div> 
        </>)


    }

if (cardstate === 2) {
        return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)
    } else { return null; }



}
export default CARD_159;