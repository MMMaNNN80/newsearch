
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
import { getEmpty } from "../../../JS/properties";


const ROSSTAT_IN_COWNERS = (props) => {
    const mainForm = props.mainForm
    if (!mainForm || !mainForm.massCOWSROSSTAT) { return null }

    //mainForm.okfs.style = {}




    let massCowsIN = [] //Иностранные компании



    if (mainForm.massCOWSROSSTAT) {
        let head = ["Наименование", "ОКПО","Место положения", "Доля,%", "Доля,руб", "Актуально на дату"]
        let mass = []
        mass = mainForm.massCOWSROSSTAT.filter(el => el.coowner_type === 1)
        if (mass.length > 0) {
            massCowsIN.push(head)

            mass.forEach(el => {
                massCowsIN.push([(el.curr === 1) ?
                    <span>
                        <div className="quadr" style={{ "display": "inline-flex" }}></div>
                        <div style={{ "display": "inline" }}>{el.cow_name}</div>
                    </span> : el.cow_name
                   , el.cow_okpo
                   , el.place
                    , el.share_part, el.share_part_rur
                    , el.lastchgdatetime]
                )
            })
        };
    }


    return (
        <Fragment>
            {massCowsIN.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsIN)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Иностранные компании в структуре совладения (Росстат)"} /> : 
                getEmpty('Нет данных по совладению иностранными компаниями')
                }
        </Fragment>
    )
}




export default ROSSTAT_IN_COWNERS;