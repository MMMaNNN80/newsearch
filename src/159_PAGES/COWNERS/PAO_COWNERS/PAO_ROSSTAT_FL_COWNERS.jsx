
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
import { getEmpty } from "../../../JS/properties";




const PAO_ROSSTAT_FL_COWNERS = ({massRosstatPAO}) => {

   //console.log(massRosstatPAO)
   let massRosstat = []
   const  head = ["Наименование", "Доля,%", "Доля,руб", "Актуально на дату"]

    

        let mass = []
        mass = massRosstatPAO.filter(el => el.coowner_type === 2)
        
        if (mass.length > 0) {
            massRosstat.push(head)
            
            mass.forEach(el => {
                massRosstat.push([
                    <span>
                        <div className="quadr" style={{ "display": "inline-flex" }}></div>
                        <div style={{ "display": "inline" }}>{el.cow_name}</div>
                    </span>
               
                    , el.share_part, el.share_part_rur
                    , el.input_date]
                )
            })
        };
        

     return (
        <Fragment>
            {massRosstat.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massRosstat)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Физические лица в структуре совладения (Росстат) ПАО"}
                endtbl = {true}
                /> : 
                getEmpty('Нет данных по совладению физическими лицами')}
        </Fragment>
    )
                     

            


}




export default PAO_ROSSTAT_FL_COWNERS;