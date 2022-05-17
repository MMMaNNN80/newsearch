
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import {getMassRows} from "../JS/properties";
import { getEmpty } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";


const CONTACTS_DATA = (props) => {
 // let mainForm = JSON.parse(localStorage.getItem('159'))
 
const mainForm = props.mainForm
 if (!mainForm) {return null} 
 
  let massAddrHis =[]
  if (mainForm.massAddrHis) {

    massAddrHis.push(["Адрес", 'ГРН',"Дата ГРН"])
    
    mainForm.massAddrHis.forEach((el,n)=>{ 
      if (n===0) {massAddrHis.push([
      <span>
        <div className="quadr" style={{"display":"inline-flex"}}></div> 
       <div style={{"display":"inline"}}>{el.address + '  (актуально)'}</div>
       </span> ,el.grn,el.grn_date])}
      else {massAddrHis.push([el.address,el.grn,el.grn_date])}
    })
  }
let massPhones = []
  if(mainForm.phone_parsed.value) 
  {
    mainForm.phone_parsed.value.split(',') 
    ? mainForm.phone_parsed.value.split(',').forEach(el=>{
      massPhones.push([el])
    }) : massPhones.push([]) ;
 // console.log(massPhones)
  
    massPhones.unshift(['Телефоны компании'])
  }

//  массив из н   скольких столбцов с врехней строкой и без!

function DATA() {
return (
<Fragment>
  <ZAGOLOVOK text={'Телефоны и адреса'}/>
       {massPhones.length>0 ? <GETTABLE funcGetRows={[...getMassRows(massPhones)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }  }}
            tblend = {true}    
            name={"Контактные данные"} />  : getEmpty('Сведения о контактных телефонах отсутствуют')} <br />
          {massAddrHis.length>0 ? <GETTABLE funcGetRows={[...getMassRows(massAddrHis)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px"}}}
            name={"История смены юридического адреса"}
             /> : getEmpty('Сведения о юридических адресах отсутствуют')}

    </Fragment>
  )
}
  return(<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} /> </Fragment>)

}

export default CONTACTS_DATA;
