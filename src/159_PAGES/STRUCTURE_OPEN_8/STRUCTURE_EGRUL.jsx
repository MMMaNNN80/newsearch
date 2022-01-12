
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";
import { Link } from "react-router-dom";


const STRUCTURE_EGRUL = ({ cowmass }) => {

    useState({ transform: "rotate(0deg)", backgroundColor: "white" })

  // paginations
  const [currentPage, setCurrentPage] = useState(1)
  const [perCountPages] = useState(10)

  const lastPageIndex = currentPage * perCountPages  //5
  const firstPageIndex = lastPageIndex - perCountPages

  let currentPages = []
  if (cowmass.length === 0) { return null }

 
  let mass = []
  let massEGRULChild = []


  mass = cowmass.filter(el => el.src === "EGRUL_CHILD" && el.lvl === 1)
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
  return (
    <Fragment>
       
          <GETTABLE
            funcGetRows={[...getMassRows(currentPages)]}
            style={{
              tclass: ["mtbl tblcolorhead"],
              captionStyle: { padding: "5px" ,color: 'white' }
            }}
            name={`Дочерние компании-сведения ЕГРЮЛ (количество - ${cnt})`} endtbl={true}
          />
         { Math.ceil(cnt / perCountPages) > 1 ? <PAGINATION perCountPages={perCountPages} totalItems={cnt} setCurrentPage={setCurrentPage} /> : null}

    </Fragment>

  )

  
}
  

  export default STRUCTURE_EGRUL;



