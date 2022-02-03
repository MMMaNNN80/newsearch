
//import FREE_PAGE from '../159_PAGES/FREE_PAGES';
import CARD159_IP from "../159_IP/CARD159_IP";
import BANCRUPT_IP from "../159_IP/BANCRUPT_IP";
import {
    Route,
    Routes,
    
} from "react-router-dom";
//import { getNavMenuMass } from '../JS/properties';

const ROUTERS_IP = (props) => {


    if (  props.status.S159) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<CARD159_IP massIP={props.massIP}  />} />
                    <Route path="/:inn" element={<CARD159_IP massIP={props.massIP}  />} />
                    <Route path="/ipbancrupt/:inn"
                     element={<BANCRUPT_IP 
                      massIP={props.massIP} 
                      setActiveModal = {props.setActiveModal}
                      activeModal={props.activeModal}/>} />
            
                </Routes>
            </>

        )
   }

}

export default ROUTERS_IP;
