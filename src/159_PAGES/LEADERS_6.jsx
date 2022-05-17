
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getMassRows } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK"


const LEADERS = (props) => {
  //let mainForm = JSON.parse(localStorage.getItem('159'))

  const mainForm = props.mainForm
  if (!mainForm) { return null }
  let massLeaders = []
  let massDisqLeaders = []
  let massUnreliability = []
  //console.log( mainForm.massLeadersHis)

  if (mainForm.massLeadersHis) {
    massLeaders.push([
      "ФИО", "Должность", 'ИНН', "Сведения ГРН"])

    mainForm.massLeadersHis.forEach(el => {
      massLeaders.push([(el.curr === 1) ?
        <span>
          <div className="quadr" style={{ "display": "inline-flex" }}></div>
          <div style={{ "display": "inline" }}>{el.fio}</div>

        </span> : el.fio

        , el.post, el.inn, el.grn + ' от ' + el.recdate])
    })

    massDisqLeaders = mainForm.massLeadersHis.filter(
      el => el.disq_begin_date)
    if (massDisqLeaders) {
      massDisqLeaders = []
      massDisqLeaders.push([
        "ФИО"
        , "Должность"
        , 'ИНН'
        , "Дата начала дисквалификации"
        , "Дата окончания дисквалификации"
        , "Дата решения"
        , "Сведения ГРН"])

      mainForm.massLeadersHis.filter(el => el.disq_begin_date).forEach(el => {
        massDisqLeaders.push(
          [
            el.fio,
            el.post,
            el.inn,
            el.disq_begin_date
            , el.disq_end_date
            , el.disq_decision_date
            , el.grn + ' от ' + el.recdate

          ]
        )
      })
      massUnreliability = mainForm.massLeadersHis.filter(el => el.unreliability)
      if (massUnreliability) {
        massUnreliability = []
        massUnreliability.push(
          [
            "ФИО"
            , "Должность"
            , 'ИНН'
            , 'Текст'
            , 'Сведения ГРН'
          ])
        mainForm.massLeadersHis.filter(el => el.unreliability).forEach(el => {
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


  }




  function DATA() {
    return (
      <Fragment>
        <ZAGOLOVOK  text={'Органы управления'}/>
        <GETTABLE key={0} funcGetRows={[...getMassRows(massLeaders)]} //Регистрационные данные
          style={{
            tclass: ["mtbl"],
            captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
          }}
          name={"Руководители"} /> <br />

        <GETTABLE key={1} funcGetRows={[...getMassRows(massDisqLeaders)]} //Регистрационные данные
          style={{
            tclass: ["mtbl"],
            captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
          }}
          name={"Сведения о дисквалификации"} /> <br />

        <GETTABLE key={2} funcGetRows={[...getMassRows(massUnreliability)]} //Регистрационные данные
          style={{
            tclass: ["mtbl"],
            captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
          }}
          name={"Сведения о недостоверности"} /> <br />
      </Fragment>

    )
  }
  return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)
}

export default LEADERS;


