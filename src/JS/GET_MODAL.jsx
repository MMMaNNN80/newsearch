
import  React from 'react';
import  css_ from "../CSS/modal.module.css"


 const GET_MODAL = ({activeModal,setActiveModal, CHILDREN,styleHead,text,styleBody}) => {
     const styleB = styleBody?styleBody:{}
   
    return (
      <div className={activeModal.active ? css_.modal_active +' ' + css_.modal  : css_.modal   }
   
      >
      <div className = {css_.modal_body}    style={styleB}>
       <div className={css_.modalHeader} >  
                     
       <div></div>
       <div className={css_.header} style={styleHead?styleHead:{
          fontSize:'20px' , fontWeight:'700',color:'#2196f3'
       }}> {text?text:'Я MODAL WINDOW'}</div>
       <div className={css_.x} onClick={()=>{setActiveModal({active:false,id:0})}} >x</div>
       </div> 
         {CHILDREN ? CHILDREN:null}
      </div>

      </div>
    );
    
};

export default GET_MODAL;