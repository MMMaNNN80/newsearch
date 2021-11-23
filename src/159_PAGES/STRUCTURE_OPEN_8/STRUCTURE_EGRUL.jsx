
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";
import { Link } from "react-router-dom";


const STRUCTURE_EGRUL = ({ cowmass }) => {
  const [isopen, setIsOpen] = useState(false)
  const [styleimg, setStyleimg] =
    useState({ transform: "rotate(0deg)", backgroundColor: "white" })

  // paginations
  const [currentPage, setCurrentPage] = useState(1)
  const [perCountPages] = useState(10)

  const lastPageIndex = currentPage * perCountPages  //5
  const firstPageIndex = lastPageIndex - perCountPages

  let currentPages = []
  if (cowmass.length === 0) { return null }

  cowmass = cowmass[0].f_getrecursstruct
  let mass = []
  let massEGRULChild = []


  mass = cowmass.filter(el => el.src === "EGRUL_CHILD" && el.lvl === 1)
  console.log(massEGRULChild)
  let head = ["№", "Наименование", "ИНН", "Доля,%", "Доля,руб", "Дата совладения"]
  mass.forEach((el, i) => {
    massEGRULChild.push(
      [i + 1
        , el.shortnamerus
        , <Link to="" onClick={() => { }} >{el.company_inn}</Link>
        , el.share_part
        , el.share_part_rur
        , el.input_date
      ]
    )
  });
  const cnt = massEGRULChild.length
  mass = massEGRULChild
  mass = mass.slice(firstPageIndex, lastPageIndex)
  mass.unshift(head)
  currentPages = mass
  isopen === true ? currentPages = mass : currentPages = []
  return (
    <Fragment>

      {cowmass.length > 0 ?
        <>
          <div style={{ color: "white", fontSize: "14px", marginBottom: "8px" }}></div>

          <div style={{ width: "100%", backgroundColor: "darkgreen", opacity: 0.9, padding: 0 }}>
            <img style={{ ...styleimg }} src="..\..\icon\openLists.svg" height="15px" alt="иконка списка"
              onClick={onClickHandler}></img>
            <span style={{ color: "white", fontSize: "12px" }}>
              {`Данные по дочерним компаниям ЕГРЮЛ (количество - ${cnt})`} </span>

          </div>
          <GETTABLE
            funcGetRows={[...getMassRows(currentPages)]}
            style={{
              tclass: ["mtbl tblcolorhead"],
              captionStyle: { padding: "0" }
            }}
          />
          {isopen === true && Math.ceil(cnt / perCountPages) > 1 ? <PAGINATION perCountPages={perCountPages} totalItems={cnt} setCurrentPage={setCurrentPage} /> : null}

        </>
        : null}

    </Fragment>

  )
  function onClickHandler() {
    isopen ? setStyleimg({ transform: "rotate(0deg)", backgroundColor: "white" }) : setStyleimg({ transform: "rotate(90deg)", backgroundColor: "white" })
    setIsOpen(!isopen)

  }
  
  
}
  

  export default STRUCTURE_EGRUL;



