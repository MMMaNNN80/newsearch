import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getMassRows} from "../JS/properties";

const OKVEDS = () => {
  let mainForm = JSON.parse(localStorage.getItem('159'))
 
  let massOkvedsOsn =[]
 let massOkveds = []
  if (mainForm.massOkved) {

    massOkveds.push(["Код", 'Наименование'])
    massOkvedsOsn.push(["Код", 'Наименование'])
    
  
    mainForm.massOkved.forEach((el)=>{ 

      if(el.ismain ==="1"){massOkvedsOsn.push([el.code,el.name])}
      if(el.ismain !=="1") {massOkveds.push([el.code,el.name])}

    })
  }
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

           <GETTABLE funcGetRows={[...getMassRows(massOkvedsOsn)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl okvosn"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Основная деятельность"} /> <br />
            
            {massOkveds.length > 1 ? <GETTABLE funcGetRows={[...getMassRows(massOkveds)]}  //Регистрационные данные
            style={{
                tclass: ["fondtb"],
                captionStyle: {"paddingBottom":"10px", "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Побочная деятельность"} /> : <div className ="Empty"> Отсутствуют сведения о дополнительных видах деятельности компании </div>} <br />

        </div>
      </div>
    </div>
    </Fragment>

  )

}

export default OKVEDS;
