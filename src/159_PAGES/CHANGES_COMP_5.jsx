
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import {getMassRows} from "../JS/properties";



const CHANGES_COMP = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))
  
const mainForm = props.mainForm
 if (!mainForm) {return null} 
 
  //mainForm.okfs.style = {}
  
  let massSUCC=[]
  let massPREDS = []
  if (mainForm.massSUCCSPRED) {

    massSUCC.push(["Наименование", 'ИНН',"ОГРН","Адрес","Полное наименование"])
    massPREDS.push(["Наименование", 'ИНН',"ОГРН","Адрес","Полное наименование"])

    mainForm.massSUCCSPRED.filter(x=>x.bysort ==="Преемники").forEach((el)=>{ 
     
      massSUCC.push([el.shortnamerus,el.inn,el.ogrn,el.address,el.fullnamerus])
    })

    mainForm.massSUCCSPRED.filter(x=>x.bysort ==="Предшественники").forEach((el)=>{ 
     
      massPREDS.push([el.shortnamerus,el.inn,el.ogrn,el.address,el.fullnamerus])
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

        <GETTABLE funcGetRows={[...getMassRows(massSUCC)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Преемники"} endtbl={true}/> <br />

<GETTABLE 
funcGetRows={[...getMassRows(massPREDS)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Предшественники"} endtbl={true} /> <br />
            


   
            
      

        </div>
      </div>
    </div>
    </Fragment>

  )

}

export default  CHANGES_COMP;
