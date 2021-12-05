
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";





const BRANCHES_ROSST = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))



  const mainForm = props.mainForm

  // paginations
 const [currentPage,setCurrentPage] = useState(1)
 const [perCountPages] = useState(3)

 const  lastPageIndex = currentPage * perCountPages  //5
 const  firstPageIndex = lastPageIndex - perCountPages
 let currentPages=[]
  //console.log(mainForm)

  if (!mainForm || !mainForm.massBranchesRosstat || mainForm.massBranchesRosstat.length<1) { return null }

  let cnt = ''
  let actual_date =''
  //let EgrulStatistic = []
  let mass = [];
  let massBranchesRosstat = []
  let head = ["№","Наименование",
  "Статус", "ОКПО", "Адрес", "Дата регистрации"]
  //console.log(mainForm.massBranchesEgrul)
  if (mainForm.massBranchesEgrul.length > 0) {
   
    mainForm.massBranchesRosstat.forEach((el,i) => {
      massBranchesRosstat.push
      ( [ i+1
        ,el.organization_name
        ,el.status + ( el.status_date)? el.status + ' от ' + el.status_date:''
        ,el.okpo
        ,el.place
        ,el.registration_date,
      ])
    });
    cnt = mainForm.massBranchesRosstat[0].cnt
    actual_date = mainForm.massBranchesRosstat[0].lastchgdatetime
    
mass = massBranchesRosstat
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
      name={`Филиалы РОССТАТ (количество - ${cnt}) актуально на ${actual_date}`} endtbl={false}
    />
   { Math.ceil(cnt / perCountPages) > 1 ? <PAGINATION perCountPages={perCountPages} totalItems={cnt} setCurrentPage={setCurrentPage} /> : null}

</Fragment>

  )

}

export default BRANCHES_ROSST;



