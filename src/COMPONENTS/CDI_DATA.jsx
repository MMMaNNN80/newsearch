

const CDI_CARD = ({objState})=>{

    console.log(objState)

    let mainForm = {
       full_name: {name:      'Полное наименование компании', value: objState[0].data.name.full_with_opf },
       short_name:{name:      'Краткое наименование компании', value: objState[0].data.name.short_with_opf },
       name_eng:{name:        'Наименование компании на английском языке', value: objState[0].data.name.latin },
       date_first_reg:{name:  'Дата первой регистрации', value: objState[0].data.state.registration_date},
       ogrn: {name:  'ОГРН', value: objState[0].data.ogrn},
       ogrn_date: {name:  'Дата ОГРН', value: objState[0].data.ogrn_date},
       inn: {name:  'ИНН', value: objState[0].data.inn},
       kpp: {name:  'КПП', value: objState[0].data.kpp},
       okopf: {name:  'ОКАТО', value: objState[0].data.okato},
       okato: {name:  'ОКОПФ', value: objState[0].data.okopf},
       okfs: {name:  'ОКФС', value: objState[0].data.okfs},
       okpo: {name:  'ОКПО', value: objState[0].data.okpo},
       oktmo: {name:  'ОКТМО', value: objState[0].data.oktmo},
       okved_code: {name:  'ОКВЭД', value: objState[0].data.okved},
       type: {name:  'Тип организации', value: objState[0].data.type},
       branch_type:{name: 'Тип организации', value: objState[0].data.branch_type},
       capital: {name: 'Уставной капитал', value: objState[0].data.capital},
       documents: {name: 'Документы', value: objState[0].data.documents},
       email: {name: 'email', value: objState[0].data.emails},
       debt: {name: 'Дебет', value: (objState[0].data.finance.debt) ?  objState[0].data.finance.debt:''},
       expense: {name: 'Расходы', value: objState[0].data.finance.expense},
       income: {name: 'Доходы', value: objState[0].data.finance.income},
       penalty: {name: 'Штрафы', value: objState[0].data.finance.penalty},
       tax_system :{name: 'Система налогооблажения', value: objState[0].data.finance.tax_system},
       address: {name:  'Адрес', value: objState[0].data.address.unrestricted_value},
       status: {name:  'Статус', value: objState[0].data.state.status},
       hid: {name:  'Гид ОРПОН', value: objState[0].data.hid},
       leader_disq: {name:  'Дисквалификация', value: objState[0].data.management.disqualified},
       leader: {name:  'Руководитель', value: objState[0].data.management.name},
       leader_post: {name:  'Должность', value: objState[0].data.management.post},
       count_sugg: {name:  'Количество подсказок', value: objState[0].count},
       request: {name:  'Запрос', value: objState[0].req},
       
          
    }



return (

<div className="spcard">
    Карточка компании:  <b>{mainForm.short_name.value} </b> <br/>
    по данным CDI
     <br/>
    
<div className="main_card">
<table>
<caption align="top"> Основная информация:</caption>  

  <tbody>
    <tr>
      <th scope="row">{mainForm.full_name.name}</th>
      <td>{mainForm.full_name.value}</td>
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

    </div>


 
    {/* <pre>
    {JSON.stringify(mainForm,null,4)}
    </pre> */}

</div>




)


} 
export default CDI_CARD;