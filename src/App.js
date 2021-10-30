
import './App.css';
import HEAD from './COMPONENTS/HEAD';
import SEARCHSTRING from "./COMPONENTS/SEARCHSTRING";
import CARD from "./COMPONENTS/CARD"
import {useState} from 'react'
import CDI_CARD from './COMPONENTS/CDI_DATA';
import CARD_159 from './COMPONENTS/CARD_159';
//import {getParamsObj,getResponsePg} from './JS/connection'





function App() {
  const [state,setState]=useState('')
  const [cardstate,setCardstate] = useState(0)
 //const [xxx,setx] = useState('')

  let objState = {
    update : function (state) {
    setState(state)
  },
  state: state,
  setCardstate: function (x){setCardstate(x)}
 , cardstate:cardstate
}


// let obj = getParamsObj()
//  obj.fields = "*"
// getResponsePg (obj)
// .then(data=> {setx(JSON.stringify(data,null,4));return data;})
// .then(data=>console.log(data))

return (
    <div className="App bg-dark border-danger h6 mr-5">
      <div className={'all'}>
        <div className={'fix'}>
        
          <HEAD/>
          
          <SEARCHSTRING objState = {objState}/>
        </div>
        <div className={"cards"}>
          <CARD 
          state ={objState.state}
          update = {objState.update}
          setCardstate = {objState.setCardstate}
          cardstate={objState.cardstate}
          />

          </div>
          {state && cardstate>1 ? <CDI_CARD objState = {state} /> :''}
          {state && cardstate>1 ? <CARD_159 objState = {state} /> :''}
          </div>
          
   
          
      </div>
  );


 
}


export default App;
