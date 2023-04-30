
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getMassRows } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";
//import SUBSTATES from "./SUBSTATES";



const CHANGES_COMP = (props) => {

  const mainForm = props.mainForm
  if (!mainForm) { return null }

  let massSUCC = []
  let massPREDS = []
  if (mainForm.massSUCCSPRED) {

    massSUCC.push(["Наименование", 'ИНН', "ОГРН", "Адрес", "Полное наименование"])
    massPREDS.push(["Наименование", 'ИНН', "ОГРН", "Адрес", "Полное наименование"])

    mainForm.massSUCCSPRED.filter(x => x.bysort === "Преемники").forEach((el) => {

      massSUCC.push([el.shortnamerus, el.inn, el.ogrn, el.address, el.fullnamerus])
    })

    mainForm.massSUCCSPRED.filter(x => x.bysort === "Предшественники").forEach((el) => {

      massPREDS.push([el.shortnamerus, el.inn, el.ogrn, el.address, el.fullnamerus])
    })

  }
  function DATA() {
    return (
      <Fragment>
        <ZAGOLOVOK text={'История изменений'}/>
               {/* <SUBSTATES dp_id = {mainForm.dataport_id.value}/> */}
        <GETTABLE key={0} funcGetRows={[...getMassRows(massSUCC)]}  //Регистрационные данные
          style={{
            tclass: ["mtbl"],
            captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
          }}
          name={"Преемники"} endtbl={true} /> <br />

        <GETTABLE key={1}
          funcGetRows={[...getMassRows(massPREDS)]}  //Регистрационные данные
          style={{
            tclass: ["mtbl"],
            captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
          }}
          name={"Предшественники"} endtbl={true} /> <br />
      </Fragment>
    )
  }
  return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)
}

export default CHANGES_COMP;
