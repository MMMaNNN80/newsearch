import CARD_159 from '../159_PAGES/CARD_159'
import REGDATA from '../159_PAGES/REGDATA_2'
import OKVEDS from '../159_PAGES/OKVEDS_3';
import CONTACTS_DATA from '../159_PAGES/CONTACTS_DATA_4';
import CHANGES_COMP from '../159_PAGES/CHANGES_COMP_5';
import LEADERS from '../159_PAGES/LEADERS_6';
import COWNERS from '../159_PAGES/COWNERS_7';

import { 
    Route,
    Routes,
  } from "react-router-dom";



const ROUTERS = (props) =>{



    return (
        <>
            <Routes>
                <Route path="/" element={
                    props.state && props.status.S159 ? <CARD_159 objState={props.state} cardstate={props.cardstate} /> : ''
                } />
                <Route path="/regdata" element={props.state && props.status.S159 ? <REGDATA state={props.objState} /> : ''} />
                <Route path="/okveds" element={props.state && props.status.S159 ? <OKVEDS state={props.objState} /> : ''} />
                <Route path="/info" element={props.state && props.status.S159 ? <CONTACTS_DATA state={props.objState} /> : ''} />
                <Route path="/changescompany" element={props.state &&props.status.S159 ? <CHANGES_COMP state={props.objState} /> : ''} />
                <Route path="/leaders" element={props.state &&props.status.S159 ? <LEADERS state={props.objState} /> : ''} />
                <Route path="/cowners" element={props.state &&props.status.S159 ? <COWNERS state={props.objState} /> : ''} />
                <Route path="*" element={<CARD_159 objState={props.state} cardstate={props.cardstate} />} />
            </Routes>
        </>

    )


}

export default ROUTERS;