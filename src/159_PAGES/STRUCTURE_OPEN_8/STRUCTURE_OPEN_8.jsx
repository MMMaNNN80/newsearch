
import React, { Fragment,useEffect,useState } from "react";
import BRANCHES_EGR from "./BRANCHES_EGR";
import BRANCHES_ROSST from "./BRANCHES_ROSST";
import STRUCTURE_EGRUL from "./STRUCTURE_EGRUL";
import STRUCTURE_ROSSTAT from "./STRUCTURE_ROSSTAT";
import { getParamsObj } from "../../JS/properties";
import { getResponsePg } from "../../JS/connection";
import SPINER from "../../JS/SPINER";
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

 
          </div>
        </div>
      </div>
    </Fragment>

  )

}

export default STRUCTURE_OPEN;




