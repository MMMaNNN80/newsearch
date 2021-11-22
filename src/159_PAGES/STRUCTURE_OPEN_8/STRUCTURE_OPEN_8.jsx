
import React, { Fragment } from "react";
import BRANCHES_EGR from "./BRANCHES_EGR";
const STRUCTURE_OPEN = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))
  
const mainForm = props.mainForm
  if (!mainForm) { return null }
  

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
            
            <div className="" style={{"padding":"10px"}}>
             <div style={{"color":"lightblue", "padding":"0px", "marginBottom":"15px","textAlign":"center" }}>
                Филиалы по данным ЕГРЮЛ
             </div>
                  <BRANCHES_EGR mainForm={mainForm}/> 

                  </div>
          </div>
        </div>
      </div>
    </Fragment>

  )

}

export default STRUCTURE_OPEN;




