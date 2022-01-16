
import React, { Fragment } from "react";
import EGRUL_FL_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_FL_COWNERS";
import EGRUL_UL_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_UL_COWNERS";
import EGRUL_IN_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_IN_COWNERS";
import ROSSTAT_FL_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_FL_COWNERS";
import ROSSTAT_UL_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_UL_COWNERS";
import ROSSTAT_IN_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_IN_COWNERS"
import ROSST_F_OTHERS from "./COWNERS/ROSSTAT_F_OTHERS/ROSST_F_OTHERS";
import { getEmpty } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";


const COWNERS = (props) => {

const mainForm = props.mainForm
  if (!mainForm) { getEmpty('Нет данных') }

  function DATA () {
    return (
      <Fragment>              
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
        
      </Fragment>
  
    )
  }
  return(<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} /> </Fragment>)

}

export default COWNERS;




