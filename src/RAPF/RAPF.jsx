import React from "react"
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK"
import GETTABLE from "../COMPONENTS/GETTABLE"
import { getRows } from "../JS/properties"
import MAIN_CARD from "../JS/MAIN_CARD"


const RAPF = ({mainForm}) => {


    
if (!mainForm) {return null}


  

return (
        <MAIN_CARD CHILDREN = {OSNCARD} name = {'РАПФ'}/>
    )

    function OSNCARD (){      
        return(
        <>   
         <ZAGOLOVOK text={'КАРТОЧКА ФИЛИАЛА ИНОСТРАННОЙ КОМПАНИИ'}/>
         <br/>
         <ZAGOLOVOK text={'Основная информация'}/>

         <GETTABLE funcGetRows={  getRows(
          [
         
          [`Наименование юридического лица`, <div style={{padding:'15px',color:'#ffae00', fontSize:'18px'}}>{mainForm.name_full}</div>],
          [`ИНН`,mainForm.inn_branch],
          [`КПП`,mainForm.kpp_branch],
          [`Основной ОКВЭД`,mainForm.okved_code + '  ' + mainForm.okved],
          [`Адрес головной организации`,  mainForm.address],
          [`Место расположения головной организации`,  `${mainForm.code_country} - ${mainForm.country}`],
          [`Наименование регистрирующего органа`,  mainForm.registration_authority],
          [`Номер регистрации`,mainForm.registration_number],
          [`Особенности режима регистрации`,  mainForm.special_registration_regime],
          [`Код налогоплательщика или его аналог`,  mainForm.code_taxpayer],
          [`Уставной капитал`,  mainForm.capital],
          [`Код валюты`,  mainForm.code_currency],
          [`Дата регистрации`,  mainForm.date_registration],
          [`Код налогового органа осуществившего постановку на учет`,  mainForm.tax_authority_registration_code],
          [`Наименование налогового органа осуществившего постановку на учет`,  mainForm.tax_authority_registration],
          [`ФИО Руководителя`,  mainForm.fio_header],
          [`ИНН Руководителя`,  mainForm.inn_header],
          [`Количество работников`,  mainForm.number_workers],
         

         ]
          ) } style={{tclass: ['tblString', 'mtbl'],}} /> <br/> 

        </>)
    }

}


export default RAPF;

