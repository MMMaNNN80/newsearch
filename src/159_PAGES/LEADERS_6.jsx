
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import {getMassRows} from "../JS/properties";



const LEADERS = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))
  
const mainForm = props.mainForm
 if (!mainForm) {return null} 
 
  //mainForm.okfs.style = {}

  //console.log(mainForm.massLeadersHis)

  
  let massLeaders=[]
  let massDisqLeaders = []
  let massUnreliability = []
  //console.log( mainForm.massLeadersHis)
  
  if (mainForm.massLeadersHis) {

   massLeaders.push([ 
   "ФИО","Должность", 'ИНН',"Сведения ГРН"])
    
    mainForm.massLeadersHis.forEach(el=>{
      massLeaders.push([ (el.curr===1)?
      <span>
       <div className="quadr" style={{"display":"inline-flex"}}></div> 
      <div style={{"display":"inline"}}>{el.fio}</div>
    
      </span> : el.fio

      ,el.post, el.inn,el.grn + ' от ' + el.recdate])
    })
  
    massDisqLeaders = mainForm.massLeadersHis.filter(
      el=>el.disq_begin_date)
      if(massDisqLeaders) {
        massDisqLeaders=[]
        massDisqLeaders.push([
        "ФИО"
          ,"Должность"
        , 'ИНН'
        ,"Дата начала дисквалификации"
        ,"Дата окончания дисквалификации"
        ,"Дата решения"
        ,"Сведения ГРН"])

        mainForm.massLeadersHis.filter(el=>el.disq_begin_date).forEach(el=>{
          massDisqLeaders.push(
            [ 
              el.fio,
              el.post, 
              el.inn, 
              el.disq_begin_date
              ,el.disq_end_date
              ,el.disq_decision_date
              ,el.grn + ' от ' + el.recdate
            
            ]
            )
        })
        massUnreliability = mainForm.massLeadersHis.filter(el=>el.unreliability) 
        if(massUnreliability) {
          massUnreliability=[]
          massUnreliability.push(
            [ 
              "ФИО"
              ,"Должность"
            , 'ИНН'
            ,'Текст'
            ,'Сведения ГРН'
           ])
           mainForm.massLeadersHis.filter(el=>el.unreliability).forEach(el=>{
            massUnreliability.push(
              [el.fio,
                el.post, 
                el.inn, 
                el.unreliability,
                el.unreliability_grn + ' от ' + el.unreliability_recdate
                        ]
              )
          })



        }

      }

      ///console.log(massDisqLeaders)
  }





  return (
<Fragment>
    <div className="form" style={{ "background": "linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))" }} >
      <div className="spcard">
        <div className="lblCard">
          <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
          <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
          <p className="sh_name">{mainForm.short_name.value}</p>
          <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
        </div>
        <div className="main_card">

  <GETTABLE funcGetRows={[...getMassRows(massLeaders)]} //Регистрационные данные
      style={{
    tclass: ["mtbl"],
    captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }}}
    name={"Руководители"} /> <br /> 
      
      <GETTABLE funcGetRows={[...getMassRows(massDisqLeaders)]} //Регистрационные данные
      style={{
    tclass: ["mtbl"],
    captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }}}
    name={"Сведения о дисквалификации"} /> <br /> 

<GETTABLE funcGetRows={[...getMassRows(massUnreliability)]} //Регистрационные данные
      style={{
    tclass: ["mtbl"],
    captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }}}
    name={"Сведения о недостоверности"} /> <br /> 

        
   
            
      

        </div>
      </div>
    </div>
    </Fragment>

  )

      }

export default  LEADERS;


// {/* <GETTABLE funcGetRows={[...getMassRows(massSUCC)]}  //Регистрационные данные
// style={{
//     tclass: ["mtbl"],
//     captionStyle: { "color": "lightblue", "alignText": "center","fontSize":"12px" }
//   }}
// name={"Преемники"} /> <br />}

