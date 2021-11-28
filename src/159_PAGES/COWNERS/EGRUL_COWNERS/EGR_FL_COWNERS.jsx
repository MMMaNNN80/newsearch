
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";
import { getEmpty } from "../../../JS/properties";



const EGRUL_FL_COWNERS = (props) => {
    const mainForm = props.mainForm
    if (!mainForm || !mainForm.massCOWSEGRUL) { return null }
   
    //mainForm.okfs.style = {}

    //console.log(mainForm.massCOWSEGRUL)

    function getCompany(inn) {
        alert(inn)
    }

    let massCowsFL = [] //Физ лица

        let head = ["ФИО", "ИНН", "Доля,%   ", "Доля,руб   ", "ГРН сведения"]
        let mass = []
        mass = mainForm.massCOWSEGRUL.filter(el => el.coowner_type === "2")
        if (mass.length > 0) {
            massCowsFL.push(head)
            mass.forEach(el => {
                massCowsFL.push([
                    (el.curr === 1) ?
                        <span>
                            <div className="quadr" style={{ "display": "inline-flex" }}></div>
                            <div style={{ "display": "inline" }}>{el.name}</div>

                        </span> : el.name,
                    <Link to="" onClick={() => getCompany(el.inn)} >{el.inn}</Link>
                    , el.share_part, el.share_part_rur
                    , (el.share_part_grn && el.share_part_grn_date) ?
                        el.share_part_grn + ' от ' + el.share_part_grn_date : "-"]
                )
            })
        };
        return (
            <Fragment>
             { massCowsFL.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsFL)]}  //Регистрационные данные
                    style={{
                        tclass: ["mtbl"],
                        captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                    }}
                    name={"Физические лица в структуре совладения"} /> : 
                    getEmpty('Нет данных по совладению физическими лицами')}
                     
            </Fragment>
        )
    }




    export default EGRUL_FL_COWNERS;