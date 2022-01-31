
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import MAIN_CARD from "../JS/MAIN_CARD";
import { getRows } from "../JS/properties";
import { getMassRows } from "../JS/properties";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";







const BANCRUPT= ({mainForm})=>{

// ДАННЫЕ
let massBancrot= []
let massCases = []
  if (mainForm && mainForm.massBancrupt &&  mainForm.massBancrupt.length>0 )  
  {

  massBancrot = mainForm.massBancrupt.filter(el=>el.sort === 'BANCRUPT_INFO')
  mainForm.massBancrupt.filter(el=>el.sort === 'CASE_INFO').forEach
  (el => {
    
    let mass = []
   
    if (el.isapplicantcreditorg) {mass.push('Конкурсный кредитор является кредитной организацией')}
    if (el.isapplicantcreditorg===false) {mass.push('Конкурсный кредитор не является кредитной организацией')}
    if (el.isliabilitysecured) {mass.push('Требование обеспечено залогом')}
    if (el.isliabilitysecured ===false) {mass.push('Требование не обеспечено залогом')}
    if (el.isliabilitysecured ===null) {mass.push('Требование обеспечения залогом - не используется в данном случае')}

    massCases.push([
       el.casenumber
       ,el.court
      ,el.applicanttype
      ,el.datecreate
      , <ul> {mass.map ((el,i)=>
      {
        return <li key={i}>{el}</li>   
      }
      
      )}
      </ul>
    
    ])  
  });

  massCases.unshift(['Номер дела','Суд', 'Тип','Дата создания дела','Доп. информация'
,

])


  console.log(massCases)

//7728569814
// компонента отображения 
function DATA () { 
 return ( <> 
       <ZAGOLOVOK text = {'Сведения о банкротных делах'}/>  <br/>
      <div style={{fontSize:'12px',"color":"gold", "padding":"5px", "margin":"0","textAlign":"left" , fontWeight:"500"}}>
  Общая информация о банкроте
    </div>

        <GETTABLE key={0} funcGetRows={  getRows(
          [[`Категория банкрота`,`${massBancrot[0].category}`] ,
          [`Последняя активность (дата последнего сообщения по теме банкротства) `,`${massBancrot[0].lastmessagedate}`],
          [`Регион  должника `,`${massBancrot[0].region}`]
         ]
          ) } style={{tclass: ['tblString'],}} /> <br/>

<div style={{fontSize:'12px',"color":"gold", "padding":"5px", "margin":"0","textAlign":"left" , fontWeight:"500"}}>
  Информация о делах
    </div>

        <GETTABLE key={1} funcGetRows={[...getMassRows(massCases)]}  //
            style={{
                tclass: ["mtbl"],
                captionStyle: {"paddingBottom":"10px", "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Побочная деятельность"}
            endtbl = {true}
            />

      </>
    )
  }
return(
    <Fragment >
        <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} />                   
    </Fragment>
      )
}
} 

export default BANCRUPT;




