import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getRows, getMassRows } from "../JS/properties";


const REGDATA = () => {
  let mainForm = JSON.parse(localStorage.getItem('159'))
  // console.log(mainForm)
  //'dataport_id','ogrn',"inn",'kpp',
  // правки вывода полей
  mainForm.okfs.value = mainForm.okfs_code.value
    + '-' + mainForm.okfs.value
  //mainForm.okfs.style = {}

  mainForm.okogu_code.name = "ОКОГУ"
  let mass = getmass([
    'dataport_id', 'short_name',
    "inn", 'kpp', 'ogrn', 'okpo'
    , 'okopf', 'okogu_code'
    , 'okfs', 'oktmo'
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


  //let massFonds = []

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



          </div>
        </div>
      </div>
    </Fragment>

  )

}

export default REGDATA;
