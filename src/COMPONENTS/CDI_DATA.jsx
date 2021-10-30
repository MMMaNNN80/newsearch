
//import {Pool} from 'pg'
//import { sql } from "../DB/db"

//import { useState } from "react"


const CDI_CARD = ({objState})=>{

    //console.log(objState)
    
    let mainForm = {
       full_name: {name:      'Полное наименование компании', value: ( objState[0].data && objState[0].data.name.full_with_opf) ?  objState[0].data.name.full_with_opf : ''},
       short_name:{name:      'Краткое наименование компании', value:  ( objState[0].data && objState[0].data.name.short_with_opf)? objState[0].data.name.short_with_opf : '' },
       name_eng:{name:        'Наименование компании на английском языке', value: ( objState[0].data && objState[0].data.name.latin)? objState[0].data.name.latin :''},
       date_first_reg:{name:  'Дата первой регистрации', value: ( objState[0].data && objState[0].data.state.registration_date)? objState[0].data.state.registration_date:''},
       ogrn: {name:  'ОГРН', value: ( objState[0].data && objState[0].data.ogrn)? objState[0].data.ogrn:''},
       ogrn_date: {name:  'Дата ОГРН', value: ( objState[0].data && objState[0].data.ogrn_date)? objState[0].data.ogrn_date :''},
       inn: {name:  'ИНН', value:  (objState[0].data && objState[0].data.inn)? objState[0].data.inn :''},
       kpp: {name:  'КПП', value: (objState[0].data && objState[0].data.kpp) ? objState[0].data.kpp:''},
       okopf: {name:  'ОКАТО', value:  (objState[0].data && objState[0].data.okato) ? objState[0].data.okato:''},
       okato: {name:  'ОКОПФ', value: (objState[0].data && objState[0].data.okopf) ? objState[0].data.okopf:''},
       okfs: {name:  'ОКФС', value: (objState[0].data && objState[0].data.okfs) ? objState[0].data.okfs:''},
       okpo: {name:  'ОКПО', value:  (objState[0].data && objState[0].data.okpo) ? objState[0].data.okpo :''},
       oktmo: {name:  'ОКТМО', value: (objState[0].data && objState[0].data.oktmo) ? objState[0].data.oktmo:''},
       okved_code: {name:  'ОКВЭД', value: (objState[0].data && objState[0].data.okved) ? objState[0].data.okved:''},
       type: {name:  'Тип организации', value:  (objState[0].data && objState[0].data.type) ? objState[0].data.type:''},
       branch_type:{name: 'Тип организации', value:  (objState[0].data && objState[0].data.branch_type) ?  objState[0].data.branch_type:''},
       capital: {name: 'Уставной капитал', value: (objState[0].data && objState[0].data.capital) ? objState[0].data.capital:''},
       documents: {name: 'Документы', value: (objState[0].data && objState[0].data.documents) ? objState[0].data.documents:''},
       email: {name: 'email', value: (objState[0].data && objState[0].data.emails) ? objState[0].data.emails:''},
       debt: {name: 'Дебет', value: ( objState[0].data.finance && objState[0].data.finance.debt) ?  objState[0].data.finance.debt:''},
       expense: {name: 'Расходы', value: (objState[0].data.finance) ? objState[0].data.finance.expense:''},
       income: {name: 'Доходы', value:  (objState[0].data.finance)? objState[0].data.finance.income:''},
       penalty: {name: 'Штрафы', value: (objState[0].data.finance)?objState[0].data.finance.penalty:''},
       tax_system :{name: 'Система налогооблажения', value:(objState[0].data.finance)? objState[0].data.finance.tax_system:''},
       address: {name:  'Адрес', value: (objState[0].data && objState[0].data.address) ? objState[0].data.address.unrestricted_value:''},
       status: {name:  'Статус', value: (objState[0].data && objState[0].data.state) ? objState[0].data.state.status:''},
       hid: {name:  'Гид ОРПОН', value:  (objState[0].data && objState[0].data.hid) ? objState[0].data.hid:''},
       leader_disq: {name:  'Дисквалификация', value:  (objState[0].data && objState[0].data.management &&  objState[0].data.management.disqualified ) ? objState[0].data.management.disqualified:''},
       leader: {name:  'Руководитель', value: (objState[0].data && objState[0].data.management &&  objState[0].data.management.name ) ? objState[0].data.management.name:''},
       leader_post: {name:  'Должность', value: (objState[0].data && objState[0].data.management &&  objState[0].data.management.post ) ? objState[0].data.management.post:''},
       count_sugg: {name:  'Количество подсказок', value: objState[0].count},
       request: {name:  'Запрос', value: objState[0].req},
       
          
    }




return (
  

<div className="spcard">
<div className="lblCard">
<img src="/icon/rtk-logo-desktop.png" alt="." style={{"height": "50px"}} /> 
  <h6 className="c_name" style={{ "alignText":"center"  }}> <small>КАРТОЧКА КОМПАНИИ:</small> <br/>   {mainForm.short_name.value}<br/> <small>по данным <b>{"CDI"} </b></small> </h6>
  </div>

<div className="main_card">


<table className="maininfo">
<caption align="top"  style={{"color": "rgb(130, 202, 130)", "alignText":"center"  }}> Основная информация:</caption>  

  <tbody>
    <tr>
      <th scope="row">{mainForm.full_name.name}</th>
      <td style={{"fontSize":"14px","padding":"2%" ,"color":"white"}}><b>{mainForm.full_name.value}</b></td>
    </tr>
    <tr>
      <th scope="row">{mainForm.name_eng.name}</th>
      <td>{mainForm.name_eng.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.date_first_reg.name}</th>
      <td>{new Date(mainForm.date_first_reg.value).toLocaleDateString('ru')}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.ogrn.name}</th>
      <td>{mainForm.ogrn.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.inn.name}</th>
      <td>{mainForm.inn.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.kpp.name}</th>
      <td>{mainForm.kpp.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.status.name}</th>
      <td>{mainForm.status.value ==='ACTIVE' ?
       'Действующее' : 'Ликвидировано'
}
       </td>
    </tr>
    <tr>
      <th scope="row">{mainForm.okopf.name}</th>
      <td>{mainForm.okopf.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.okved_code.name}</th>
      <td>{mainForm.okved_code.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.capital.name}</th>
      <td>{mainForm.capital.value}</td>
    </tr>
    <tr>
      <th scope="row">{mainForm.leader.name}</th>
      <td>{mainForm.leader_post.value +'  '+ mainForm.leader.value}</td>
    </tr>
    
  </tbody>
       
    
</table>   
<br/>
<TCONTACT/>

    </div>

</div>

)

function   TCONTACT ()  {
  
const massopen = () =>{
  let mass =[]
 mass.push([mainForm.address.name,mainForm.address.value])
 mass.push(['Телефон',''])
 mass.push([mainForm.email.name,mainForm.email.value])
 mass.push(['Web',''])

let massall = []
  for (let i = 0; i < mass.length; i++) { 
   
    massall.push  (
      <tr key={i}>
      <th scope="row">{mass[i][0]}</th>
      <td>{mass[i][1]}</td>
      </tr> )
  
}
      return massall
}
return (
  <table className="maininfo">
  <caption align="top"  style={{"color": "rgb(130, 202, 130)", "alignText":"center"  }}>
     Контакты</caption>  
  
    <tbody>
    {[...massopen()]}
    </tbody>    
  </table>   

)

} 


}


export default CDI_CARD;