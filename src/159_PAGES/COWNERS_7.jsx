
import React, { Fragment } from "react";
import EGRUL_FL_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_FL_COWNERS";
import EGRUL_UL_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_UL_COWNERS";
import EGRUL_IN_COWNERS from "./COWNERS/EGRUL_COWNERS/EGR_IN_COWNERS";
import ROSSTAT_FL_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_FL_COWNERS";
import ROSSTAT_UL_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_UL_COWNERS";
import ROSSTAT_IN_COWNERS from "./COWNERS/ROSSTAT_COWNERS/ROSST_IN_COWNERS"
import ROSST_F_OTHERS from "./COWNERS/ROSSTAT_F_OTHERS/ROSST_F_OTHERS";
import PAO_ROSSTAT_FL_COWNERS from "./COWNERS/PAO_COWNERS/PAO_ROSSTAT_FL_COWNERS";
import PAO_ROSSTAT_UL_COWNERS from "./COWNERS/PAO_COWNERS/PAO_ROSSTAT_UL_COWNERS";
import PAO_ROSSTAT_IN_COWNERS from "./COWNERS/PAO_COWNERS/PAO_ROSSTAT_IN_COWNERS";

import PAO_EGRUL_FL_COWNERS from "./COWNERS/PAO_COWNERS/PAO_EGRUL_FL_COWNERS";
import PAO_EGRUL_IN_COWNERS from "./COWNERS/PAO_COWNERS/PAO_EGRUL_IN_COWNERS";
import PAO_EGRUL_UL_COWNERS from "./COWNERS/PAO_COWNERS/PAO_EGRUL_UL_COWNERS";
import { getEmpty } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";


const COWNERS = (props) => {

const mainForm = props.mainForm
let  massEgrulPAO = []
let massRosstatPAO = []
  if (!mainForm) { getEmpty('Нет данных') }



 
  if (mainForm && mainForm.massPAOcows) {
    massEgrulPAO = mainForm.massPAOcows.filter(el=>el.sort ==='EGRUL_COWS_PAO' );  
    massRosstatPAO = mainForm.massPAOcows.filter(el=>el.sort ==='ROSSTAT_COWS_PAO' );
   
  } 

  function DATA () {

    return (
      <Fragment> 
         <ZAGOLOVOK  text={'Совладельцы'}/>             
               <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center" }}>
                  Совладение по данным ЕГРЮЛ
               </div>
              {massEgrulPAO && massEgrulPAO.length === 0 ? 
              <>
                    <EGRUL_FL_COWNERS mainForm={mainForm}/> 
                    <EGRUL_UL_COWNERS mainForm={mainForm}/> 
                    <EGRUL_IN_COWNERS mainForm={mainForm}/> 
                    </>
                    :
                    <>                    
                    <PAO_EGRUL_FL_COWNERS massEgrulPAO={massEgrulPAO}/> 
                    <PAO_EGRUL_UL_COWNERS massEgrulPAO={massEgrulPAO}/>
                    <PAO_EGRUL_IN_COWNERS massEgrulPAO={massEgrulPAO}/> 
                    </>                   
                     }

                    
                
                  <br/>
  
              <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center" }}>
                  Совладение по данным РОССТАТ
               </div>

               {massRosstatPAO && massRosstatPAO.length === 0 ? 
               <>
                    <ROSSTAT_FL_COWNERS mainForm={mainForm}/> 
                    <ROSSTAT_UL_COWNERS mainForm={mainForm}/> 
                    <ROSSTAT_IN_COWNERS mainForm={mainForm}/> 
                    <ROSST_F_OTHERS     mainForm={mainForm}/>
              </> :
                    <>                    
                    <PAO_ROSSTAT_FL_COWNERS massRosstatPAO={massRosstatPAO}/> 
                    <PAO_ROSSTAT_UL_COWNERS massRosstatPAO={massRosstatPAO}/> 
                    <PAO_ROSSTAT_IN_COWNERS massRosstatPAO={massRosstatPAO}/>
                    </>                   
                     }   
        
      </Fragment>
    )
  }
  return(<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} /> </Fragment>)

}

export default COWNERS;




