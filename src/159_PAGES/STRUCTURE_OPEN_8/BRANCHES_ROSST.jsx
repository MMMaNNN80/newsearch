
import React, { Fragment, useState } from "react";
import GETTABLE from "../../COMPONENTS/GETTABLE";
import PAGINATION from "../../JS/PAGINATION";
import { getMassRows } from "../../JS/properties";





const BRANCHES_ROSST = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))



  const mainForm = props.mainForm
  const [isopen, setIsOpen] = useState(false)
  const [styleimg,setStyleimg] = useState({transform: "rotate(0deg)", backgroundColor: "white"})

  // paginations
 const [currentPage,setCurrentPage] = useState(1)
 const [perCountPages] = useState(6)

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
        ,el.status + ( el.status_date)? ' от ' + el.status_date:''
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
     isopen === true ? currentPages =mass : currentPages=[]    
  }
  return (
    <Fragment>

      {mainForm.massBranchesRosstat.length > 0 ?
        <>
          <div style={{ color: "white", fontSize: "14px", marginBottom: "8px" }}></div>
        
          <div style={{width:"100%", backgroundColor:"darkgreen" , opacity: 0.9,padding:0}}>
          <img style={{...styleimg}} src="..\..\icon\openLists.svg" height="15px" alt="иконка списка"
              onClick={onClickHandler }></img>
             <span style={{color: "white" ,fontSize:"12px"}}> {`Филиалы по данным РОССТАТ (количество - ${cnt}, дата актуализации -${actual_date})`} </span>
           
            </div>

          <GETTABLE
            funcGetRows={[...getMassRows(currentPages)]}
            style={{
              tclass: ["mtbl"],
              captionStyle: {padding:"0"}
            }}
          />
           {isopen===true && Math.ceil(massBranchesRosstat.length/perCountPages)>1?<PAGINATION perCountPages={perCountPages} totalItems ={massBranchesRosstat.length} setCurrentPage={setCurrentPage}/>: null}

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

export default BRANCHES_ROSST;



