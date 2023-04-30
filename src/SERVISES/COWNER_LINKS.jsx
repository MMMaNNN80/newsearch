

import React,{ useState, useCallback, useEffect } from 'react';
import ReactFlow
, { MiniMap, Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } 
from 'reactflow';
import s from '../CSS/cownerslinks.module.css'
import 'reactflow/dist/style.css';
import { h_get_initialstate } from '../JS/SQL';
import CUSTOM_NODES from './COW_CUSTOM_NODES/MAIN_NODE';
import HOLDER from './HOLDERS/HOLDER';
import HOLDER_LIST from './HOLDERS/HOLDER_LIST';
import LABEL from './HOLDERS/LABEL';
import { getMainMass } from './HOLDERS/get_Nodes_edgges';
import SVG_LOADER from '../COMPONENTS/LOADERS/SVG_LOADER';


const nodeTypes = {mainNode: CUSTOM_NODES};

function COWNER_LINKS({ setActionList }) {
 
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [card, setCard] = useState(null)
  const [mass, setMass] = useState([])
  const [h, seth] = useState([])
  const [flow,setFlow ] = useState(null)
  const [isLoad, setIsLoad] = useState(false)

 
const updatechart= useCallback  (
    
  async (holder =null, inn = null) =>{
    setNodes([]);
    setEdges([]);  
    setIsLoad(true)
    await h_get_initialstate(holder,inn)
        .then(obj => {
    setIsLoad(false)
            console.log(obj)
            try{            
          const m = obj
          const inn_ = inn || m?.inn
          setCard(inn_)
           const massnodes = getMainMass(m?.cowners)  
           const h_ = {
            ...m
          , nodes: massnodes?.length ? massnodes[0] : [] 
          , edges: massnodes?.length>1 ? massnodes[1] : []   
        }  
       seth([h_])
        setNodes(h_?.nodes);
        setEdges(h_?.edges)      
    } catch{
      const massnodes = getMainMass([])
      setNodes(massnodes);
      setEdges([]) 

    }
      }
        )
        .finally(setTimeout(()=>{flow?.fitView({ 
          minZoom: 0.5,
          maxZoom: 2
        })},1000))}
        ,[flow])

    useEffect( () => {
       h_get_initialstate(null,null)
      .then(obj=>{
        setMass(obj?.src);  
        const massnodes = getMainMass() ;
        console.log(massnodes)
        setNodes(massnodes[0]);
        setEdges([]) ;
      
      } )
    }, []);

  ////////////////////////////////////////////////////////////////////
   // EVENTS //
//////////////////////////////////////////////////////////////////////


 
  const onNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds)) ;},
    []);

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => addEdge({
        ...params, animated: true
        , style: { stroke: 'red' }
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

  const onNodeDoubleClick =  useCallback(async (_, node) => {
    const _is =h?.filter(el=> el?.holder === node?.id )
 if (_is.length) 
  {  setCard (_is.inn);
     setNodes(_is.nodes);
     setEdges(_is.edges); 
  }
  if (!_is.length) {  updatechart(node?.id)}
          
      
  }, [h,updatechart])

const   onLoad =  e=>{
  setFlow(e);
  setTimeout(()=>{ e?.fitView({ 
  minZoom: 0.5,
  maxZoom: 2
})},1000);}
//////////////////////////////////////////////////////////////////////
   // EVENTS ///////
//////////////////////////////////////////////////////////////////////
return (
    <> 
    <LABEL setActionList={setActionList} />
    {/* <div style={{color:'white',overflow:'auto',padding:30,height:'800px'}}> 
    {h.map((el,i) =>
     <p style={{background: i%2===0 ? 'brown' :'none' }} key={i}>
     {`${i+1})\n*********  ${JSON.stringify(el,null,4)}`}
     </p>)}
    </div> */}
    
     <div  style={{
      justifyItems:'center'
      ,width:'100%',display:'flex'
      ,height:'auto'
      ,alignItems:'center'
      ,justifyContent:'center'
      }}> 
    
   </div> 
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
               <div 
               onClick={()=>console.log(btn.sparkid)}
               key={i} style= {{
                
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
   
        <HOLDER_LIST massHolders={mass} card={card}
         updatechart={updatechart} />
        </div>
        <div style={{
          gridColumn: 4
          , gridRow: '2'
          , overflow: 'auto'
          , height: '80%'
        }}>
          <ReactFlow
            onInit = {onLoad}
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            style={{ background: 'white' }}
            // fitView = {{ minZoom:0.5,maxZoom: 2}}
            attributionPosition="bottom-left"
            onConnect={onConnect}
            defaultViewport ={{ x: 400, y: 200, zoom: 1 }}
            onNodeMouseEnter={onNodeMouseEnter}
            onNodeMouseLeave={onNodeMouseLeave}
            onNodeDoubleClick = {onNodeDoubleClick}
          // className="intersection-flow"
          >
           {!isLoad ? <MAINCARD />:null}  
           {isLoad ? <SVG_LOADER/>:null} 
            <Background />
            <MiniMap 
              nodeStrokeWidth={4}
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
        <div style={{
          position: 'absolute'
          ,top: '5px'
          ,width: '350px'
          ,left: '5px'
          ,zIndex: 100 
          }} className=''>
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