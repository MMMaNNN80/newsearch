
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
 import { Link } from "react-router-dom";
 import { getEmpty } from "../../../JS/properties";



const PAO_EGRUL_UL_COWNERS = ({massEgrulPAO}) => {

    




    function getCompany(inn) {
        alert(inn)
    }


    let massCowsUL = [] //Физ лица




        let head = ["Наименование","ИНН", "ОКПО", "Доля,%", "Доля,руб", "Актуально на дату"]
        let mass = []
        mass = massEgrulPAO.filter(el => el.coowner_type === 0)
        if (mass.length > 0) {
            massCowsUL.push(head)

            mass.forEach(el => {
                massCowsUL.push([
                    <span>
                        <div className="quadr" style={{ "display": "inline-flex" }}></div>
                        <div style={{ "display": "inline" }}>{el.cow_name}</div>
                    </span> 
                    , <Link to ="" onClick = {()=>getCompany(el.cow_inn)} >{el.cow_inn}</Link> 
                   , el.cow_okpo
                    , el.share_part, el.share_part_rur
                    , el.input_date]
                )
            })
        };
    


    return (
        <Fragment>
            {massCowsUL.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsUL)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Юридические лица в структуре совладения (ЕГРЮЛ) ПАО"} 
                endtbl = {true}
                /> : 
                getEmpty('Нет данных по совладению юридическими лицами')
                }
        </Fragment>
    )
}




export default PAO_EGRUL_UL_COWNERS;