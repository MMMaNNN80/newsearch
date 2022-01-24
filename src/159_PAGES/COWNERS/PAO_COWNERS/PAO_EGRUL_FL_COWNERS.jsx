
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
import { getEmpty } from "../../../JS/properties";




const PAO_EGRUL_FL_COWNERS = ({massEgrulPAO}) => {


   let massEgrul = []
   const  head = ["Наименование", "Доля,%", "Доля,руб", "Актуально на дату"]



        let mass = []
        mass = massEgrulPAO.filter(el => el.coowner_type === 2)
        
        if (mass.length > 0) {
            massEgrul.push(head)
            
            mass.forEach(el => {
                massEgrul.push([
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
            {massEgrul.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massEgrul)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Физические лица в структуре совладения (ЕГРЮЛ)-ПАО"} 
                
                endtbl = {true}
                /> : 
                getEmpty('Нет данных по совладению физическими лицами')}
        </Fragment>
    )
                     

            


}




export default PAO_EGRUL_FL_COWNERS;