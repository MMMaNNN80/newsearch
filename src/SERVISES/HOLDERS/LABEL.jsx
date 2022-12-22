import React  from 'react';
import s from '../../CSS/cownerslinks.module.css'


const LABEL = ({setActionList})=>{
return (
  <div style={{padding:'20px'
  ,display:'flex'
  ,height: '150px'
  ,background:'#363861'
  ,alignItems:'center'
  }}>
  <div className={s.divbtn} 
  onClick={() => { setActionList({ open: false, id: 0 }) }}>
   {`<---- НАЗАД`}
 </div>
 <div className ={s.d_lable} style={{width:'fit-content'}}>
 <p className ={s.p_lable}>СХЕМЫ СОВЛАДЕНИЯ КОМПАНИЙ</p>
 <div className={s.line}></div>
 </div>
 </div>
  )

}

export default LABEL;
