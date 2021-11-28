
import React, { Fragment } from "react";
import FZ44 from "./GOSZAKUPKI/44FZ";
import FZ223 from "./GOSZAKUPKI/223FZ";


const GOSZAKUPKI = ({mainForm})=>{
 
    if(!mainForm )  {return ''}


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
          <div className="cowners" style={{"padding":"5px"}}>
             <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center" }}>
            Сведения о госзакупках
             </div>
             </div>
             <FZ44 mainForm = {mainForm}/> <br/>
             <FZ223 mainForm = {mainForm}/>

          </div>
        </div>
      </div>
    </Fragment>

  )

}

export default GOSZAKUPKI;




