import CARD_159 from '../159_PAGES/CARD_159'
import REGDATA from '../159_PAGES/REGDATA_2'
import OKVEDS from '../159_PAGES/OKVEDS_3';
import CONTACTS_DATA from '../159_PAGES/CONTACTS_DATA_4';
import CHANGES_COMP from '../159_PAGES/CHANGES_COMP_5';
import LEADERS from '../159_PAGES/LEADERS_6';
import COWNERS from '../159_PAGES/COWNERS_7';
import STRUCTURE_OPEN from '../159_PAGES/STRUCTURE_OPEN_8/STRUCTURE_OPEN_8';
import FINSTR from '../159_PAGES/FINSTR_9';
import BANCRUPT from '../159_PAGES/BANCRUPT';
import GOSZAKUPKI from '../159_PAGES/GOSZAKUPKI_10';
import PLEDGES_UK from '../159_PAGES/PLEDGES_UK_12';
import FREE_PAGE from '../159_PAGES/FREE_PAGES';
import ARBITR from '../159_PAGES/ARBITR_11';
import PROS_FILTER from '../159_PAGES/PROVERKI/PROS_FILTER';
import LIC from '../159_PAGES/LIC';
import {
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import RAPF from '../RAPF/RAPF';
//import { getNavMenuMass } from '../JS/properties';




const ROUTERS = (props) => {


    useNavigate('/')


    // const mass = getNavMenuMass('UL',':inn')




    if ( props.mainForm && props.mainForm.src ==='RAPF' && props.state && props.status.S159) {
        return (
            <>
                <Routes>

                    <Route path="/" element={<RAPF mainForm={props.mainForm}  cardstate={props.cardstate} />} />
                    <Route path="/:inn" element={<RAPF mainForm={props.mainForm} cardstate={props.cardstate} />} />
                </Routes>
            </>

        )


    }

     if ( props.commercial === 0 && props.state && props.status.S159) {
        return (
            <>
                <Routes>

                    <Route path="/" element={<CARD_159 mainForm={props.mainForm} cardstate={props.cardstate} />} />
                    <Route path="/:inn" element={<CARD_159 mainForm={props.mainForm} cardstate={props.cardstate} />} />
                    <Route path="regdata/:inn" element={<REGDATA mainForm={props.mainForm} />} />
                    <Route path="/okveds/:inn" element={<OKVEDS mainForm={props.mainForm} />} />
                    <Route path="/info/:inn" element={<CONTACTS_DATA mainForm={props.mainForm} />} />
                    <Route path="/changescompany/:inn" element={<CHANGES_COMP mainForm={props.mainForm} />} />
                    <Route path="/licencies/:inn" element={<LIC mainForm={props.mainForm} tovZnak = {props.tovZnak} />} />
                    <Route path="/leaders/:inn" element={<LEADERS mainForm={props.mainForm} />} />
                    <Route path="/cowners/:inn" element={<COWNERS mainForm={props.mainForm} />} />
                    <Route path="/openstruct/:inn" element={<STRUCTURE_OPEN mainForm={props.mainForm} />} />
                    <Route path="/finstr/:inn" element={<FINSTR mainForm={props.mainForm} />} />
                    <Route path="/goszakupki/:inn" element={<GOSZAKUPKI mainForm={props.mainForm} fzObj={props.fzObj} setFzObj={props.setFzObj} />} />
                    <Route path="/bancrupt/:inn" element={<BANCRUPT mainForm={props.mainForm}  setActiveModal = {props.setActiveModal} activeModal={props.activeModal}/>} />
                    <Route path="/arbitr/:inn" element={<ARBITR mainForm={props.mainForm} AObj={props.AObj} setAObj={props.setAObj} />} />
                    <Route path="/pledges_uk/:inn" element={<PLEDGES_UK mainForm={props.mainForm} SetPledges= {props.SetPledges} pledges= {props.pledges} />} />
                    <Route path="/knm/:inn" element={<PROS_FILTER mainForm={props.mainForm} massMain ={props.massMain} setMassMain={props.setMassMain}  />} />
                </Routes>
            </>

        )
    }
    if (  props.commercial !== 0 && props.state && props.status.S159 ) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<CARD_159 mainForm={props.mainForm} cardstate={props.cardstate} />} />
                    <Route path="/:inn" element={<CARD_159 mainForm={props.mainForm} cardstate={props.cardstate} />} />
                    <Route path="regdata/:inn" element={<REGDATA mainForm={props.mainForm} />} />
                    <Route path="/okveds/:inn" element={<OKVEDS mainForm={props.mainForm} />} />
                    <Route path="/info/:inn" element={<CONTACTS_DATA mainForm={props.mainForm} />} />
                    <Route path="/changescompany/:inn" element={<CHANGES_COMP mainForm={props.mainForm} />} />
                    {/* <Route path="/info/:inn" element={<FREE_PAGE id={4} mainForm={props.mainForm} />} /> */}
                    {/* <Route path="/changescompany/:inn" element={<FREE_PAGE id={5} mainForm={props.mainForm} />} /> */}
                    <Route path="/leaders/:inn" element={<FREE_PAGE id={7} mainForm={props.mainForm} />} />
                    <Route path="/cowners/:inn" element={<FREE_PAGE id={8} mainForm={props.mainForm} />} />
                    <Route path="/openstruct/:inn" element={<FREE_PAGE id={9} mainForm={props.mainForm} />} />
                    <Route path="/finstr/:inn" element={<FREE_PAGE id={11} mainForm={props.mainForm} />} />
                    <Route path="/goszakupki/:inn" element={<FREE_PAGE id={12}  mainForm={props.mainForm} />} />
                    <Route path="/bancrupt/:inn" element={<FREE_PAGE id={13}  mainForm={props.mainForm} />} />
                    <Route path="/arbitr/:inn" element={<FREE_PAGE id={14} mainForm={props.mainForm} />} />
                    <Route path="/pledges_uk/:inn" element={<FREE_PAGE id={15} mainForm={props.mainForm} />} />
                    <Route path="/knm/:inn" element={<FREE_PAGE id={16} mainForm={props.mainForm} />} />
                    <Route path="/licencies/:inn" element={<FREE_PAGE id={17} mainForm={props.mainForm} />} />
                </Routes>
            </>

        )

    }
return null

}

export default ROUTERS;
