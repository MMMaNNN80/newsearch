
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
import { getEmpty } from "../../../JS/properties";


const PAO_ROSSTAT_IN_COWNERS = ({massRosstatPAO}) => {







    let massCowsIN = [] //Иностранные компании


      let head = ["Наименование","Место положения", "Доля,%", "Доля,руб", "Актуально на дату"]
        let mass = []
        mass = massRosstatPAO.filter(el => el.coowner_type === 1)
        if (mass.length > 0) {
            massCowsIN.push(head)

            mass.forEach(el => {
                massCowsIN.push([(el.curr === 1) ?
                    <span>
                        <div className="quadr" style={{ "display": "inline-flex" }}></div>
                        <div style={{ "display": "inline" }}>{el.cow_name}</div>
                    </span> : el.cow_name
                   , el.place
                    , el.share_part, el.share_part_rur
                    , el.input_date]
                )
            })
        };
    


    return (
        <Fragment>
            {massCowsIN.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsIN)]}  //Регистрационные данные
                style={{
                    tclass: ["mtbl"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Иностранные компании в структуре совладения (Росстат) ПАО"}
                endtbl = {true}
                /> : 
                getEmpty('Нет данных по совладению иностранными компаниями')
                }
        </Fragment>
    )
}




export default PAO_ROSSTAT_IN_COWNERS;