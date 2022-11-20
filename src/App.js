
import './App.css';
import React,{ useEffect, useState, useRef } from 'react'
import HEAD from './COMPONENTS/HEAD';
import SEARCHSTRING from "./COMPONENTS/SEARCHSTRING";
import CARD from "./COMPONENTS/CARD"
import CDI_CARD from './COMPONENTS/CDI_DATA';
import CARD_151 from './COMPONENTS/CARD_151';
import NAVLINKS from './NAVIGATIONS/NAVLINKS'
import ROUTERS from './NAVIGATIONS/ROUTERS';
import { getOBJpublic } from './JS/MAPPING_SQL'
import GETINSERVICES from './159_PAGES/GETINSERVICES'
import {
  getDATAGoszakupki
  , result
  , getDATAArbitrAGG
  , getDATAinn
  , f_getPledges
  , f_get_knm
  , f_getTovZnak

} from './JS/SQL';
import MIGRATIONS from './SERVISES/MIGRATIONS';
import SEVICES from './SERVISES/MIGRATIONS';
import ROUTERS_IP from './NAVIGATIONS/ROUTERS_IP';
import GET_MODAL_OVER from './JS/GET_MODAL_OVER';
import COWNER_LINKS from './SERVISES/COWNER_LINKS'

function App() {

  const [mainForm, setMainform] = useState(() => getOBJpublic())
  const [isloaded,setIsLoaded ] = useState(false)
  const [state, setState] = useState(null);
  const [cardstate, setCardstate] = useState(0);
  const [status, setStatus] = useState(
    {
      S151: false,
      S159: false,
      CDI: false,
    })
  const [actionList,setActionList] = useState ({open:false, id:0}); 
  const [activeModal, setActiveModal] = useState({ active: false, id: 0 })

  const [massMain, setMassMain] = useState([])
  const [services, setServices] = useState({ isOpen: false, service_id: 0 })
  const [massIP, setmassIP] = useState({ loading: true, mass: [] })

  const [commercial, setCommercial] = useState(0)
  const [pledges, setPledges] = useState({ loading: true, mass: [] })
  const [tovZnak, setTovZnak] = useState({ loading: true, mass: [] })
  const [isRAPF, setIsRAPF] = useState(false)


 

  const [fzObj, setFzObj] = useState({ loading: true })
  const [AObj, setAObj] = useState({ loading: true })



  const objState = {
    update: function (state) {
      setState(state)
    },
    state: state,
    setCardstate: x => setCardstate(x)
    , cardstate: cardstate
    , clearStatus: () => setStatus({
      S151: false,
      S159: false,
      CDI: false
    })
  }
  const [statusAll, setStatusAll] = useState(false)


  if ((status.CDI || status.S151 || status.S159) && !statusAll) { setStatusAll(true) }
  if (!(status.CDI || status.S151 || status.S159) && statusAll) { setStatusAll(false) }

  const param = useRef(true)

  const inn = state && state[0] ? state[0].data.inn : null
  const kpp = state && state[0] ? state[0].data.kpp : null

  //console.log(`mainForm.inn.= ${mainForm.inn.value} и  инн = ${inn}` )


useEffect(
    () => {
    if (inn && inn?.length === 10  && cardstate ===3) {
      setCardstate(2) 
      setIsLoaded(false) 
     result(inn, kpp, commercial)
        .then(data => {
          setIsLoaded(true) 
          if (data && data?.src === 'RAPF') { setIsRAPF(true) } else { setIsRAPF(false) }
          if (data) { setMainform(data) }
        })
if (commercial === 0 && !isRAPF) {
        getDATAGoszakupki(inn)
          .then(mass => {

            setFzObj({ mass, loading: false })
          })
        setAObj({ loading: true })
        getDATAArbitrAGG(inn)
          .then(mass => {

            setAObj({ mass, loading: false })
          })

        f_getPledges(inn)
          .then(mass => {

            setPledges({ mass, loading: false })
          })

        if (inn !== null) {
          f_get_knm(inn)
            .then(mass => {
              setMassMain(mass)
            })
        }

        f_getTovZnak(inn)
          .then(mass => {
           // console.log(mass)
            setTovZnak({ mass, loading: false })
          })
        setFzObj({ loading: true })



      }
    } 
  },[mainForm, inn, cardstate, commercial, isRAPF,kpp]
  )
  


  useEffect(() => {
    if ( inn && inn?.length === 12 && cardstate ===3) {
      ///console.log(state)  
      getDATAinn(inn, state[0]?.data?.ogrn)
        .then(mass => {
          setmassIP({ mass, loading: false })
        })
    }

  }, [mainForm, inn, cardstate, state]

  )
  //
 console.log(actionList.open + '  ' +  actionList.id)
return (
    <div className="App bg-dark border-danger h7 mr-10">

      <div className={'all'}>
        <div className={'fix'}>
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 1fr 50px', columnGap: '10px', padding: '5px' }}>

            <div style={{ gridColumn: 1, borderRight: '1px dotted gold', padding: '10px' }}>

              <HEAD />
              <SEARCHSTRING
                objState={objState}
                services={services}
                setServices={setServices} commercial={commercial}
                setCommercial={setCommercial} param={param}
                activeModal={activeModal}
                setActiveModal={setActiveModal}
              />
            </div>
            {activeModal.id !== 0 ? <SEVICES
              activeModal={activeModal}
              setActiveModal={setActiveModal} /> : null}

            <div style={{ gridColumn: 2, gridRow: '1/6', paddingTop: '40px', width: '200px', marginTop: '10px' }}  >
              <GETINSERVICES  actionList={actionList} setActionList = {setActionList}/>

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

        {inn && inn?.length === 10 ?
          <div className={"result"}
            style={{ width: '450px' }}
          >
            {state && cardstate === 2 && isloaded ?
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
                tovZnak={tovZnak}
              /> : null}

            {state && cardstate === 2 ?
              <NAVLINKS state={state} statusAll={statusAll} commercial={commercial}
                mainForm={mainForm} /> : null}
            {state && status.CDI && cardstate === 2 && commercial === 0 ? <CDI_CARD objState={state} /> : ''}
            {state && status.S151 && cardstate === 2 && commercial === 0 ? <CARD_151 objState={state} /> : ''}

          </div>
          : null}



        {inn?.length === 12 
        && cardstate === 3 
        && massIP?.mass.length > 0 ?
          <>

            <div className={"result"}>
              <ROUTERS_IP
                massIP={massIP}
                status={status}
                commercial={commercial}
                setActiveModal={setActiveModal} activeModal={activeModal}

              />

              <NAVLINKS state={state} cardstate={cardstate} commercial={commercial} />


            </div>
          </> : null}


      </div>
      {/* <div style={{color:'white',fontSize:'80px',zIndex:7}}> {activeModal ?'Да':'Нет'}</div>   */}
     
      {actionList.open && actionList.id===1? <GET_MODAL_OVER
       CHILDREN={<MIGRATIONS setActionList={setActionList} actionList={actionList}/>} 
       />:null}
             
      {actionList.open && actionList.id===2? <GET_MODAL_OVER
       CHILDREN={<COWNER_LINKS setActionList={setActionList} actionList={actionList}/>} 
      />:null}

    </div>
  )
    
  
} 



export default App;
