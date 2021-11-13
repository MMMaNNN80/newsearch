
import './App.css';
import { useState } from 'react'
import HEAD from './COMPONENTS/HEAD';
import SEARCHSTRING from "./COMPONENTS/SEARCHSTRING";
import CARD from "./COMPONENTS/CARD"
import CDI_CARD from './COMPONENTS/CDI_DATA';
import CARD_159 from './159_PAGES/CARD_159';
import CARD_151 from './COMPONENTS/CARD_151';
import NAVLINKS from './COMPONENTS/NAV'
import REGDATA from './159_PAGES/REGDATA_2';

import {
 

  Route,
  Routes,
  
} from "react-router-dom";




//import {getParamsObj,getResponsePg} from './JS/connection'





function App() {


  const [state, setState] = useState('');
  const [cardstate, setCardstate] = useState(0);
  const [status, setStatus] = useState(
    {
      S151: false,
      S159: false,
      CDI: false,

    })




  let objState = {
    update: function (state) {
      setState(state)
    },
    state: state,
    setCardstate: x => setCardstate(x)
    , cardstate: cardstate
  }
  //console.log(cardstate)
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
            setCardstate={objState.setCardstate}
            cardstate={objState.cardstate}
            setStatus={setStatus}
            status={status}
          />
        </div>
        <NAVLINKS />
     

      <div className={"result"}>
        <Routes>
          <Route exact path="/" element={state && status.S159 ? <CARD_159 objState={state} /> : ''} />
          <Route path="/regdata" element={state && status.S159 ? <REGDATA objState={state} /> : ''} />
          <Route  to="/"/>
        </Routes>

        {state && status.CDI && cardstate === 2 ? <CDI_CARD objState={state} /> : ''}

        {state && status.S151 && cardstate === 2 ? <CARD_151 objState={state} /> : ''}
        </div>
      </div>
    </div>
  )


}


export default App;
