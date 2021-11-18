
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";




const EGRUL_UL_COWNERS = (props) => {
    const mainForm = props.mainForm
    if (!mainForm) { return null }
   
    //mainForm.okfs.style = {}

    //console.log(mainForm.massCOWSEGRUL)

    function getCompany(inn) {
        alert(inn)
    }

    let massCowsUL = [] //Физ лица

    let mass=[]
    let head
     
    //ЮЛ
     mass = mainForm.massCOWSEGRUL.filter(el => el.coowner_type === "0")

     if (mass.length > 0){
      head = ["Наименование организации", 
     "ИНН","ОГРН", "Доля,%   ", "Доля,руб   ", "ГРН сведения"]
     massCowsUL.push(head)
     mass.forEach(el => {
      massCowsUL.push([
        (el.curr===1)?
    <span>
     <div className="quadr" style={{"display":"inline-flex"}}></div> 
    <div style={{"display":"inline"}}>{el.name}</div>
    </span> : el.name
        ,
        
       <Link to ="" onClick = {()=>getCompany(el.inn)} >{el.inn}</Link> 
       ,el.ogrn
        , el.share_part, el.share_part_rur
        , (el.share_part_grn && el.share_part_grn_date) ? 
        el.share_part_grn + ' от ' + el.share_part_grn_date : "-"]
      )
   });
     }


        return (
            <Fragment>
             {massCowsUL.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsUL)]}  //Регистрационные данные
              style={{
                tclass: ["mtbl"],
                captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
              }}
              name={"Юридические лица в структуре совладения"} /> : null} 
            </Fragment>
        )
    }




    export default EGRUL_UL_COWNERS;