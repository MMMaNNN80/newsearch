import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getRows, getMassRows } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";



const REGDATA = (props) => {

  const mainForm = props.mainForm

  mainForm.okfs_ism = { value: mainForm.okfs_code.value + '-' + mainForm.okfs.value, name: "ОКФС" }
  //mainForm.okfs.style = {}

  mainForm.okogu_code.name = "ОКОГУ"
  let mass = getmass([
    'dataport_id', 'short_name',
    'ogrn', "inn", 'kpp', 
     'okopf', 'okogu_code'
    , 'okfs_ism','okpo', 'oktmo'
  ], 'REG_1', mainForm).filter(el => el[1])

  // сделали массив 1 таблицы
  function getmass(mass, table_name, mainForm) {
    let mass_ = []
    mass.forEach(el => {
      for (const key in mainForm) {

        //   console.log(key, mainForm)
        if (key.toLowerCase().trim() === el.toLowerCase().trim() && mainForm[key]) {
          mass_.push([mainForm[key].name, mainForm[key].value, table_name, mainForm[key].style ? mainForm[key].style : {}])
        }
      }
    }
    )
    return mass_
  }
  let massReg = []
  if (mainForm.massRegistr.length > 1) {
    massReg.push(["Дата первичной регистрации", mainForm.massRegistr[0].regdate, 'REGISTR', {}])
    if (mainForm.massRegistr.length > 1) {
      massReg.push(["Дата посл рег действий",
        mainForm.massRegistr[1].regdate, 'REGISTR', {}])
    }
    massReg.push(["Регистрирующий орган", mainForm.massRegistr[0].regauthoritycode + ' ' + mainForm.massRegistr[0].regauthority, 'REGISTR', {}])
    massReg.push(["Адрес регистрирующего органа", mainForm.massRegistr[0].regauthorityaddress, 'REGISTR', {}])
  }
  if (!mainForm.massRegistr) { massReg = [] }


  let massFonds = []
  if (mainForm.massFonds) {
    massFonds.push(["Фонд", 'Дата постановки на учет'
      , 'Регистрационный номер'
      , 'Регистрирующий орган', 'Код регистрирующего органа', 'ГРН(сведения)'])

    mainForm.massFonds.forEach((el) => {
      massFonds.push([el.fond, el.date_registration, el.regnumber, el.name, el.code, el.grn])
    })
  }
  if (!mainForm.massFonds) { massFonds = [] }

  function DATA () {
    return (
      <Fragment>
              <GETTABLE funcGetRows={[...getRows(mass)]}  //Регистрационные данные
                style={{
                  tclass: ["mtbl"],
                  captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Регистрационные данные:"} /> <br />
  
              <GETTABLE funcGetRows={[...getRows(massReg)]}  //Регистрационные данные
                style={{
                  tclass: ["mtbl"],
                  captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Сведения о государственной регистрации"} /> <br />

              <GETTABLE funcGetRows={[...getMassRows(massFonds)]}  //Регистрационные данные
                style={{
                  tclass: ["mtbl"],
                  captionStyle: { "paddingBottom": "10px", "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Регистрация в ПФ, ФCC"} /> <br />
      </Fragment>
  
    )
  }
  return(
    <Fragment >
        <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} />                   
    </Fragment>
      )

}

export default REGDATA;
