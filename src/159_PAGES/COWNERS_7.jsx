
import React, { Fragment } from "react";
import EGRUL_FL_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_FL_COWNERS";
import EGRUL_UL_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_UL_COWNERS";
import EGRUL_IN_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_IN_COWNERS";
import ROSSTAT_FL_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_FL_COWNERS";
import ROSSTAT_UL_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_UL_COWNERS";
import ROSSTAT_IN_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_IN_COWNERS"
import ROSST_F_OTHERS from "./COWNERS/ROSSTAT_F_OTHERS/ROSST_F_OTHERS";
import { getEmpty } from "../JS/properties";


const COWNERS = (props) => {

const mainForm = props.mainForm
  if (!mainForm) { getEmpty('Нет данных по Росстат') }

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
            
            
             <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center" }}>
                Совладение по данным ЕГРЮЛ
             </div>
                  <EGRUL_FL_COWNERS mainForm={mainForm}/> 
                  <EGRUL_UL_COWNERS mainForm={mainForm}/> 
                  <EGRUL_IN_COWNERS mainForm={mainForm}/> 
              
                  <br/>

            <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center" }}>
                Совладение по данным РОССТАТ
             </div>
                  <ROSSTAT_FL_COWNERS mainForm={mainForm}/> 
                  <ROSSTAT_UL_COWNERS mainForm={mainForm}/> 
                  <ROSSTAT_IN_COWNERS mainForm={mainForm}/> 
                  <ROSST_F_OTHERS mainForm={mainForm}/>

              </div>
          </div>
          </div>
      
    </Fragment>

  )

}

export default COWNERS;




