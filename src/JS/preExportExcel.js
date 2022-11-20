 import { getParamsObj } from "./properties";
 import { getResponsePg } from "./connection";
import { writeExcelJS } from "./excelwriter";


export const getListWorkData_ejs = async (mass,UL, hbgColor, htextcolor) => {

const workSheetName = [!UL ? `Информация_ИП`:`Компании`];
 const filePath = `Списки_${mass.length}.xlsx`
 let workSheetColumnNames = []
if(!UL) {hbgColor='083e53'}

let data = []
if (UL) {
 workSheetColumnNames.push(
 [
   { header: "ИД ДАТАПОРТ", key: 'dataport_id', width: 10 },
   { header: "Статус", key: 'status_type', width: 60 },
   { header: "Дата статуса", key: 'status_date', width: 13 },
   { header: "Действующее", key: 'isacting', width: 10 },
   { header: "ИНН", key: 'inn', width: 13 },
   { header: "КПП", key: 'kpp', width: 13 },
   { header: "ОГРН", key: 'ogrn', width: 13 },
   { header: "ОКПО", key: 'okpo', width: 13 },
   { header: "ОКТМО", key: 'oktmo_code', width: 13 },
   { header: "Краткое наименование", key: 'shortnamerus', width: 60 },
   { header: "Полное наименование", key: 'fullnamerus', width: 60 },
   { header: "Код ОКВЭД", key: 'okved_code', width: 13 },
   { header: "ОКВЭД", key: 'okved', width: 13 },
   { header: "Уст.Капитал", key: 'chartercapital', width: 20 },
   { header: "Код региона", key: 'regioncode', width: 13 },
   { header: "Регион", key: 'regionname', width: 13 },
   { header: "Дата ликв ЕГРЮЛ", key: 'egrullikvidation', width: 13 },
   { header: "Дата перв рег-ии", key: 'datefirstreg', width: 13 },
   { header: "Кол-во филиалов", key: 'count_filials_egrul', width: 13 },
   { header: "Должность", key: 'position', width: 13 },
   { header: "ФИО", key: 'fio', width: 13 },
   { header: "Дата нач диск-ции", key: 'disq_begin_date', width: 13 },
   { header: "Дата оконч диск-ции", key: 'disq_end_date', width: 13 },
   { header: "Телефоны", key: 'phone_parsed', width: 13 },
   { header: "email", key: 'email', width: 13 },
   { header: "Фин период", key: 'period', width: 13 },
   { header: "Выручка (2110)", key: 'revenue2110', width: 13 },
   { header: "Прибыль/Убыток(2400)", key: 'pribil2400', width: 13 }
 ])

 mass.forEach(el => {

           data.push(
             { 
                dataport_id: el.dataport_id
               , status_type : el.status_type 
               , status_date : el.status_date 
               , isacting : el.isacting 
               , inn : el.inn 
               , kpp : el.kpp 
               , ogrn : el.ogrn 
               , okpo : el.okpo 
               , oktmo_code : el.oktmo_code 
               , shortnamerus : el.shortnamerus 
               , fullnamerus : el.fullnamerus 
               , okved_code : el.okved_code 
               , okved : el.okved 
               , chartercapital : el.chartercapital 
               , regioncode : el.regioncode 
               , regionname : el.regionname 
               , egrullikvidation : el.egrullikvidation 
               , datefirstreg : el.datefirstreg 
               , count_filials_egrul : el.count_filials_egrul 
               , position : el.position 
               , fio : el.fio 
               , disq_begin_date: el.disq_begin_date
               , disq_end_date : el.disq_end_date 
               , phone_parsed : el.phone_parsed 
               , email : el.email 
               , period : el.period 
               , revenue2110 : el.revenue2110 
               , pribil2400 : el.pribil2400 
                              
})
         }
        
         
         )
        }
        if(!UL) {
          workSheetColumnNames.push(
            [
              { header: "ИД ДАТАПОРТ", key: 'dataport_id', width: 10 },
              { header: "Наименование ИП", key: 'full_name_rus', width: 60 },
              { header: "Статус", key: 'status_text', width: 60 },
              { header: "Дата статуса", key: 'status_date', width: 13 },
              { header: "Действующее", key: 'isacting', width: 10 },
              { header: "ИНН", key: 'inn', width: 13 },
              { header: "ОГРНИП", key: 'ogrnip', width: 13 },
              { header: "Код ОКВЭД", key: 'okved_code', width: 13 },
              { header: "ОКВЭД", key: 'okved_name', width: 13 },
              { header: "Код региона", key: 'region_code', width: 13 },
              { header: "Местоположение", key: 'address', width: 43 }, 
              { header: "Дата регистрации", key: 'date_first_reg', width: 13 },   

            ]);
            mass.forEach(el => {

              data.push(
                { 
                   dataport_id: el.dataport_id
                  ,full_name_rus: el.full_name_rus
                  , status_text : el.status_text 
                  , status_date : el.status_date 
                  , isacting : el.isacting ? 'Действующий':'Ликвидированный' 
                  , inn : el.inn 
                  , ogrnip : el.ogrnip 
                  , okved_code : el.okved_code 
                  , okved_name : el.okved_name 
                  , region_code: el.region_code
                  , address: el.address
                  , date_first_reg: el.date_first_reg            
   })
            }
           
            
            )





        }
data= [[...data]]

    

       writeExcelJS(data, workSheetColumnNames, workSheetName, filePath, hbgColor, htextcolor)
   
 
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
        obj.table = `f_getarbitrdetailexcel('${inn}',` + (year ? `'${year}'` : 'null') + ',' + (part ? `'${part}'` : 'null') + ',' + (category ? `'${category}'` : 'null') + ')'
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


  export const getBancruptMessages_ejs = async (inn, mass, hbgColor, htextcolor) => {

 
  
  
      const workSheetName = [`Банкротные сообщения`];
      const filePath = `${inn}_.xlsx`
      let workSheetColumnNames = []
      let data = []

         workSheetColumnNames.push(
      [
        { header: "Номер банкротного дела", key: 'casenumber', width: 20 },
        { header: "Тип сообщений", key: 'message_type', width: 60 },
        { header: "Дата публикации", key: 'publish_date', width: 13 },
        { header: "Судебное решение", key: 'decisiontype_name', width: 35 },
        { header: "Дата судебного решения", key: 'decision_date', width: 20 },
        { header: 'Данные о публикующем', key: 'publisher', width: 45 },
        { header: 'Документ', key: 'doc_url', width: 30 }
  
      ])

              mass.forEach(el => {
    
                data.push(
    
                  { 
                      casenumber: el.casenumber
                    , message_type: el.message_type
                    , publish_date: el.publish_date
                    , decisiontype_name: el.decisiontype_name
                    , decision_date: el.decision_date
                    , publisher: el.publisher_inn + ' ' + el.publisher_name
                    , href: { text: el.doc_name, hyperlink: el.doc_url } 
    
                  })
              })
 data= [[...data]]

         
  
            writeExcelJS(data, workSheetColumnNames, workSheetName, filePath, hbgColor, htextcolor)
        
      
    }


  
  