

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import s from '../CSS/cownerslinks.module.css'
import 'reactflow/dist/style.css';
import { h_get_initialstate } from '../JS/SQL';
//import CARD_151 from '../COMPONENTS/CARD_151';
import { f_getforms } from '../JS/SQL';
import CUSTOM_NODES from './COW_CUSTOM_NODES/MAIN_NODE';
import HOLDER from './HOLDERS/HOLDER';
import HOLDER_LIST from './HOLDERS/HOLDER_LIST';
import LABEL from './HOLDERS/LABEL';
import { getMainMass } from './HOLDERS/get_Nodes_edgges';



function COWNER_LINKS({ setActionList }) {
 
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [card, setCard] = useState(null)
  // const [s_value, sets_value] = useState(0)
  const [h, seth] = useState([])
  const [flow,setFlow ] = useState(null)
  const init_ref = useRef([])
  const onInit = (e)=> {setFlow(e)}


    const nodeTypes = useMemo(() => {
  return {
      mainNode: CUSTOM_NODES,
    }
  }, []);


  useEffect(() => {
    h_get_initialstate().then(initmass => {
      const inn = initmass[0].inn
      init_ref.current = initmass
      const massnodes = getMainMass(initmass)
      setCard(initmass[0].inn)
      setNodes(massnodes[0]);
      setEdges(massnodes[1])
       return inn;
    })
      .then
      (inn => f_getforms(inn)
        .then(h => { seth([h]) }))

  }, []);

  // EVENTS /////////////////////////////////////////////////////////////////////////////

  async function updatechart(holder, inn = null) {
   inn && await f_getforms(inn).then(h => { setCard(inn); seth([h]) })
    await h_get_initialstate(holder).then(mass => {
      if (!mass.length) {
        setNodes([]);
        setEdges([])
      } else {
        const massnodes = getMainMass(mass)
        setNodes(massnodes[0]);
        setEdges(massnodes[1])
      }
    }).then(flow.fitView())
  }
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds)) ;
      flow.fitView({ 
        padding: 80,
        minZoom: 1,
        maxZoom: 5

      })
    },
    [flow]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({
        ...params, animated: true
        , style: { stroke: '#fff' }
      }, eds)),
    []
  );
  const onNodeMouseEnter = useCallback((_, node) => {
    node.style = {...node.style, boxShadow: '1px 1px 1px 1px  green'}
    setNodes(nodes.map(n => {
      if (n.id === node.id) {n.style = node.style}
      return n;
    })) 

    if(edges.length) {
       setEdges(edges.map(el=> {
        if(el.id.includes(node.id)) {
          el.labelBgPadding = [30,10];
          el.labelBgStyle = { fill: 'orange', color: 'red', fillOpacity: 0.9 }
        } 
        return el }))}
      

  }, [nodes,edges])

  const onNodeMouseLeave = useCallback((_, node) => {
    node.style = {...node.style, boxShadow: 'none'}
    setNodes(nodes.map(n => {
      if (n.id === node.id) {n.style = node.style};
       return n
    }))
    if(edges.length) {
      setEdges(edges.map(el=> {
       if(el.id.includes(node.id)) {
         el.labelBgPadding = [15,5];
         el.labelBgStyle = { fill: 'lightblue', color: 'red', fillOpacity: 0.9 }
       } 
       return el }))}

  }, [nodes,edges])

  const onNodeDoubleClick =  useCallback((_, node) => {
         
    if (node?.inn) {
         f_getforms(node.inn)
         .then(x=>{
             
            const mass  = [...h,...[x]]
            seth(mass)
           
         
          })
           
      

      }

   

  }, [h])
   // EVENTS /////////////////////////////////////////////////////////////////////////////

   console.log(h)

  return (
    <> 
    <LABEL setActionList={setActionList} />
      <div className={s.wrapper} >
      <div style={{
        gridRow:1
        ,gridColumn:2
        ,padding:'1em'
        }} >Выберите компанию:</div>
        <div style={{     gridRow:1
        ,gridColumn:'4'
        ,width:'auto'
        ,height:'auto'
        ,background:'#393b49'
       
        
        }}>
              <div style={{
        
         padding:'1em'
        ,display:'flex'
        ,marginLeft:'2em'
        ,alignItems:'center'
  
        ,flexWrap:'wrap'
   
        
      
        }} >
          {h?.length ? h.map ((btn,i)=>{
            return (
               <div style= {{
                
                width:'150px'
                ,cursor:'pointer'
                ,textAlign:'center'
              ,borderRadius:'8px'
                ,fontSize:'11px'
              ,marginRight:'2em'
              ,border:'1px solid green'
              ,padding:'7px'}}>{btn.shortnamerus}
              
              </div>
              )

          }) : null}
       
        </div>
        </div>
        <div className={s.gr_lvl2} >
   
        <HOLDER_LIST massHolders={init_ref.current} card={card} updatechart={updatechart} />
        </div>
        <div style={{
          gridColumn: 4
          , gridRow: '2'
          , overflow: 'auto'
          , height: '80%'
        }}>
          <ReactFlow
            onInit = {onInit}
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            style={{ background: 'white' }}
            fitView
            attributionPosition="bottom-left"
            onConnect={onConnect}
            defaultViewport ={{ x: 400, y: 200, zoom: 1 }}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            onNodeDoubleClick = {onNodeDoubleClick}
          // className="intersection-flow"
          >
            <MAINCARD />
            <Background />
            <MiniMap nodeStrokeWidth={3}
              zoomable
              pannable
              nodeColor={(n) => {
                if (n.type === 'mainNode') return 'green';
                return 'blue';
              }}
            />
            <Controls />
          </ReactFlow>
        </div>
      </div>

    </>

  )

  function MAINCARD () {
   const company = [h[h?.length-1]]
  if (h?.length>0){
      return (
        <div style={{position: 'absolute', top: '5px', width: '350px', left: '5px', zIndex: 100 }} className=''>
        <div style={{position: 'relative',padding:'5px',background:'white' }}> 
          <div style={{ margin:'10px', display: 'block' }}>
          <HOLDER h={company} />
          </div>
   
          </div> 
        </div>
      )
    } else {return null}
  }

}



export default COWNER_LINKS;