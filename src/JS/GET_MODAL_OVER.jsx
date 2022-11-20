


import  React from 'react';


 const GET_MODAL_OVER = ({CHILDREN}) => {
   return (
<div  style={{
  
  display: 'grid'
            , gridTemplateColumns:'minmax(100px,auto)  minmax(50%,60%)  auto'
            ,width:'100vw'
            ,height:'100vh'
            ,background:'#323b3f'
            ,position:'absolute'
            ,zIndex:2
            ,overflow:'auto'

            }}>
      <div style={{gridColumn:2,width:'100%'}}>   
      {CHILDREN ? CHILDREN  :null}
      </div>
      </div>
  
    );
    
};

export default GET_MODAL_OVER;