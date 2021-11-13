import { getResponsePg } from './connection'


export const getMainform = async (obj) => {
    let mainForm = getOBJpublic() 
    await getResponsePg(obj).then(mass => {
                
            
                let objX = mass[0].f_getforms; // такое название объекта по имени процедуры
            
                console.log("запрос к данным 159")
          
            
                //MAPPING с источника

                //MAPPING с источника
                //---ОСНОВНАЯ ИНФОРМАЦИЯ
                
                mainForm.report_id.value = objX[0].report_id
                mainForm.rosstat_report_id.value = objX[0].rosstat_report_id
                mainForm.dataport_id.value = objX[0].dataport_id
                mainForm.full_name.value = objX[0].fullnamerus
                mainForm.short_name.value = objX[0].shortnamerus
                mainForm.date_first_reg.value = objX[0].datefirstreg
                mainForm.ogrn.value = objX[0].ogrn
                mainForm.okpo.value = objX[0].okpo
                mainForm.inn.value = objX[0].inn
                mainForm.kpp.value = objX[0].kpp
                mainForm.oktmo.value = objX[0].oktmo_code
                // mainForm.okato_name.value = objX[0].okato
                // mainForm.okato.value = objX[0].okato_code
                mainForm.okfs.value =  objX[0].okfs
                mainForm.okfs_code.value =  objX[0].okfs_code
                mainForm.status.value = objX[0].status
                mainForm.okopf.value = objX[0].okopf
                mainForm.okogu_code.value = objX[0].okogu_code
                mainForm.okogu.value = objX[0].okogu
                mainForm.okved_name.value = objX[0].okved
                mainForm.okved_code.value = objX[0].okved_code
                mainForm.capital.value = objX[0].chartercapital
                mainForm.leader.value = objX[0].fio
                mainForm.leader_post.value = objX[0].position
            //
                mainForm.regauthorityFNS.value = objX[0].regauthority
                mainForm.regauthorityaddress.value = objX[0].regauthorityaddress

                //-----------------------КОНТАКТЫ-------------------------
                mainForm.address.value = objX[0].address 
                mainForm.email.value = (objX[0].email) ? objX[0].email : ''
                mainForm.phone_parsed.value = objX[0].phone_parsed
                mainForm.phones.value = (objX[0].phone) ? objX[0].phone : ''
             
               // ОКВЭД 2
                mainForm.massOkved = objX.filter((el)=>el.src==='OKVED2')
                  // --Финансовая информация
                mainForm.massFinPok = objX.filter((el)=>el.src==='FinPok')
               //console.log(mainForm)
    })
    localStorage.setItem('159',JSON.stringify(mainForm))


    return mainForm 
}


export function getOBJpublic () {
    let obj ={}
        obj= {
     dataport_id:{name:'dataport_id',value:''},
     sparkid: {name:'Sparkid (Идентификатор интерфакс)', value:''},
     okved_name:{name:'ОКВЭД',value:''},
     full_name: {name:      'Полное наименование компании', value: ''},
     short_name:{name:      'Краткое наименование компании', value: '' },
     name_eng:{name:        'Наименование компании на английском языке',value: ''},
     date_first_reg:{name:  'Дата первой регистрации', value: ''},
     ogrn: {name:  'ОГРН', value: ''},
     ogrn_date: {name:  'Дата ОГРН', value: ''},
     inn: {name:  'ИНН', value:  ''},
     kpp: {name:  'КПП', value: ''},
     okopf: {name:  'ОКОПФ', value:  ''},
     okopf_code: {name:  'ОКОПФ код', value:  ''},
     okato_code: {name:  'ОКАТО код', value:''},
     okato_name:{name:  'ОКАТО', value:''},
     okfs: {name:  'ОКФС', value: ''},
     okfs_code: {name:  'ОКФС (код)', value: ''},
     okpo: {name:  'ОКПО', value:  ''},
     okogu_code: {name:  'ОКОГУ код', value:  ''},
     okogu: {name:  'ОКОГУ', value: ''},
     oktmo:{name:  'ОКТМО', value: ''},
     okved_code: {name:  'ОКВЭД код', value: ''},
     okved: {name:  'ОКВЭД', value: ''},
     type: {name:  'Тип организации', value: ''},
     branch_type:{name: 'Тип организации', value: ''},
     capital: {name: 'Уставной капитал', value: ''},
     documents: {name: 'Документы', value: ''},
     email: {name: 'email', value: ''},
     phones:{name:"Телефон", value:''},
     phone_parsed: {name:"Телефоны после парсинга", value:''},
     web:{name:"Web",value:''},
     debt: {name: 'Дебет', value: ''},
     expense: {name: 'Расходы', value: ''},
     income: {name: 'Доходы', value:  ''},
     penalty: {name: 'Штрафы', value: ''},
     tax_system :{name: 'Система налогооблажения', value:''},
     address: {name:  'Адрес', value: ''},
     status: {name:  'Статус', value: ''},
     hid: {name:  'Гид ОРПОН', value:  ''},
     leader_disq: {name:  'Дисквалификация', value:  ''},
     leader: {name:  'Руководитель', value: ''},
     leader_post: {name:  'Должность', value: ''},
     count_sugg: {name:  'Количество подсказок', value: ''},
     request: {name:  'Запрос', value: ''},
     regauthorityFNS:{name:  'ФНС по месту регистрации', value: ''},
     regauthorityaddress:{name:  'Адрес ФНС по месту регистрации', value: ''},
     report_id: {name:  'Идентификатор отчета на 159 сервере', value: ''},
     rosstat_report_id: {name:  'Идентификатор отчета в Росстат на 159 сервере', value: ''}  
     
}
// if (src ==="FinPok"){
// obj=
// {
//     code: {name:  'Код финансового показателя', value: ''}, 
//     name: {name:  'Наименование финансового показателя', value: ''}, 
//     period: {name:  'Период сдачи отчетности', value: ''}, 
// }  
// if (src ==="OKVED2"){
//     obj=
//     {
//         code: {code:  'Код ОКВЭД', value: ''}, 
//         name: {name:  'Наименование ОКВЭД', value: ''}, 
//         value: {value:  'Период сдачи отчетности', value: ''} 
//     }  

// }
//     }
    return obj;
}