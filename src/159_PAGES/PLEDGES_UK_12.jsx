
import React, { Fragment } from "react";
import GETTABLE from "../COMPONENTS/GETTABLE";
import MAIN_CARD from "../JS/MAIN_CARD";
import { getMassRows } from "../JS/properties";
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK";
import { getEmpty } from "../JS/properties";






const PLEDGES_UK = ({mainForm})=>{

// ДАННЫЕ
  let mass= []
  if (mainForm && mainForm.massPledgesUK &&  mainForm.massPledgesUK.length>0 )  
  mass.push([`Дата заключения договора`,`Дата регистрации`,`№ договора`, `Данные залогодержателя`,'Нотариус',`Сведения ГРН`])
  // console.log(mass)
  mainForm.massPledgesUK.forEach(el => {

  mass.push([el.doc_date,el.date_reg,el.contract_number,
    `ИНН: ${el.p_inn ? el.p_inn:''} \n ${el.pl_name}`,
    el.notarius,
    `${el.grn} от ${el.grn_date}` ])
})

// компонента отображения 
function DATA () { 
 return ( <> 
       <ZAGOLOVOK text = {'Сведения о залоговых обязательствах'}/>
     {mainForm.massPledgesUK.length>0 ? <GETTABLE funcGetRows={[...getMassRows(mass)]}  //Регистрационные данные
            style={{
                tclass: ["mtbl"],
                captionStyle: {"paddingBottom":"15px", "color": "lightblue", "alignText": "center","fontSize":"12px" }
              }}
            name={"Сведения об обременении доли в уставном капитале в форме договора залога по данным ЕГРЮЛ"}
            endtbl = {false} /> : getEmpty(`Отсутствуют сведения о залогах под уставной капитал`)}
      </>
    )
  }
return(
    <Fragment >
        <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={DATA} />                   
    </Fragment>
      )
}

export default PLEDGES_UK;




