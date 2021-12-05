
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";

const BRANCHES_EGR = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))



  const mainForm = props.mainForm
  // paginations
 const [currentPage,setCurrentPage] = useState(1)
 const [perCountPages] = useState(3)

 const  lastPageIndex = currentPage * perCountPages  //5
 const  firstPageIndex = lastPageIndex - perCountPages
 let currentPages=[]
  //console.log(mainForm)

  if (!mainForm || !mainForm.massBranchesEgrul || mainForm.massBranchesEgrul.length<1) { return null }

  let cnt = ''
  let mass = [];
  let massBranchesEgrul = []
  let head = ["№","Наименование", "КПП", "Адрес", "Дата регистр действий", "ГРН сведения"]
  //console.log(mainForm.massBranchesEgrul)
  if (mainForm.massBranchesEgrul.length > 0) {
    mainForm.massBranchesEgrul.forEach((el,i) => {
      massBranchesEgrul.push([i+1,el.name, el.kpp, el.address, el.last_registr_date,
      (el.grn && el.grn_date) ?
        el.grn + ' от ' + el.grn_date : "-"])
    });
    cnt = mainForm.massBranchesEgrul[0].cnt
    
mass = massBranchesEgrul
mass= mass.slice(firstPageIndex,lastPageIndex)
mass.unshift(head)
     currentPages = mass
    
  }
  return (
    <Fragment>
       
    <GETTABLE
      funcGetRows={[...getMassRows(currentPages)]}
      style={{
        tclass: ["mtbl tblcolorhead"],
        captionStyle: { padding: "5px" ,color: 'white' }
      }}
      name={`Филиалы ЕГРЮЛ (количество - ${cnt})`} endtbl={false}
    />
   { Math.ceil(cnt / perCountPages) > 1 ? <PAGINATION perCountPages={perCountPages} totalItems={cnt} setCurrentPage={setCurrentPage} /> : null}

</Fragment>

  )
    }

export default BRANCHES_EGR;



