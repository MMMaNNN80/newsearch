
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import {getMassRows} from "../JS/properties";
import { getEmpty } from "../JS/properties";



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


  return (
<Fragment>
    <div className="form" style={{ "background": "linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))" }} >
      <div className="spcard">
        <div className="lblCard">
          <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
          <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
          <p className="sh_name">{mainForm.short_name.value}</p>
          <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
        </div>
        <div className="main_card">

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

        </div>
      </div>
    </div>
    </Fragment>

  )

}

export default CONTACTS_DATA;
