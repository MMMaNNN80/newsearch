import React from "react"
import ZAGOLOVOK from "../COMPONENTS/ZAGOLOVOK"
import GETTABLE from "../COMPONENTS/GETTABLE"
import { getRows } from "../JS/properties"
import MAIN_CARD from "../JS/MAIN_CARD"


const CARD159_IP = ({massIP}) => {

    if (!massIP.mass.length) {return null}
    const obj = massIP.mass[0].f_getformsip[0]

    console.log(obj)

    

return (
        <MAIN_CARD CHILDREN = {OSNCARD} name = {`ИП ${obj.fullnamerus}`}/>
    )

    function OSNCARD (){
        
        // `${}`
        
        
        return(
        <>   
         <ZAGOLOVOK text={'КАРТОЧКА ИНДИВИДУАЛЬНОГО ПРЕДПРИНИМАТЕЛЯ'}/>
         <br/>
         <ZAGOLOVOK text={'Основная информация'}/>

        <GETTABLE funcGetRows={  getRows(
          [
          [`dataport_id`,obj.dataport_id] ,
          [`Наименование`,`ИП ${obj.fullnamerus}`],
          [`ИНН`,obj.inn],
          [`ОГРНИП`,obj.ogrn],
          [`Основной ОКВЭД`,obj.okved_code + '  ' + obj.okved],
          [`Место расположения`,  obj.address],
          [`Дата первой регистрации`,  obj.datefirstreg],
          [`Страна по месту жительства`,  obj.citizenship_name],
          [`Фамилия, имя, отчество руководителя `,obj.fullnamerus],
          [`Пол`,  obj.sex_name],
          [`Статус`,  obj.status],

         ]
          ) } style={{tclass: ['tblString'],}} /> <br/>

        </>)
    }


}


export default CARD159_IP

