import React, {Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getMassRows} from "../JS/properties";
import { getEmpty } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";

const OKVEDS = (props) => {

  const mainForm = props.mainForm
 
  if(!mainForm.massOkveds || mainForm.massOkveds.length<1)
    
  {
    return(
      <Fragment >
          <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={getE} />                   
      </Fragment>)
     }

let massOkvedsOsn =[]
let massOkveds = []

 massOkveds.push(["Код", 'Наименование'])
 massOkvedsOsn.push(["Код", 'Наименование'])
    
 mainForm.massOkveds.forEach((el)=>{ 
      if(el.ismain ==="1"){massOkvedsOsn.push([el.code,el.name])}
      if(el.ismain !=="1") {massOkveds.push([el.code,el.name])}
    })
function DATA(){
  return (
<Fragment>
<ZAGOLOVOK text = {'Виды экономической деятельности'}/>
{massOkveds.length > 0 ? <>
        <GETTABLE funcGetRows={[...getMassRows(massOkvedsOsn)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl okvosn"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Основная деятельность"} /> <br />
           
            <GETTABLE funcGetRows={[...getMassRows(massOkveds)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: {"paddingBottom":"10px", "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Побочная деятельность"}
            endtbl = {true}
            /> </>
            : 
            getEmpty("Отсутствуют сведения о дополнительных видах деятельности")}
    </Fragment>
  )
}
  return(
    <Fragment >
        <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} />                   
    </Fragment>
      )
      function getE() {return getEmpty("Отсутствуют сведения о зарегистрированных видах деятельности")}
}

export default OKVEDS;
