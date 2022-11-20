
import React, { Fragment,useEffect,useState } from "react";
import BRANCHES_EGR from "./BRANCHES_EGR";
import BRANCHES_ROSST from "./BRANCHES_ROSST";
import STRUCTURE_EGRUL from "./STRUCTURE_EGRUL";
import STRUCTURE_ROSSTAT from "./STRUCTURE_ROSSTAT";
import { getParamsObj } from "../../JS/properties";
import { getResponsePg } from "../../JS/connection";
import SPINER from "../../JS/SPINER";
import MAIN_CARD from "../../JS/MAIN_CARD";
import ZAGOLOVOK from "../../COMPONENTS/ZAGOLOVOK";
const STRUCTURE_OPEN = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))
  const [cowmass,setCowMass] = useState({loading:true}) 
const mainForm = props.mainForm
const inn = mainForm.inn.value

useEffect(() => {
  async function getCowners() { 
      let obj =  getParamsObj()
      obj.inn = inn
      obj.fields = "*"
      obj.table = `f_getRecursStruct('${inn}')`
      obj.host = '/159'
      await getResponsePg(obj).then(mass => { 
      
       setCowMass ({mass:mass,loading:false})    
    } ) }
    getCowners()
    
  }, [inn])
function DATA () {
  

  return (
    <Fragment>
      <ZAGOLOVOK text = {'Структура развернуто'}/>
         <div className="" style={{"padding":"10px"}}>
             <div style={{"color":"lightblue",
              "padding":"0px", "marginBottom":"15px",
              "textAlign":"center", fontSize: "14px" }}>
                Данные о дочерних компаниях по сведениям ЕГРЮЛ
             </div>
             {!cowmass.loading?<STRUCTURE_EGRUL cowmass={cowmass.mass}/>:<SPINER/>} 
                  </div>

               <div className="" style={{"padding":"10px"}}>
             <div style={{"color":"lightblue",
              "padding":"0px", "marginBottom":"15px",
              "textAlign":"center", fontSize: "14px" }}>
                Данные о дочерних компаниях по сведениям РОССТАТ
             </div>
             {!cowmass.loading?<STRUCTURE_ROSSTAT cowmass={cowmass.mass}/> :<SPINER/>}         
          </div>
            <div className="" style={{"padding":"10px"}}>
             <div style={{"color":"lightblue",
              "padding":"0px", "marginBottom":"15px",
              "textAlign":"center", fontSize: "14px" }}>
                Данные о филиалах по сведениям ЕГРЮЛ
             </div>
                  <BRANCHES_EGR mainForm={mainForm}/> 
                  </div>

                  <div className="" style={{"padding":"10px"}}>
             <div style={{"color":"lightblue",
              "padding":"0px", "marginBottom":"15px",
              "textAlign":"center", fontSize: "14px" }}>
                Данные о филиалах по сведениям РОССТАТ
             </div>
                  <BRANCHES_ROSST mainForm={mainForm}/> 
                  </div>
    </Fragment>

  )
}
  return(<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} /> </Fragment>)
}

export default STRUCTURE_OPEN;




