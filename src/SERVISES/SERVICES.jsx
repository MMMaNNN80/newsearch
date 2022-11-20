import React from "react"
import INN_DEMO from "./INN_DEMO"
import LIST_WORKS from "./LISTS_WORKS"



const SEVICES = ({activeModal,setActiveModal }) => {

const ListService = 
[{id:1, func: <LIST_WORKS name = {`СЕРВИС "РАБОТА СО СПИСКАМИ"`} 
activeModal={activeModal} 
setActiveModal={setActiveModal}  /> }
, {id:2, func: <INN_DEMO name = {`ИНН ДЛЯ ПРОВЕДЕНИЯ ДЕМО`} 
activeModal={activeModal} 
setActiveModal={setActiveModal}  /> }
]

return (
  
        <>
        {/* <div style={{gridColumn:'1/10',justifySelf:'center', padding:'300px',color:'red',fontSize:'200px' ,zIndex:5}}> {`id = ${id}` }</div>  */}
       { ListService.filter(el => el.id ===activeModal.id).map(el=> el.func)[0]}
       
       </>
           )

}
export default SEVICES;