

import { useState, useCallback } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import 'reactflow/dist/style.css';


const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [{ id: '1-2', source: '1', target: '2', label: '50%', type: 'step' }];


 function COWNER_LINKS({setActionList}) {


  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  // useEffect(() => {
  //   f_get_migr_all_info().then(mass_all => setMass_all(mass_all))
  // }, []);

 return (

<div  style = {{width:'100%',overflow:'auto'}}>
                   <div style={{
    
       border:'1px solid grey'
       ,padding:'8px'
       ,marginTop:'20px'
       ,marginLeft:'5px'
       ,width:'110px'
     , fontSize:'14px'
     , color:'white'

     }}  onClick={()=>{setActionList({open:false,id:0})}}>
        {`<---- НАЗАД`}
        </div>
    <p style = {{
      
      color:'white'
      ,fontSize:'38px'
      ,textAlign:'center'
      ,fontWeight:'bold'
      ,letterSpacing:5
    ,textTransform:'uppercase'}}>СОВЛАДЕНИЯ КОМПАНИЙ</p>
    <div style={{padding:'10px',background:'white',zIndex:1000,width:'100%',height:'500px',overflow:'auto'}}>
    <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
      </div>
    </div>
    )

  }



export default COWNER_LINKS;