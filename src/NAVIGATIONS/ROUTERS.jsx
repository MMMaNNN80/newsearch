import CARD_159 from '../159_PAGES/CARD_159'
import REGDATA from '../159_PAGES/REGDATA_2'
import OKVEDS from '../159_PAGES/OKVEDS_3';
import CONTACTS_DATA from '../159_PAGES/CONTACTS_DATA_4';
import CHANGES_COMP from '../159_PAGES/CHANGES_COMP_5';
import LEADERS from '../159_PAGES/LEADERS_6';
import COWNERS from '../159_PAGES/COWNERS_7';
import STRUCTURE_OPEN from '../159_PAGES/STRUCTURE_OPEN_8/STRUCTURE_OPEN_8';
import FINSTR from '../159_PAGES/FINSTR_9';

import GOSZAKUPKI from '../159_PAGES/GOSZAKUPKI_10';
import PLEDGES_UK from '../159_PAGES/PLEDGES_UK_12';
import FREE_PAGE from '../159_PAGES/FREE_PAGES';
import {
    Route,
    Routes,
    useNavigate
} from "react-router-dom";
import ARBITR from '../159_PAGES/ARBITR_11';



const ROUTERS = (props) => {


    //console.log(props)
    useNavigate('/')

    return (
        <>
            <Routes>
            <Route path="/" element={
                    props.state && props.status.S159 ? <CARD_159 mainForm={props.mainForm} cardstate={props.cardstate} /> : ''
                } />
                <Route path="/:inn" element={
                    props.state && props.status.S159 ? <CARD_159 mainForm={props.mainForm} cardstate={props.cardstate} /> : ''
                } />

                <Route path="regdata/:inn" element={props.state && props.status.S159 ? <REGDATA mainForm={props.mainForm} /> : ''} />
                <Route path="/okveds/:inn" element={props.state && props.status.S159 ? <OKVEDS mainForm={props.mainForm} /> : ''} />
                <Route path="/info/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <CONTACTS_DATA mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

                <Route path="/changescompany/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <CHANGES_COMP mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />
                <Route path="/leaders/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <LEADERS mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />
                <Route path="/cowners/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <COWNERS mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

                <Route path="/openstruct/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <STRUCTURE_OPEN mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

                <Route path="/finstr/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <FINSTR mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

                <Route path="/finstr/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <FINSTR mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

                <Route path="/goszakupki/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <GOSZAKUPKI mainForm={props.mainForm} fzObj={props.fzObj} setFzObj={props.setFzObj} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />
                <Route path="/arbitr/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ?
                        <ARBITR mainForm={props.mainForm} AObj={props.AObj} setAObj={props.setAObj} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

                <Route path="/pledges_uk/:inn" element={props.state && props.status.S159 ?
                    props.commercial === 0 ? <PLEDGES_UK mainForm={props.mainForm} /> :
                        <FREE_PAGE mainForm={props.mainForm} /> : ''} />

            </Routes>
        </>

    )


}

export default ROUTERS;
