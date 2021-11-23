
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";
import { Link } from "react-router-dom";


function STRUCTURE_ROSSTAT({cowmass}) {


  cowmass = cowmass[0].f_getrecursstruct
      const [isopen, setIsOpen] = useState(false)
      const [styleimg, setStyleimg] =
        useState({ transform: "rotate(0deg)", backgroundColor: "white" })
    
      // paginations
      const [currentPage, setCurrentPage] = useState(1)
      const [perCountPages] = useState(10)
    
      const lastPageIndex = currentPage * perCountPages  //5
      const firstPageIndex = lastPageIndex - perCountPages
    
      let currentPages = []
       let mass = []
    let massRosstat = []


    mass = cowmass.filter(el => el.src === "ROSSTAT_CHILD" && el.lvl === 1)
   
    
    let head = ["№", "Наименование", "ИНН", "ОКПО", "Доля,%", "Доля,руб"]
    mass.forEach((el, i) => {
      massRosstat.push(
        [i + 1
          , el.organization_name
          , <Link to="" onClick={() => { }} >{el.inn}</Link>
          , el.okpo
          , el.percent
          , el.sum
        ]
      )
    });
    const cnt = mass.length
    
    if (mass.length === 0) { return null }

    mass = massRosstat
    mass = mass.slice(firstPageIndex, lastPageIndex)
    mass.unshift(head)
    currentPages = mass
    isopen === true ? currentPages = mass : currentPages = []
return (
      <Fragment>
        <div style={{ color: "white", fontSize: "14px", marginBottom: "8px" }}></div>
        <div style={{ width: "100%", backgroundColor: "darkgreen", opacity: 0.9, padding: 0 }}>
          <img style={{ ...styleimg }} src="..\..\icon\openLists.svg" height="15px" alt="иконка списка"
            onClick={onClickHandler}></img>
          <span style={{ color: "white", fontSize: "12px" }}>
            {`Данные по дочерним компаниям РОССТАТ (количество - ${cnt} актуально на ${cowmass[0].lastchgdatetime})`} </span>
        </div>

        <GETTABLE
            funcGetRows={[...getMassRows(currentPages)]}
            style={{
              tclass: ["mtbl tblcolorhead"],
              captionStyle: { padding: "0" }
            }}
          />
          {isopen === true && Math.ceil(cnt / perCountPages) > 1 ? 
          <PAGINATION perCountPages={perCountPages} totalItems={cnt} setCurrentPage={setCurrentPage} /> : null}
      </Fragment>
)
function onClickHandler() {
  isopen ? setStyleimg({ transform: "rotate(0deg)", backgroundColor: "white" }) : setStyleimg({ transform: "rotate(90deg)", backgroundColor: "white" })
  setIsOpen(!isopen)

}
  }
  

  export default STRUCTURE_ROSSTAT;



