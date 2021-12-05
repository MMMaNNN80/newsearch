
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";
import { Link } from "react-router-dom";


function STRUCTURE_ROSSTAT({cowmass}) {

  cowmass = cowmass[0].f_getrecursstruct

    
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
return (
    <Fragment>
       
          <GETTABLE
            funcGetRows={[...getMassRows(currentPages)]}
            style={{
              tclass: ["mtbl tblcolorhead"],
              captionStyle: { padding: "5px" ,color: 'white' }
            }}
            name={`Дочерние компании-сведения РОССТАТ (количество - ${cnt})`} endtbl={true}
          />
         { Math.ceil(cnt / perCountPages) > 1 ? <PAGINATION perCountPages={perCountPages} totalItems={cnt} setCurrentPage={setCurrentPage} /> : null}

    </Fragment>
)

  }
  

  export default STRUCTURE_ROSSTAT;



