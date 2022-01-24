import { getResponsePg } from './connection'


export const getMainform = async (obj) => {
    let mainForm = getOBJpublic() 

    await getResponsePg(obj).then(mass => {
                
       
             
                let objX = mass // такое название объекта по имени процедуры
             
           

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
                mainForm.branches_count.value = (objX[0].branchs_count) ? objX[0].branchs_count : ''
               // ОКВЭД 2
                mainForm.massOkveds = objX.filter((el)=>el.src==='OKVED2')
                  // --Финансовая информация
                mainForm.massFinPok = objX.filter((el)=>el.src==='FinPok')
               //console.log(mainForm)

               // Регистрация
               mainForm.massRegistr = objX.filter((el)=>el.src==='REGISTR')
               // Фонды
               mainForm.massFonds = objX.filter((el)=>el.src==='FONDS')
               mainForm.massAddrHis = objX.filter((el)=>el.src==='ADDRESS_HIS')
               mainForm.massSUCCSPRED= objX.filter((el)=>el.src==='PREDSHESTV')
               mainForm.massLeadersHis= objX.filter((el)=>el.src==='LEADER_HIS')
               mainForm.massCOWSEGRUL= objX.filter((el)=>el.src==='EGRUL_COW')
               mainForm.massCOWSROSSTAT= objX.filter((el)=>el.src==='ROSSTAT_COWS')
               mainForm.massBranchesEgrul = objX.filter((el)=>el.src==='BRANCHES_EGRUL')
               mainForm.massBranchesRosstat = objX.filter((el)=>el.src==='BRANCHES_ROSSTAT')
               mainForm.massFinReport = objX.filter((el)=>el.src==='FIN_REPORT')
               mainForm.massFinReportCSV = objX.filter((el)=>el.src==='FIN_REPORT_CSV')
               mainForm.massFoundersOthers = objX.filter((el)=>el.src==='FOUNDERS_OTHERS')
               mainForm.massWorkersNumber = objX.filter((el)=>el.src==='WORKERS_NUMBER')
               mainForm.massPledgesUK = objX.filter((el)=>el.src==='PLEDGES_UK')
               
               mainForm.massPAOcows = objX.filter(el=>el.src==='COWS_PAO')
               //-----------На бесплатные версии
               mainForm.freeMass = 
               [
               {
                id:4 
               ,razdelName: 'Телефоны и Адреса'
               ,postHtml:'В данном разделе раскрыта информация о контактных данных компании' 
               , massList : ['Телефоны', 'Адресные данные']
               , afterHtml:''
               , lblcolor: 'rgb(93 12 221 / 48%)'
            }
            ,      {
                id:5 
               ,razdelName: 'История изменений'
               ,postHtml:'Информация о изменениях в компании с течением времени' 
               , massList : ['Предшественники', 'Преемники']
               , afterHtml:''
               , lblcolor: 'rgb(169 59 29)'
            }
            ,
                 {
                id:7 
               ,razdelName: 'Органы управления'
               ,postHtml:'Информация о руководителях компании' 
               , massList : ['Информация о текущем руководителе', 
                             'Информация о прошлых руоководителях',
                             'Информация о возможной дисквалификации руководителей'
            ,                'Информация о предоставлении некорректных данных, по данным ФНС'
            ]
               , afterHtml:''
               , lblcolor: 'rgb(61 13 60)'
            },
            {
            id:8
            ,razdelName: 'Совладельцы'
            ,postHtml:'Информация о совладельцах компании' 
            , massList : ['Информация о совладении по данным ФНС', 'Информация о совладении по данным Росстат']
            , afterHtml:'Совладельцы могут быть представлены юридическими , физическими и иностранными лицами'
            , lblcolor: 'rgb(51 52 74)'
         },
         {
            id:9
            ,razdelName: 'Структура (развернуто)'
            ,postHtml:'Развернутая информация о структуре компании' 
            , massList : ['Информация о дочерних компаниях по данным ФНС и Росстат', 
            'Информация о филиалах и представительствах компании по данным Росстат и ФНС']
            , afterHtml:''
            , lblcolor: 'rgb(74 51 51)'
         },
         {
            id:11
            ,razdelName: 'Баланс и отчет о финансовых результатах'
            ,postHtml:'Представлены финансовые отчеты' 
            , massList : ['Баланс', 
            'Отчет о прибылях и убытках',
            'Отчетность банков и страховых организаций',
            'Экспорт в Excel',
            'Перечень предоставляемых отчетов увеличивается'
        ]
            , afterHtml:'Имеется возможность просматривать отчеты без скачивания'
            , lblcolor: 'rgb(14 84 34)'
         }
         ,

         {
            id:12
            ,razdelName: 'Участие в Госконтрактах'
            ,postHtml:'Собрана информация о возможном участии компании в госконтрактах' 
            , massList : [
            
            'Информация об участии в соответствии с ФЗ -44 и 223 (в качестве Заказчика и/или Поставщика)' ,
            'Данные за период о количестве тендеров, в которых участвовала компания', 
            'Возможность посмотреть количество и суммы контрактов в соответствующей валюте',
            'Предоставление ссылок на источник (сайт госзакупок) по конкретному тендеру на карточку тендера',
            'Экспорт в Excel детального отчета по тендерам'
        ]
            , afterHtml:'Подготовлена аналитика за 5 лет'
            , lblcolor: '#c02e23'
         }
         ,       
         {
            id:13
            ,razdelName: 'Арбитражные дела'
            ,postHtml:'Собрана информация о участии в арбитражных процессах' 
            , massList : [
                'Информация об участии в арбитражных процессах в текущем периоде' ,
                'Аналитка участия в арбитражных процессах по категориям и ролям',
                'Гибкая настройка фильтрации для экпорта данных',
                'Экспорт в Excel детального отчета по тендерам',
        ]
            , afterHtml:'Подготовлена аналитика за 5 лет'
            , lblcolor: '#4710d7'
         }
         ,       
         {
            id:14
            ,razdelName: 'Залоги'
            ,postHtml:'Информация о залоговых договорах' 
            , massList : [
                'Информация о залогах под уставной капитал (даты, номера докуметов, залогодержатели)',      
        ]
            , afterHtml:''
            , lblcolor: '#183f12'
         }
               ]
               
               
            
    })

    return mainForm 
}

export function getOBJpublic (p='UL') {
    if (p==='UL') {
    return  {
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
     rosstat_report_id: {name:  'Идентификатор отчета в Росстат на 159 сервере', value: ''},
     branches_count: {name:  'Количество филиалов', value: ''},
     
}
    }
    if (p==='IP') {
        return {
            dataport_id:{name:'dataport_id',value:''},
            sparkid: {name:'Sparkid (Идентификатор интерфакс)', value:''},
            okved_code:{name:'код ОКВЭД',value:''},
            okved_name:{name:'ОКВЭД',value:''},
            address: {name:  'Адрес', value: ''},
            citizenship_name: {name:  'Страна', value: ''},
            full_name: {name: 'ФИО', value: ''},
            name:{name: 'Наименование', value: '' },
            name_eng:{name:        'Наименование компании на английском языке',value: ''},
            date_first_reg:{name:  'Дата первой регистрации', value: ''},
            ogrn: {name:  'ОГРНИП', value: ''},
            ogrn_date: {name:  'Дата ОГРНИП', value: ''},
            inn: {name:  'ИНН', value:  ''},
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
            type: {name:  'Тип', value: ''},
            documents: {name: 'Документы', value: ''},
            email: {name: 'email', value: ''},
            phones:{name:"Телефон", value:''},
            phone_parsed: {name:"Телефоны после парсинга", value:''},
            web:{name:"Web",value:''},   
            sex: {name:  'Пол', value: ''},       
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
    }

}



