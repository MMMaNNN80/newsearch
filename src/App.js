
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
import { getDATAGoszakupki,result,getDATAArbitrAGG,getDATAinn } from './JS/SQL';
import CARD159_IP from './159_IP/CARD159_IP';
import SEVICES from './SERVISES/SERVICES';


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
  const [services, setServices] = useState({isOpen:false,service_id:0})
  const [massIP,setmassIP] = useState({loading:true, mass:[]})

  const [commercial, setCommercial] = useState(false)



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
  const param = useRef(true)

const inn = state && state[0]? state[0].data.inn : null
      
    
     useEffect( ()=> {
     if (
       (
      cardstate===2 
      && mainForm.inn
      && mainForm.inn.value!==inn 
      && inn.length===10)
      || param.current 

      )  
          {
          result(inn,commercial).then( data=>{
            setMainform (
            prev=> {return { ...prev, ...data}})})
           
            setFzObj({loading:true}
            
              )
            

            getDATAGoszakupki(inn) 
            .then( mass=>{
              setFzObj ({mass,loading:false})})

              setAObj ({loading:true})
              
              getDATAArbitrAGG (inn) 
              .then( mass=>{
          
                setAObj ({mass,loading:false})})

                param.current = false
                
              }
        } ,[param,commercial,mainForm,inn,cardstate,state]    
       
        )

       
        
        useEffect( ()=> {
          if (state && cardstate===2 && mainForm
             && mainForm.inn.value!==inn && inn.length===12)  
               {
                 ///console.log(state)
                   
                   getDATAinn (inn) 
                   .then( mass=>{
            
                    setmassIP({mass,loading:false})})  
                   }
             } ,[mainForm,inn,cardstate,state]    
            
             )


   return (
    <div className="App bg-dark border-danger h6 mr-5">
      <div className={'all'}>
     
        <div className={'fix'}>

          <HEAD />
          <SEARCHSTRING 
          objState={objState}
          services={services} 
          setServices ={setServices} commercial = {commercial}  setCommercial = {setCommercial} param={param}/>
           
        </div>
    
       {services.isOpen ? <SEVICES/> : null} 

       { objState.state && !services.isOpen ?  <div className={"cards"}>
          <CARD
            state={objState.state}
            update={objState.update}
            setCardstate={objState.setCardstate} cardstate={cardstate}
            setStatus={setStatus}
            status={status}
          />
        </div> :null}

        {objState.state && inn && inn.length===10 && !services.isOpen ? 
        <div className={"result"}>

          {state && cardstate  ?
            <ROUTERS 
              mainForm={mainForm} 
              fzObj={fzObj} setFzObj={setFzObj}
              setAObj={setAObj} AObj={AObj}
              result={result} 
              state={state} 
              status={status} 
              cardstate={cardstate}/> : null}
          {state && cardstate === 2 ? 
          <NAVLINKS state={state} cardstate={cardstate} /> : null}
          {state && status.CDI && cardstate === 2 ? <CDI_CARD objState={state} /> : ''}
          {state && status.S151 && cardstate === 2 ? <CARD_151 objState={state} /> : ''}
        </div>
: null}

{inn && inn.length===12 && state && cardstate === 2 && !services.isOpen ?
<> 
<div className={"result"}>
<NAVLINKS state={state} cardstate={cardstate} />
<CARD159_IP massIP={massIP} />
</div>
</> :null}


      </div>
      {/* <div style={{color:'white',fontSize:'30px'}}> {param.current?'Да':'Нет'}</div> */}
    </div>
  )


}


export default App;
