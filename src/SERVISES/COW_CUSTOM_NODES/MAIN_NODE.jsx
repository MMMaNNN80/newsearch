import React, { Fragment, memo } from 'react';
import { Handle } from 'reactflow';

export default memo(({ isConnectable,data }) => {
 const  background = 'transparent'

const mass = [
  {id:'r1',pos:'right', style:{ top: 0, background: background }},
  {id:'r2',pos:'right', style:{ textAlign:'center', background: background}},
  {id:'r3',pos:'right', style:{ top: '100%', background: background }},
 
  {id:'l1',pos:'left', style:{ top: 0, background: background }},
  {id:'l2',pos:'left', style:{ textAlign:'center', background: background }},
  {id:'l3',pos:'left', style:{ top: '100%', background: background}},

  {id:'t1',pos:'top', style:{ textAlign:'center', background: background }},
  {id:'b1',pos:'bottom', style:{ textAlign:'center', background: background }},

]
return (
    <>
       {data.label}   
      {mass.map((h,i)=> {
        return (
          <Fragment key={i}>
        <Handle
        type="source"
        position={h.pos}
        id={h.id}
        style={h.style}
        isConnectable={isConnectable}/>
          </Fragment>

        )
      })}
    
  </>
  );
});
