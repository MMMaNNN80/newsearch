import { getConnection } from "./connection";
import { getOBJpublic } from "./MAPPING_SQL";
import React, { Fragment } from "react";


export async function getResponse(e) {
  if (e.target.value) {
    let response = await getConnection(e.target.value);
    if (response) {
      response.suggestions.map(el => {
        el.req = e.target.value;
        el.count = response.suggestions.length;
        return el;

      })

      return response;
    }
    return null;
  }
}

export function getRows(mass = [], thStyles = {},tdStyles = {}) {
  let masshttp = []

for (let i = 0; i < mass.length; i++) {
    masshttp.push(

      <tr key={i} style={{tdStyles}}>
        <th style={thStyles} scope="row"><span>{mass[i][0]}</span></th>
        <td style={{ ...mass[i][3] }}><span style={{ ...tdStyles }}>{mass[i][1]}</span></td>
      </tr>
    )
  } return masshttp
}


export function getMassRows(mass = [], ishead = true,thStyles={},tdStyles = {}) {
  let m = []

  mass.forEach((el, i) => {

    m.push(
      <Fragment key={i}>
        <tr key={i} >
          {
            [...el.map((el, x) => {

              return (
                <Fragment key={x}>

                  {i === 0 && ishead ?
                    <th key={x} style={{ alignText: "left", ...thStyles }}>{el}</th> :

                    <td  style={{ alignText: "left", ...tdStyles }} key={x} >
                      <span>{el}</span>
                    </td>
                  }
                </Fragment>
              )
            })]}
        </tr>
      </Fragment>
    )
  }
  )
  return m
}

export function getMassForm(server = "159", form = "OSN", mainForm = getOBJpublic()) {
  let mass = []
  //---Основное меню
  let style = {width:'10px', height:'10px',background: 'red' };
  if (mainForm.isacting ===1 && mainForm.status.value.includes('ликвид' || 'банкрот') ) 
  {style= {width:'10px', height:'10px',background: 'orange' }}

  if (mainForm.isacting ===1  && !mainForm.status.value.includes('ликвид' || 'банкрот')) {style= {width:'10px', height:'10px',background: 'green' }}


  if (server === "159") { mass.push([mainForm.dataport_id.name, mainForm.dataport_id.value, 'OSN', { "color": "lightgreen" }]) }
  if (server === "151") { mass.push([mainForm.sparkid.name, mainForm.sparkid.value, 'OSN', { "color": "cyan" }]) }
  if (server === "151") { mass.push([mainForm.full_name.name, mainForm.full_name.value, 'OSN', { "color": "lightgreen", "fontSize": "16px", "fontWeight": "700", "padding": "10px" }]) }
  if (server === "159") { mass.push([mainForm.full_name.name, mainForm.full_name.value, 'OSN', { "color": "gold", "fontSize": "16px", "fontWeight": "700", "padding": "10px" }]) }

 
  //mass.push([mainForm.name_eng.name, mainForm.name_eng.value, 'OSN',{}])


  mass.push([mainForm.date_first_reg.name,
  mainForm.massRegistr && mainForm.massRegistr[0].regdate
    ? mainForm.massRegistr[0].regdate : '', 'OSN', {}])
  mass.push([mainForm.inn.name, mainForm.inn.value, 'OSN', {}])
  mass.push([mainForm.kpp.name, mainForm.kpp.value, 'OSN', {}])
  mass.push([mainForm.ogrn.name, mainForm.ogrn.value, 'OSN', {}])


  mass.push([mainForm.okopf.name, mainForm.okopf.value, 'OSN', {}])
  mass.push([mainForm.okved_name.name, mainForm.okved_code.value + ' ' + mainForm.okved_name.value, 'OSN', {}])
  mass.push([mainForm.capital.name, mainForm.capital.value, 'OSN', {}])
  mass.push([mainForm.status.name, 
    mainForm.isacting ? <span style={{display:'flex'}}>
          <div className="quadr" style={style}></div>
          <div style={{ "display": "inline-flex"}}>{mainForm.status.value}</div>

  </span> : mainForm.status.value
     , 'OSN', {}])
  mass.push([mainForm.leader.name, mainForm.leader.value, 'OSN', {}])

  //--------Контакты
  mass.push(([mainForm.address.name, mainForm.address.value, 'CONT', {}]))
  mass.push(([mainForm.phones.name, mainForm.phones.value, 'CONT', {}]))
  mass.push(([mainForm.phone_parsed.name, mainForm.phone_parsed.value, 'CONT', {}]))
  mass.push(([mainForm.email.name, mainForm.email.value, 'CONT', {}]))
  mass.push(([mainForm.web.name, mainForm.web.value, 'CONT', {}]))




  mass = mass.filter(el => el[2] === form)
  ///console.log(mass)

  mass = getRows(mass)


  return mass   // 
}

export const getParamsObj = () => {
  const obj = {
    fields: "*",
    scheme: "EXTREP_MDM",
    table: "EXTENDEDREPORT",
    dopSql: "LIMIT 1",
    host: "/post"
  }
  return obj;
}

export const getEmpty = (text) => {
  return (
    <>
      <div
        style={{
          color: 'white', fontSize: "12px"
          , marginTop: '10px', opacity: '0.7'
          , textAlign: "center"
        }}>{text}</div>
    </>
  )
}


export const getfzCard = () => {
  return (
    <>
      <div className="FzCardsGrid" >

        <div className="FZCard" style={{}}>

          <div className="fzregData">
            <div className=""
              style={{ fontSize: '18px', fontWeight: '700' }}>№ 52801247050200000170000</div>

            <div className="fztextblock">
              <div className="fzheads">Контракт</div>
              <div className="fztxt">№ 527</div>
            </div>

            <div className="fztextblock ">
              <div className="fzheads">Поставщики</div>
              <div className="contscroll_post">
                <div className="fzintxt">МУНИЦИПАЛЬНОЕ КАЗЁННОЕ УЧРЕЖДЕНИЕ "ЦЕНТР ОРГАНИЗАЦИИ ЗАКУПОК" ГОРОДА ЧЕБОКСАРЫ</div><hr />
                <div className="fzintxt">МУНИЦИПАЛЬНОЕ КАЗЁННОЕ УЧРЕЖДЕНИЕ "ЦЕНТР ОРГАНИЗАЦИИ ЗАКУПОК" ГОРОДА ЧЕБОКСАРЫ</div><hr />
                <div className="fzintxt">МУНИЦИПАЛЬНОЕ КАЗЁННОЕ УЧРЕЖДЕНИЕ "ЦЕНТР ОРГАНИЗАЦИИ ЗАКУПОК" ГОРОДА ЧЕБОКСАРЫ</div><hr />
              </div>
            </div>
            <div className="fztextblock">
              <div className="fzheads">Объекты закупки</div>
              <div className="contscroll_subj">
                <div className="fzzak">
                  <div className="fzintxt">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, odio? Perferendis, neque praesentium non deleniti voluptatibus ullam soluta nam rem modi provident voluptate consequatur labore sapiente ipsam, delectus obcaecati numquam.</div>

                </div>
              </div>
            </div>

          </div>

          <div className="fzdateinfo">

            <div className="fztextblock">
              <div className="fzheads">Статус</div>
              <div className="fztxt">Исполнение</div>
            </div>

            <div className="fztextblock">
              <div className="fzheads">Цена контракта</div>
              <div className="fztxt">19 605 082,50 ₽</div>
            </div>
            <div className="fztextblock">
              <div className="fzheads">Заключение контракта</div>
              <div className="fztxt">12.11.2021</div>
            </div>
            <div className="fztextblock">
              <div className="fzheads">Срок исполнения</div>
              <div className="fztxt">12.10.2021</div>
            </div>
            <div className="fztextblock">
              <div className="fzheads">Размещен контракт в реестре</div>
              <div className="fztxt">12.10.2021</div>
            </div>
          </div>

        </div>


      </div>
    </>
  )
}



export function getQuadr(txt=null, style = {}) {
  return (
    <span>
      <div style={{ "display": "inline-flex",background:'green',...style}}></div>
      {txt? <div style={{ "display": "inline" }}>{txt}</div> :null}
    </span>
  )
}

export function getNavMenuMass(type = 'UL', inn) {
  let mass = []
  
  if (type === 'UL') {
    mass = [
      { id: 0, name: `Основная информация`, isCom: false, type: 'div', path: null }
      , { id: 1, name: `Карточка компании`, isCom: false, type: 'nav', path: `/${inn}` }
      , { id: 2, name: `Регистрационные данные`, isCom: false, type: 'nav', path: `regdata/${inn}` }
      , { id: 3, name: `Виды экономической деятельности`, isCom: false, type: 'nav', path: `/okveds/${inn}` }
      , { id: 4, name: `Телефоны и Адреса`, isCom: true, type: 'nav', path: `/info/${inn}` }
      , { id: 5, name: `История изменений`, isCom: true, type: 'nav', path: `/changescompany/${inn}` }
      , { id: 6, name: `Структура компании`, isCom: false, type: 'div', path: null }
      , { id: 7, name: `Органы управления`, isCom: true, type: 'nav', path: `/leaders/${inn}` }
      , { id: 8, name: `Совладельцы`, isCom: true, type: 'nav', path: `/cowners/${inn}` }
      , { id: 9, name: `Структура (развернуто)`, isCom: true, type: 'nav', path: `/openstruct/${inn}` }
      , { id: 10, name: `Деятельность компании`, isCom: false, type: 'div', path: null }
      , { id: 11, name: `Баланс и отчет о финансовых результатах`, isCom: true, type: 'nav', path: `/finstr/${inn}` }
      , { id: 12, name: `Участие в Госконтрактах`, isCom: true, type: 'nav', path: `/goszakupki/${inn}` }
      , { id: 13, name: `Сведения о банкротстве`, isCom: true, type: 'nav', path: `/bancrupt/${inn}` }
      , { id: 14, name: `Арбитражные дела`, isCom: true, type: 'nav', path: `/arbitr/${inn}` }
      , { id: 15, name: `Залоги`, isCom: true, type: 'nav', path: `/pledges_uk/${inn}` }
    ]
    return mass
  }
    
    if (type === 'IP') {
   
      mass = [
        { id: 0, name: `Основная информация`, isCom: false, type: 'div', path: null }
        , { id: 1, name: `Карточка компании`, isCom: false, type: 'nav', path: `/${inn}` }
        , { id: 77, name: `Сведения о банкротстве`, isCom: true, type: 'nav', path: `/ipbancrupt/${inn}` }
      ]
    return mass
  }

  return null



}

export function getMainText(text = '') {

  return (
    <div style={{ 
      fontSize: '12px',
       "color": "gold", 
       "padding": "5px", 
       "margin": "0", 
       "textAlign": "left"
       , fontWeight: "500" }}>
      {text}
    </div>
  )

}
