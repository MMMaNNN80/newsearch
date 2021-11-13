

import { getOBJpublic } from "../JS/MAPPING_SQL"





const CDI_CARD = ({objState})=>{
  
    //что бы рендер компонента был 1 раз
    //console.log(objState)
    let mainForm = getOBJpublic()

 

     mainForm.full_name.value = ( objState[0].data && objState[0].data.name.full_with_opf) ?  objState[0].data.name.full_with_opf : ''
     mainForm.short_name.value = ( objState[0].data && objState[0].data.name.short_with_opf)? objState[0].data.name.short_with_opf : ''
     mainForm.name_eng.value=( objState[0].data && objState[0].data.name.latin)? objState[0].data.name.latin :''
     mainForm.date_first_reg.value= ( objState[0].data && objState[0].data.state.registration_date)? objState[0].data.state.registration_date:''
     mainForm.ogrn.value = ( objState[0].data && objState[0].data.ogrn)? objState[0].data.ogrn:''
     mainForm.ogrn_date.value= ( objState[0].data && objState[0].data.ogrn_date)? objState[0].data.ogrn_date :''
     mainForm.inn.value= (objState[0].data && objState[0].data.inn)? objState[0].data.inn :''
     mainForm.kpp.value= (objState[0].data && objState[0].data.kpp) ? objState[0].data.kpp:''
     mainForm.okopf.value=  (objState[0].data && objState[0].data.okato) ? objState[0].data.okato:''
     mainForm.okato_code.value=(objState[0].data && objState[0].data.okopf) ? objState[0].data.okopf:''
     mainForm.okfs.value =  (objState[0].data && objState[0].data.okfs) ? objState[0].data.okfs:''
     mainForm.okpo.value =(objState[0].data && objState[0].data.okpo) ? objState[0].data.okpo :''
     mainForm.oktmo.value= (objState[0].data && objState[0].data.oktmo) ? objState[0].data.oktmo:''
     mainForm.okved_code.value= (objState[0].data && objState[0].data.okved) ? objState[0].data.okved:''
     mainForm.type.value =  (objState[0].data && objState[0].data.type) ? objState[0].data.type:''
     mainForm.branch_type.value =(objState[0].data && objState[0].data.branch_type) ?  objState[0].data.branch_type:''
     mainForm.capital.value = (objState[0].data && objState[0].data.capital) ? objState[0].data.capital:''
     mainForm.documents.value = (objState[0].data && objState[0].data.documents) ? objState[0].data.documents:''
     mainForm.email.value=(objState[0].data && objState[0].data.emails) ? objState[0].data.emails:''
     mainForm.debt.value= ( objState[0].data.finance && objState[0].data.finance.debt) ?  objState[0].data.finance.debt:''
     mainForm.expense.value = (objState[0].data.finance) ? objState[0].data.finance.expense:''
     mainForm.income.value = (objState[0].data.finance)? objState[0].data.finance.income:''
     mainForm.penalty.value = (objState[0].data.finance)?objState[0].data.finance.penalty:''
     mainForm.tax_system.value=(objState[0].data.finance)? objState[0].data.finance.tax_system:''
     mainForm.address.value = (objState[0].data && objState[0].data.address) ? objState[0].data.address.unrestricted_value:''
     mainForm.status.value = (objState[0].data && objState[0].data.state) ? objState[0].data.state.status:''
     mainForm.hid.value = (objState[0].data && objState[0].data.hid) ? objState[0].data.hid:''
     mainForm.leader_disq.value = (objState[0].data && objState[0].data.management &&  objState[0].data.management.disqualified ) ? objState[0].data.management.disqualified:''
     mainForm.leader.value= (objState[0].data && objState[0].data.management &&  objState[0].data.management.name ) ? objState[0].data.management.name:''
     mainForm.leader_post.value= (objState[0].data && objState[0].data.management &&  objState[0].data.management.post ) ? objState[0].data.management.post:''
     mainForm.count_sugg.value= objState[0].count
     mainForm.request.value =  objState[0].req

              
return (

  <div className="form" style = {{}}>
    <div className="lblCard">
      <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
      <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
      <p className="sh_name">{mainForm.short_name.value}</p>
      <p className="c_source"> источник {"CDI"}</p>
    </div>

    <div className="main_card">


      <table className="maininfo">
        <caption align="top" style={{ "color": "rgb(130, 202, 130)", "alignText": "center" }}> Основная информация:</caption>

        <tbody>
          <tr>
            <th scope="row">{mainForm.full_name.name}</th>
            <td className="fn" style={{}}><b>{mainForm.full_name.value}</b></td>
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
            <td>{mainForm.status.value === 'ACTIVE' ?
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
            <td>{mainForm.leader_post.value + '  ' + mainForm.leader.value}</td>
          </tr>

        </tbody>


      </table>
      <br />
      <TCONTACT />

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
      </tr> 
      )
  
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