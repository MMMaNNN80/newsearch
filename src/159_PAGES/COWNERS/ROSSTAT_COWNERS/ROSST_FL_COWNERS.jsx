
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";




const ROSSTAT_FL_COWNERS = (props) => {
    const mainForm = props.mainForm
    if (!mainForm) { return null }

    //mainForm.okfs.style = {}

  //  console.log(mainForm.massCOWSROSSTAT)



    let massCowsFL = [] //Физ лица



    if (mainForm.massCOWSROSSTAT) {
        let head = ["Наименование", "ОКПО", "Доля,%", "Доля,руб", "Актуально на дату"]
        let mass = []
        mass = mainForm.massCOWSROSSTAT.filter(el => el.coowner_type === 2)
        if (mass.length > 0) {
            massCowsFL.push(head)

            mass.forEach(el => {
                massCowsFL.push([(el.curr === 1) ?
                    <span>
                        <div className="quadr" style={{ "display": "inline-flex" }}></div>
                        <div style={{ "display": "inline" }}>{el.cow_name}</div>
                    </span> : el.cow_name
                   , el.cow_okpo
                    , el.share_part, el.share_part_rur
                    , el.lastchgdatetime]
                )
            })
        };
    }


    return (
        <Fragment>
            {massCowsFL.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsFL)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Физические лица в структуре совладения (Росстат)"} /> : null}
        </Fragment>
    )
}




export default ROSSTAT_FL_COWNERS;