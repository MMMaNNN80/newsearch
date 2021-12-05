import CARD_159 from '../159_PAGES/CARD_159'
import REGDATA from '../159_PAGES/REGDATA_2'
import OKVEDS from '../159_PAGES/OKVEDS_3';
import CONTACTS_DATA from '../159_PAGES/CONTACTS_DATA_4';
import CHANGES_COMP from '../159_PAGES/CHANGES_COMP_5';
import LEADERS from '../159_PAGES/LEADERS_6';
import COWNERS from '../159_PAGES/COWNERS_7';
import STRUCTURE_OPEN from '../159_PAGES/STRUCTURE_OPEN_8/STRUCTURE_OPEN_8';
import FINSTR from '../159_PAGES/FINSTR_9';
import NOT_FOUND from '../COMPONENTS/NOT_FOUND';
import GOSZAKUPKI from '../159_PAGES/GOSZAKUPKI_10';
import { 
    Route,
    Routes,
    useNavigate
  } from "react-router-dom";



const ROUTERS = (props) =>{

    
    //console.log(props)
  useNavigate('/not_found')
   
 return (
        <>
            <Routes>
             <Route path="/not_found" element = {<NOT_FOUND/>} />
                <Route path="/:inn" element={
                    props.state && props.status.S159 ? <CARD_159 mainForm={props.mainForm} cardstate={props.cardstate}  /> : ''
                } /> 
   
                <Route path="regdata/:inn" element={props.state && props.status.S159 ? <REGDATA mainForm={props.mainForm} /> : ''} />
                <Route path="/okveds/:inn" element={props.state && props.status.S159 ? <OKVEDS mainForm={props.mainForm} /> : ''} />
                <Route path="/info/:inn" element={props.state && props.status.S159 ? <CONTACTS_DATA mainForm={props.mainForm} /> : ''} />
                <Route path="/changescompany/:inn" element={props.state &&props.status.S159 ? <CHANGES_COMP mainForm={props.mainForm} /> : ''} />
                <Route path="/leaders/:inn" element={props.state &&props.status.S159 ? <LEADERS mainForm={props.mainForm} /> : ''} />
                <Route path="/cowners/:inn" element={props.state &&props.status.S159 ? <COWNERS mainForm={props.mainForm} /> : ''} />
                <Route path="/openstruct/:inn" element={props.state &&props.status.S159 ? <STRUCTURE_OPEN mainForm={props.mainForm} /> : ''} />
                <Route path="/finstr/:inn" element={props.state &&props.status.S159 ? <FINSTR mainForm={props.mainForm}/> : ''} />
                <Route path="/goszakupki/:inn" element={props.state &&props.status.S159 ? <GOSZAKUPKI mainForm={props.mainForm}  fzObj= {props.fzObj} setFzObj= {props.setFzObj}/> : ''} />
                
                <Route path="*" element={<CARD_159 mainForm={props.mainForm} cardstate={props.cardstate}  />} />
            
            </Routes>
        </>

    )


}

export default ROUTERS;
