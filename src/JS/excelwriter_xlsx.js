import XLSX from 'xlsx'

export const writeExcelFile  = (data=[],workSheetColumnNames,workSheetName,filePath) =>
{
  
  if (data && data.length>0) {
    const workSheetData = [workSheetColumnNames, ...data]
   

    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);

    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
    XLSX.writeFile(workBook, filePath)

    // console.log(workSheetColumnNames);


  }
            
    }

    import { getResponsePg } from "./connection"
import { getParamsObj } from "./properties"


    //---ExcelJS

export const getDetailzakupki = async(inn, year=2020,fz = 44) => {
let sms =''
  //console.log(inn,year,44)
    const workSheetName = `${fz}_${inn}_${year}`;
    const filePath = `${fz}_${inn}_${year}.xlsx`
    const workSheetColumnNames = 
    [
        "ФЗ",
        "Год",
         "Рег номер тендера", 
         "Номер договора",
        'ИНН заказчика', 
        'КПП заказчика',
        'Полное наименование заказчика',
        'Финансовый ресурс',
        'Стоимость контракта',
        'Дата подписания',
        'Дата публикации',
        'Предмет контракта',
        'Тип участника (Поставщик)',
        'Наименование поставщика',
        'ИНН поставщика',
        'КПП поставщика',
        'Факт. адрес поставщика',
        'Телефоны поставщика',
        'Ссылка на сайт'
    ]

 
try {
  if(inn) {
    let obj =  getParamsObj()
    obj.inn = inn
    obj.fields = "*"
    obj.table = `goszakupkiexcel('${inn}',${year},${fz})`
    obj.host = '/159'
    obj.dopSql=''
   await getResponsePg(obj)
   .then(mass => 
       {   
           let data = []
          mass[0].goszakupkiexcel.forEach(el => {  
           data.push ([
                   el.src,
                   el.year_,
                   el.regnum,
                   el.contract_number,
                   el.customer_inn,
                   el.customer_kpp,
                   el.customer_fullname,
                   el.financesource,
                   el.price,
                   el.signdate,
                   el.publishdate,
                   el.products,
                   el.participanttype,
                   el.name,
                   el.inn,
                   el.kpp,
                   el.fact_address,
                   el.phones,
                   el.href
               ]);

       } );   return data })
   .then(mass =>{writeExcelFile(mass,workSheetColumnNames,workSheetName,filePath)})
   .then(sms='true')
 


//
}

  
} catch (error) {
  alert('Системные ошибки, обратитесь к разработчику (getDetailzakupki) ')
  
}

return sms

}