
import React, { Fragment } from "react";
import GETTABLE from "../../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../../JS/properties";


const EGRUL_IN_COWNERS = (props) => {
  const mainForm = props.mainForm
  if (!mainForm || !mainForm.massCOWSEGRUL) { return null }

  let massCowsINUL = [] //Иностранные юридические лица

 const mass = mainForm.massCOWSEGRUL.filter(el => el.coowner_type === "1")
  if (mass.length > 0) {
  let  head = ["Наименование организации",
      "Адрес", "Страна происхождения", "Доля,%   ", "Доля,руб", "ГРН сведения"]
    massCowsINUL.push(head)
    mass.forEach(el => {
      massCowsINUL.push([
        (el.curr === 1) ?
          <span>
            <div className="quadr" style={{ "display": "inline-flex" }}></div>
            <div style={{ "display": "inline" }}>{el.name}</div>
          </span> : el.name
        , el.address
        , el.country_name
        , el.share_part, el.share_part_rur
        , (el.share_part_grn && el.share_part_grn_date) ?
          el.share_part_grn + ' от ' + el.share_part_grn_date : "-"]
      )
    });
  }

  return (
    <Fragment>


      {massCowsINUL.length > 0 ? <GETTABLE funcGetRows={[...getMassRows(massCowsINUL)]} 
        style={{
          tclass: ["mtbl"],
          captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
        }}
        name={"Иностранные юридические лица в структуре совладения"} /> : null} <br />

    </Fragment>
  )
}


export default EGRUL_IN_COWNERS;