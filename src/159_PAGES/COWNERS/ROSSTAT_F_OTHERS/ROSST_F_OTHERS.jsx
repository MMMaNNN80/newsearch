
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
import { Link } from "react-router-dom";




const ROSST_F_OTHERS = (props) => {
    const mainForm = props.mainForm
    if (!mainForm || !mainForm.massFoundersOthers) { return null }
    let massFoundersOthers = [] 


    if (mainForm.massFoundersOthers.length) {
        let head = ["Источник", "ИНН", "Наименование/ФИО", "Доля,%", "Сумма","Актуально на дату"]
        let mass = []
        mass = mainForm.massFoundersOthers
        if (mass.length > 0) {
            massFoundersOthers.push(head)

            mass.forEach(el => {
                massFoundersOthers.push([
                     el.source
                   , <Link to="" onClick={() => alert(el.inn)} >{el.inn}</Link>
                    , el.name
                    , el.p_percent
                    , el.p_sum
                    ,el.actual_date
                ]
                )
            })
        };
    }
    return (
        <Fragment>
            {massFoundersOthers.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massFoundersOthers)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Совладельцы  (другие источники - Росстат)"} /> : 
                null}
        </Fragment>
    )
}




export default ROSST_F_OTHERS;