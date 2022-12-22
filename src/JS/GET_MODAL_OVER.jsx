


import  React from 'react';


 const GET_MODAL_OVER = ({CHILDREN}) => {
   return (
<div  style={{
            width:'100vw'
            ,height:'100vh'
            ,background:'#39484b'
            ,position:'absolute'
            ,zIndex:1
            ,overflow:'auto'

            }}>
      
      {CHILDREN ? CHILDREN  :null}

      </div>
  
    );
    
};

export default GET_MODAL_OVER;