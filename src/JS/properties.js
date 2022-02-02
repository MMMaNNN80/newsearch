import { getConnection } from "./connection";
import { getOBJpublic } from "./MAPPING_SQL";
import React, { Fragment } from "react";
import { getResponsePg } from "./connection";
import { writeExcelJS } from "./excelwriter";


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

export function getRows(mass = [], tdStyles = {}) {
  let masshttp = []



  for (let i = 0; i < mass.length; i++) {
    masshttp.push(

      <tr key={i} style={{}}>
        <th style={{}} scope="row"><span>{mass[i][0]}</span></th>
        <td style={{ ...mass[i][3] }}><span style={{ ...tdStyles }}>{mass[i][1]}</span></td>
      </tr>
    )
  } return masshttp
}
export function getMassRows(mass = [], ishead = true, styles = {}) {
  let m = []

  mass.forEach((el, i) => {

    m.push(
      <Fragment key={i}>
        <tr key={i} style={styles}>
          {
            [...el.map((el, x) => {

              return (
                <Fragment key={x}>

                  {i === 0 && ishead ?
                    <th key={x} style={{ alignText: "left" }}>{el}</th> :

                    <td key={x} >
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

  const style =  mainForm.isacting ===1 ? { width:'10px',height:'10px',background: 'green' } : {width:'10px', height:'10px',background: 'red' } 

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

export const getDetailzakupki_ejs = async (inn, year = 2020, x, fz = 44, hbgColor, htextcolor) => {
  //console.log(inn,year,44)
  const workSheetName = [`${fz}-ФЗ_${inn}_${year}`];
  const filePath = `${fz}_${inn}_${year}.xlsx`
  let workSheetColumnNames = []

  if (fz === 44) {
    workSheetColumnNames =
      [
        { header: "ФЗ", key: 'src', width: 5 },
        { header: "Год", key: 'year_', width: 5 },
        { header: "Роль", key: 'sort', width: 15 },
        { header: "Рег номер тендера", key: 'regnum', width: 20 },
        { header: "Номер договора", key: 'contract_number', width: 10 },
        { header: 'ИНН заказчика', key: 'customer_inn', width: 10 },
        { header: 'КПП заказчика', key: 'customer_kpp', width: 10 },
        { header: 'Полное наименование заказчика', key: 'customer_fullname', width: 30 },
        { header: 'Финансовый ресурс', key: 'financesource', width: 5 },
        { header: 'Стоимость контракта', key: 'price', width: 15 },
        { header: 'Дата подписания', key: 'signdate', width: 15 },
        { header: 'Дата публикации', key: 'publishdate', width: 15 },
        { header: 'Предмет контракта', key: 'products', width: 20 },
        { header: 'Тип участника (Поставщик)', key: 'participanttype', width: 5 },
        { header: 'Наименование поставщика', key: 'name', width: 20 },
        { header: 'ИНН поставщика', key: 'inn', width: 10 },
        { header: 'КПП поставщика', key: 'kpp', width: 10 },
        { header: 'Факт. адрес поставщика', key: 'fact_address', width: 20 },
        { header: 'Телефоны поставщика', key: 'phones', width: 20 },
        { header: 'Ссылка на сайт', key: 'href', width: 40 }
      ]

  }
  if (fz === 223) {
    workSheetColumnNames =
      [
        { header: "ФЗ", key: 'src', width: 5 },
        { header: "Год", key: 'year_', width: 5 },
        { header: "Роль", key: 'sort', width: 15 },
        { header: "Рег номер тендера", key: 'regnum', width: 20 },
        { header: "Стоимость контракта", key: 'price', width: 20 },
        { header: 'Краткое наименование заказчика', key: 'customer_shortname', width: 30 },
        { header: "Номер договора", key: 'contract_number', width: 10 },
        { header: "Способ закупки", key: 'purchasetypeinfo', width: 15 },
        { header: "ИКО заказчика", key: 'iko', width: 15 },
        { header: 'ИНН заказчика', key: 'customer_inn', width: 10 },
        { header: 'КПП заказчика', key: 'customer_kpp', width: 10 },
        { header: 'Телефоны заказчика', key: 'customer_phone', width: 10 },
        { header: 'ОКПО заказчика', key: 'customer_okpo', width: 10 },
        { header: 'Предмет контракта', key: 'subjectcontract', width: 20 },
        { header: 'Статус', key: 'status', width: 20 },
        { header: 'Дата публикации', key: 'publicationdatetime', width: 15 },
        { header: 'Дата контракта', key: 'contractdate', width: 15 },
        { header: 'Дата рег-ции заказчика', key: 'customerregistrationdate', width: 10 },
        { header: 'Дата начала исполнения контракта', key: 'startexecutiondate', width: 10 },
        { header: 'Дата окончания исполнения контракта', key: 'endexecutiondate', width: 10 },
        { header: 'Полное наименование поставщика', key: 'name', width: 10 },
        { header: 'Краткое наименование поставщика', key: 'shortname', width: 10 },
        { header: 'ИНН поставщика', key: 'inn', width: 10 },
        { header: 'КПП поставщика', key: 'kpp', width: 10 },
        { header: 'ОКПО поставщика', key: 'okpo', width: 10 },
        { header: 'Дата рег-ции поставщика', key: 'registrationdate', width: 10 },
        { header: 'ОКТМО поставщика', key: 'oktmo', width: 10 },
        { header: 'Адрес поставщика', key: 'address', width: 10 },
        { header: 'Телефоны поставщика', key: 'phones', width: 10 },
        { header: 'Провайдер', key: 'provider', width: 10 },
        { header: 'Не резидент', key: 'nonresident', width: 10 },
        { header: 'Субконтракт', key: 'subcontractor', width: 10 },
        { header: 'Индивидуал', key: 'individual', width: 10 },
        { header: 'Ссылка на сайт', key: 'href', width: 10 }
      ]
  }


  workSheetColumnNames.map(el => {
    return {
      ...el, style: {
        font: {
          size: 10,
        }
      }
    }
  }
  )
  workSheetColumnNames = [[...workSheetColumnNames]]


  try {
    if (inn) {
      let obj = getParamsObj()
      obj.inn = inn
      obj.fields = "*"
      obj.table = `goszakupkiexcel_dinamic('${inn}','${year}',${x},'${fz}')`
      obj.host = '/159'
      obj.dopSql = ''
      await getResponsePg(obj)
        .then(mass => {
          let data = []

          mass.forEach(el => {
            if (fz === 223) {
              data.push(
                {
                  src: el.src,
                  year_: el.years,
                  sort: el.sort,
                  regnum: el.regnum,
                  price: el.price,
                  customer_shortname: el.customer_shortname,
                  contract_number: el.contract_number,
                  purchasetypeinfo: el.purchasetypeinfo,
                  iko: el.iko,
                  customer_inn: el.customer_inn,
                  customer_kpp: el.customer_kpp,
                  customer_phone: el.customer_phone,
                  customer_okpo: el.customer_okpo,
                  subjectcontract: el.subjectcontract,
                  status: el.status,
                  publicationdatetime: el.publicationdatetime,
                  contractdate: el.contractdate,
                  customerregistrationdate: el.customerregistrationdate,
                  startexecutiondate: el.startexecutiondate,
                  endexecutiondate: el.endexecutiondate,
                  name: el.name,
                  shortname: el.shortname,
                  inn: el.inn,
                  kpp: el.kpp,
                  okpo: el.okpo,
                  registrationdate: el.registrationdate,
                  oktmo: el.oktmo,
                  address: el.address,
                  phones: el.phones,
                  provider: el.provider,
                  nonresident: el.nonresident,
                  subcontractor: el.subcontractor,
                  individual: el.individual,
                  href: { text: 'ссылка на тендер', hyperlink: el.href }
                }
              );
            }
            if (fz === 44) {
              data.push(
                {
                  src: el.src,
                  year_: el.years,
                  sort: el.sort,
                  regnum: el.regnum,
                  contract_number: el.contract_number,
                  customer_inn: el.customer_inn,
                  customer_kpp: el.customer_kpp,
                  customer_fullname: el.customer_fullname,
                  financesource: el.financesource,
                  price: el.price,
                  signdate: el.signdate,
                  publishdate: el.publishdate,
                  products: el.products,
                  participanttype: el.participanttype,
                  name: el.name,
                  inn: el.inn,
                  kpp: el.kpp,
                  fact_address: el.fact_address,
                  phones: el.phones,
                  href: { text: 'ссылка на тендер', hyperlink: el.href }
                }
              );

            }


          }); data = [[...data]]; return data;
        })
        .then(data => { writeExcelJS(data, workSheetColumnNames, workSheetName, filePath, hbgColor, htextcolor) })
    }

  } catch (error) {
    alert('Системные ошибки, обратитесь к разработчику (getDetailzakupki) ')
  }
}


export const getDetailArbitr_ejs = async (inn, obj, hbgColor, htextcolor) => {


  const year = (obj.val && obj.val !== 'Все') ? obj.val : null
  const part = (obj.part && obj.part !== 'Все') ? obj.part : null
  const category = (obj.category && obj.category !== 'Все') ? obj.category : null


  const workSheetName = [`Дела`, `Участники_${year}`];
  const filePath = `${inn}_${year}.xlsx`
  let workSheetColumnNames = []
  let data2 = []
  workSheetColumnNames.push(
    [
      { header: "Номер дела", key: 'case_numberl', width: 10 },
      { header: "Дата начала дела", key: 'date_start', width: 10 },
      { header: "Дата обновления по делу", key: 'date_update', width: 10 },
      { header: "Категория", key: 'category_name', width: 30 },
      { header: "Инстанция", key: 'instance', width: 20 },
      { header: 'Сумма по делу', key: 'sum', width: 20 },

    ])

  workSheetColumnNames.push(
    [
      { header: "X", key: 'is_', width: 5 },
      { header: "Номер дела", key: 'case_numberl', width: 10 },
      { header: "Тип дела", key: 'type_p', width: 10 },
      { header: "Дата начала дела", key: 'date_start', width: 10 },
      { header: "Дата обновления по делу", key: 'date_update', width: 10 },
      { header: "Категория", key: 'category_name', width: 20 },
      { header: "ИНН участника", key: 'inn', width: 20 },
      { header: "ОГРН участника", key: 'ogrn', width: 15 },
      { header: "Наименование участника", key: 'name_p', width: 30 },
      { header: "Инстанция", key: 'instance', width: 20 }

    ])

  try {
    if (inn) {
      let obj = getParamsObj()
      obj.inn = inn
      obj.fields = "*"
      obj.table = `f_getarbitrdetailExcel('${inn}',` + (year ? `'${year}'` : 'null') + ',' + (part ? `'${part}'` : 'null') + ',' + (category ? `'${category}'` : 'null') + ')'
      obj.host = '/159'
      obj.dopSql = ''
      await getResponsePg(obj)
        .then(mass => {

          let data = []
          // console.log(mass)
          mass.filter(el => el.sort === `CASES`).forEach(el => {

            data.push(

              {
                case_numberl: { text: el.case_numberl, hyperlink: el.case_href }
                , date_start: el.date_start
                , date_update: el.date_update
                , category_name: el.category_name
                , instance: el.instance
                , sum: el.sum

              })
          })

          mass.filter(el => el.sort === `participants`).forEach(el => {

            data2.push(

              {
                is_: el.is_
                , case_numberl: { text: el.case_numberl, hyperlink: el.case_href }
                , type_p: el.type_p
                , date_start: el.date_start
                , date_update: el.date_update
                , category_name: el.category_name
                , inn: el.inn
                , ogrn: el.ogrn
                , name_p: el.name_p
                , instance: el.instance

              }

            )
          })
          data = [[...data], [...data2]]
          return data
        }).then(data => {
          //console.log(data,workSheetColumnNames,filePath)

          writeExcelJS(data, workSheetColumnNames, workSheetName, filePath, hbgColor, htextcolor)
        })
    }
  }

  catch (error) {
    alert('Системные ошибки, обратитесь к разработчику (getDetailzakupki) ')
  }
}

export function getQuadr(txt, class_ = 'quadr') {
  return (
    <span>
      <div className={class_} style={{ "display": "inline-flex" }}></div>
      <div style={{ "display": "inline" }}>{txt}</div>
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
