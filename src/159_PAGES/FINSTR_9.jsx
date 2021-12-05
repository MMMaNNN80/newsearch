
import React, { Fragment } from "react";
import BALANCE from "./FINSTR_9/BALANCE_REPORT";
import FINRESULT from "./FINSTR_9/FINRESULT";

const FINSTR = ({mainForm})=>{

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
            Бухгалтерская финансовая отчетность
             </div>
             </div>
            
          <BALANCE mainForm={mainForm}/> <br/>
            
          <FINRESULT mainForm={mainForm}/>
          

          </div>
        </div>
      </div>
    </Fragment>

  )

}

export default FINSTR;



