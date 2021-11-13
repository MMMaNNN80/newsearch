import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getRows } from "../JS/properties";


const REGDATA = () => {
  let mainForm = JSON.parse(localStorage.getItem('159'))
  // console.log(mainForm)
  //'dataport_id','ogrn',"inn",'kpp',
  // правки вывода полей
  mainForm.okfs.value = mainForm.okfs_code.value
    + '-' + mainForm.okfs.value
  //mainForm.okfs.style = {}

  mainForm.okogu_code.name = "ОКОГУ"


  let mass = getmass([
    'dataport_id', 'short_name',
    "inn", 'kpp', 'ogrn', 'okpo'
    , 'okopf', 'okogu_code'
    , 'okfs', 'oktmo'
  ], 'REG_1', mainForm).filter(el => el[1] !== '')

  // сделали массив 1 таблицы

  const HTPPmass = getRows(mass)

  function getmass(mass, table_name, mainForm) {
    let mass_ = []


    mass.forEach(el => {
      for (const key in mainForm) {

        //   console.log(key, mainForm)
        if (key.toLowerCase().trim() === el.toLowerCase().trim() && mainForm[key]) {

          mass_.push([mainForm[key].name, mainForm[key].value, table_name, mainForm[key].style ? mainForm[key].style : {}])
        }


      }
    }
    )

    return mass_
  }


  //  массив из н   скольких столбцов с врехней строкой и без!





  function getMassRows(mass = [[1, 23, 3, 7, 77, 7], [12, 3, 4, 7, 77,8]] ) {
    let m = []
  



    mass.forEach((el,i) => {
      m.push(
      <Fragment key={i}>
      <tr key={i} style={{ "color": "white" }}>
        {
        [...el.map((el,x) => {
          return (
       <Fragment key={x}>
              { x===0?
              <th key={x} style={{ "color": "white" }}>{el}</th> :
              <td key={x} style={{ "color": "white" }}>{el}</td>
              }
        </Fragment>
          )})]}
      </tr>
      </Fragment>
      )
    }



    )
    // console.log(m)
    return m


  }

  //     mass.map((_,i)=>{
  //         console.log(mass[i])
  //         mass_.push([mainForm.mass[i].name,mainForm.mass[i].value,table_name,{} ])
  //    })


  return (

    <div className="form" style={{ "background": "linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))" }} >
      <div className="spcard">
        <div className="lblCard">
          <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
          <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
          <p className="sh_name">{mainForm.short_name.value}</p>
          <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
        </div>
        <div className="main_card">

          <GETTABLE funcGetRows={[...HTPPmass]}  //Регистрационные данные
            style={
              {
                tclass: "maininfo",
                captionStyle: { "color": "gold", "alignText": "center", }
              }
            }
            name={"Регистрационные данные:"} /> <br />
          <GETTABLE funcGetRows={[...getMassRows()]}  //Регистрационные данные
            style={
              {
                tclass: "maininfo",
                captionStyle: { "color": "gold", "alignText": "center", }
              }
            }
            name={"Сведения о государственной регистрации"} /> <br />

        </div>
      </div>
    </div>

  )

}

export default REGDATA;

/*{
      <tr>
        <td onClick={[...events]} style={[...сellsStyle]}> aaassss</td>
        <td style={{"color":"white"}}> bbbbbbb</td>
      </tr>}
          {/* {el.map((el,i)=>{return(
      <td key={i} style={{"color":"white"}}>el</td>
      )}) } }
      */