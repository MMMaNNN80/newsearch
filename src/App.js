
import './App.css';
import {useState } from 'react'
import HEAD from './COMPONENTS/HEAD';
import SEARCHSTRING from "./COMPONENTS/SEARCHSTRING";
import CARD from "./COMPONENTS/CARD"
import CDI_CARD from './COMPONENTS/CDI_DATA';
import CARD_151 from './COMPONENTS/CARD_151';
import NAVLINKS from './NAVIGATIONS/NAVLINKS'
import ROUTERS from './NAVIGATIONS/ROUTERS';
import { getOBJpublic } from './JS/MAPPING_SQL';
import { render,getResponsePg } from './JS/connection';
import {getParamsObj} from './JS/properties'


function App() {
  const [mainForm, setMainform] = useState(()=>getOBJpublic())
  const [cowmass,setCowMass] = useState([])
  const [state, setState] = useState(null);
  const [cardstate, setCardstate] = useState(0);
  const [status, setStatus] = useState(
    {
      S151: false,
      S159: false,
      CDI: false,
    })



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

const inn = (state  &&  cardstate===2)? state[0].data.inn:null



async function result (inn) {
   if (inn){ 
     
    let obj =  getParamsObj()
    obj.inn = inn
    obj.fields = "*"
    obj.table = `f_getforms('${inn}')`
    obj.host = '/159'
    await render(obj).then( data=>{
      setMainform (
      prev=> {return { ...prev, ...data}})})}
    }

      
      if(state && cardstate===2 
        && mainForm.inn.value!==inn)  
      {
         result(inn)
        // debugger
        getCowners(inn) 
      }

      async function getCowners(inn) {
        if (inn){ 
          let obj =  getParamsObj()
          obj.inn = inn
          obj.fields = "*"
          obj.table = `f_getRecursStruct('${inn}')`
          obj.host = '/159'
          await getResponsePg(obj).then(mass => {

            setCowMass (mass)})
          
        } 
        
      }
      

  return (
    <div className="App bg-dark border-danger h6 mr-5">
      <div className={'all'}>
        <div className={'fix'}>

          <HEAD />
          <SEARCHSTRING objState={objState} />
        </div>
        <div className={"cards"}>
          <CARD
            state={objState.state} 
            update={objState.update}
            setCardstate={objState.setCardstate} cardstate={cardstate}
            setStatus={setStatus}
             status={status}
          />
        </div>

        <div className={"result"}>
          {state && cardstate ?
           <ROUTERS mainForm={mainForm} cowmass={cowmass} 
          result={result} state={state} status={status} cardstate={cardstate} /> : null}
          {state && cardstate === 2 ? <NAVLINKS   state={state} cardstate={cardstate} /> : null}
          {state && status.CDI && cardstate === 2 ? <CDI_CARD objState={state} /> : ''}
          {state && status.S151 && cardstate === 2 ? <CARD_151 objState={state} /> : ''}
        </div>
      </div>
    </div>
  )


}


export default App;
