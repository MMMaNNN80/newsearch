
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";

const BRANCHES_EGR = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))



  const mainForm = props.mainForm
  
  const [isopen, setIsOpen] = useState(false)
  const [styleimg,setStyleimg] = 
  useState({transform: "rotate(0deg)", backgroundColor: "white"})

  // paginations
 const [currentPage,setCurrentPage] = useState(1)
 const [perCountPages] = useState(6)

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
     isopen === true ? currentPages =mass : currentPages=[]    
  }
  return (
    <Fragment>

      {mainForm.massBranchesEgrul.length > 0 ?
        <>
          <div style={{ color: "white", fontSize: "14px", marginBottom: "8px" }}></div>
        
          <div style={{width:"100%", backgroundColor:"darkgreen" , opacity: 0.9,padding:0}}>
          <img style={{...styleimg}} src="..\..\icon\openLists.svg" height="15px" alt="иконка списка"
              onClick={onClickHandler }></img>
             <span style={{color: "white" ,fontSize:"12px"}}> 
             {`Филиалы по данным ЕГРЮЛ (количество - ${cnt})`} </span>
           
            </div>

          <GETTABLE
            funcGetRows={[...getMassRows(currentPages)]}
            style={{
              tclass: ["mtbl"],
              captionStyle: {padding:"0"}
            }}
          />
           {isopen===true && Math.ceil(massBranchesEgrul.length/perCountPages)>1?<PAGINATION perCountPages={perCountPages} totalItems ={massBranchesEgrul.length} setCurrentPage={setCurrentPage}/>: null}

        </>
        : null}
       

    </Fragment>

  )

  function onClickHandler()
  { 
  isopen ? setStyleimg({transform: "rotate(0deg)", backgroundColor:"white"}) : setStyleimg({transform: "rotate(90deg)", backgroundColor:"white"})
  setIsOpen(!isopen) 

  }
}

export default BRANCHES_EGR;



