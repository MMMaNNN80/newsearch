
import './App.css';
import {useEffect, useState,useRef } from 'react'
import HEAD from './COMPONENTS/HEAD';
import SEARCHSTRING from "./COMPONENTS/SEARCHSTRING";
import CARD from "./COMPONENTS/CARD"
import CDI_CARD from './COMPONENTS/CDI_DATA';
import CARD_151 from './COMPONENTS/CARD_151';
import NAVLINKS from './NAVIGATIONS/NAVLINKS'
import ROUTERS from './NAVIGATIONS/ROUTERS';
import { getOBJpublic } from './JS/MAPPING_SQL';
import { getDATAGoszakupki,result,getDATAArbitrAGG,getDATAinn,f_getPledges,f_get_knm } from './JS/SQL';

import SEVICES from './SERVISES/SERVICES';
import ROUTERS_IP from './NAVIGATIONS/ROUTERS_IP';








function App() {


  const [mainForm, setMainform] = useState(()=>getOBJpublic())
  const [state, setState] = useState(null);
  const [cardstate, setCardstate] = useState(0);
  const [status, setStatus] = useState(
    {
      S151: false,
      S159: false,
      CDI: false,
    })
  const [massMain,setMassMain] = useState([])
  const [services, setServices] = useState({isOpen:false,service_id:0})
  const [massIP,setmassIP] = useState({loading:true, mass:[]})

  const [commercial, setCommercial] = useState(0)
  const [pledges,setPledges] = useState({loading:true, mass:[]})

  

 const [activeModal,setActiveModal] = useState({active: false, id:0}) 

    const [fzObj,setFzObj] = useState({loading:true})
    const [AObj,setAObj] = useState({loading:true})

    const objState = {
    update: function (state) {
    setState(state)
    },
    state: state,
    setCardstate: x => setCardstate(x)
    ,cardstate: cardstate
    ,clearStatus: () =>setStatus({    
      S151: false,
      S159: false,
      CDI: false})
  }
const [statusAll, setStatusAll] = useState(false)
if ((status.CDI || status.S151 || status.S159) && !statusAll) {setStatusAll(true)} 
if (!(status.CDI || status.S151 || status.S159) &&  statusAll) {setStatusAll(false)} 

  const param = useRef(true)

const inn = state && state[0]? state[0].data.inn : null
const kpp = state && state[0]? state[0].data.kpp : null

console.log(`mainForm.inn.= ${mainForm.inn.value} и  инн = ${inn}` )
if (  
  state
  && mainForm
  && mainForm.inn.value !== inn  
  && cardstate === 2 ) {param.current = true}
    
    
    useEffect( ()=> {
       if (param.current && inn   && inn.length === 10  ) {
          param.current = false

        result(inn,kpp,commercial)
        .then( data=>{
         if  (data) {setMainform (data) }}
         )
            
            setFzObj({loading:true})          
            if(commercial===0  ){
            getDATAGoszakupki(inn) 
            .then( mass=>{
             
              setFzObj ({mass,loading:false})})
              setAObj ({loading:true})
              getDATAArbitrAGG (inn) 
              .then( mass=>{
     
                setAObj ({mass,loading:false})})

                f_getPledges (inn) 
                .then( mass=>{
       
                  setPledges ({mass,loading:false})})
                  if(inn !==null) {
                  f_get_knm (inn)
                  .then(mass=> {
                 setMassMain(mass) }) }
                
          }
              }     
        } ,[mainForm,inn,cardstate,state,commercial,kpp]  
        )

        useEffect( ()=> {
          if (param.current  && inn && inn.length === 12)
               {
                param.current = false
                 ///console.log(state)  
                   getDATAinn (inn) 
                   .then( mass=>{
                    setmassIP({mass,loading:false})})  
                   }
                   
             } ,[mainForm,inn,cardstate,state]    
            
             )
//
 return (
    <div className="App bg-dark border-danger h6 mr-5">  
     
      <div className={'all'}>
        <div className={'fix'}>
<div style={{display:'grid',gridTemplateColumns:'5fr 1fr 50px',columnGap:'10px',padding:'5px'}}>
 
<div style={{gridColumn:1 ,borderRight:'1px dotted gold',padding:'10px'}}>

  <HEAD />
          <SEARCHSTRING 
          objState={objState}
          services={services} 
          setServices ={setServices} commercial = {commercial} 
          setCommercial = {setCommercial} param={param}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
          />     
       </div>     
             {activeModal.id !== 0 ? <SEVICES
               activeModal={activeModal}
               setActiveModal={setActiveModal} /> : null}

             <div style={{ gridColumn: 2, gridRow: '1/5', paddingTop: '40px', width: '200px', marginTop: '10px' }}  >
               <GETINSERVICES />

             </div>
           </div>
         </div>
         {objState.state ? <div className={"cards"}>
           <CARD
             state={objState.state}
             update={objState.update}
             setCardstate={objState.setCardstate} cardstate={cardstate}
             setStatus={setStatus}
             status={status}
           />
         </div> : null}

         {inn && inn.length === 10  ?
           <div className={"result"}
           style={{width:'450px' }}
           >
             {state && cardstate === 2 && mainForm  ?
               <ROUTERS
                 massIP={massIP}
                 mainForm={mainForm}
                 fzObj={fzObj} setFzObj={setFzObj}
                 setAObj={setAObj} AObj={AObj}
                 result={result}
                 state={state}
                 status={status}
                 cardstate={cardstate}
                 commercial={commercial}
                 setActiveModal={setActiveModal} activeModal={activeModal}
                 pledges={pledges} setPledges={setPledges}
                 massMain={massMain} setMassMain={setMassMain}
               /> : null}
             {state && cardstate === 2 ?
               <NAVLINKS state={state} statusAll={statusAll} commercial={commercial}
                mainForm={mainForm} /> : null}
             {state && status.CDI && cardstate === 2 && commercial === 0 ? <CDI_CARD objState={state} /> : ''}
             {state && status.S151 && cardstate === 2 && commercial === 0 ? <CARD_151 objState={state} /> : ''}

           </div>
           : null}



{inn && inn.length===12 && cardstate===2 
 && massIP.mass.length> 0 ?
<> 

<div className={"result"}>
<ROUTERS_IP 
              massIP={massIP} 
              status={status} 
              commercial={commercial}
              setActiveModal ={setActiveModal} activeModal={activeModal}
          />

<NAVLINKS state={state} cardstate={cardstate} commercial={commercial}/>


</div>
</> :null}


      </div>
      {/* <div style={{color:'white',fontSize:'80px',zIndex:7}}> {activeModal ?'Да':'Нет'}</div>   */}
    </div>
  )

  function GETINSERVICES() {
  let  mass = []
  mass.push(["МОНИТОРИНГ","http://10.42.78.166:38183"])
  mass.push(["ЧЕРНЫЕ СПИСКИ","http://10.42.78.166:38185"])
  mass.push(["ОРПОНИЗАЦИЯ АДРЕСОВ","https://10.42.78.166:38167"])
 // console.log(mass)
 return (
      <>
      <p style={{color:'#e4f5ff'}}>Внутренние сервисы</p>
     <div  style={{display:'flex',padding: '10px'}}>
    {mass.map((el,i)=> { 
      return(
           <a  key={i} href={el[1]}
           target={"_blank"}
           rel="noopener noreferrer"
           ><button style={{minWidth:'100px',padding:'5px'}}
           className='btn btn-primary' > 
            {el[0]}
            </button>
       
     </a>
      )
    })}
     </div>    
      </>
    )


  }


}


export default App;
