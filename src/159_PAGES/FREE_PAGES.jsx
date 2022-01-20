import React, { Fragment } from "react";
import { getEmpty } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import { NavLink } from "react-router-dom";
import s from "../CSS/freepages.module.css"




const FREE_PAGE = (props) => {




  const mainForm = props.mainForm
  if (!mainForm) { getEmpty('Нет данных') }

  const mass = props.mainForm.freeMass
  const id = props.id

  function DATA() {

    let obj = mass.filter(el=>el.id===id)[0] 

    const razdelName = obj.razdelName.toUpperCase() 
    const postHtml =   obj.postHtml
    const massList =   obj.massList
    const afterHtml =  obj.afterHtml
    const  maintext =   obj.lblcolor





    return (
      <Fragment>
        <div className={s.wrapper}>


          <div style={{background:maintext}} className={s.c_maintext}>
            <div className={s.maintext}> {razdelName} </div>
            <img style={{ height: '90px' }} src={"../img/close.png"} alt="Описание" />

          </div>


          <div className={s.postHtml}>{postHtml}</div>
          <div className="full" style={{
            position: 'relative'
            , padding: '8px'
            , minHeight: '600px'
          }}>

          
              <div className={s.ulRel}>
            <p className={s.textList} >

            На условиях платной подписки предоставляются  сведения:</p>

            {massList.length > 0 ? <ul className= {s.ulclass}>
              {massList.map((el, i) => <li key={i}><p>{el}</p></li>)}
            </ul> : null
            }
            </div>
               
            <div style={{ padding: '20px', color: "lightgreen" }}>{afterHtml}</div>

            <div style={{
              position: 'absolute'

              , bottom: '0px'
              , maxWidth: '100%'
              , maxHeight: '200px'
              , minHeight: '100px'
              , background: maintext
              , fontSize: '13px'
              , color: 'white'
              ,left:0
            }}>


              <div style={{ padding: '20px', position:'relative'  }} >
                <span style={{ marginRight: '5px' }}>Для получения информации по запросу полного доступа необходимо перейти по ссылке   </span>
                <span> <NavLink to='/'>Условия подключения</NavLink> </span>
              </div>

            </div>

          </div>
        </div>

      </Fragment >


    )
  }
  return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)

}

export default FREE_PAGE;




