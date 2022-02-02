
import  React from 'react';
import  css_ from "../CSS/modal.module.css"


 const GET_MODAL = ({activeModal,setActiveModal, CHILDREN,styleHead,text}) => {
     
  
    return (
      <div className={activeModal ? css_.modal_active +' ' + css_.modal  : css_.modal   }>
      <div className = {css_.modal_body}>
       <div className={css_.modalHeader} >  
                      
       <div></div>
       <div className={css_.header} style={styleHead?styleHead:{
          fontSize:'20px' , fontWeight:'700',color:'#2196f3'
       }}> {text?text:'Я MODAL WINDOW'}</div>
       <div className={css_.x} onClick={()=>{setActiveModal(false)}} >x</div>
       </div> 
         {CHILDREN ? CHILDREN:null}
      </div>

      </div>
    );
    
};

export default GET_MODAL;