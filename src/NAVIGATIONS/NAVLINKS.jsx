import React, { Fragment } from "react";
import {NavLink } from 'react-router-dom'
import {useSpring, animated,config} from 'react-spring'

const NAVLINKS = (props) => {
    const sMenu = useSpring({
        to: {opacity: 1,x:0,border: "1px dotted  orange"}
        ,from: {opacity:0,x: -500,border: "1px dotted  white"}
        ,loop: { reverse: false }
        , config: { duration: 800,config:config.wobbly
        }        
    })

    //console.log(props.state,props.cardstate )
const inn =(props.state && props.cardstate===2) ? props.state[0].data.inn  : 'empty'
 // const inn=''

 if (inn && inn.length===10) {
    return (
        <Fragment>
            <animated.div style={sMenu} className={"menu"} >
                <img src="..\icon\paper-plane.png" height="40px" alt="a" />
                <h6>Навигация</h6>
                <div className = "navdiv">Основная информация</div>
                <NavLink  to={`/${inn}`}>Карточка компании</NavLink> <br />
                <NavLink to={`regdata/${inn}`}>Регистрационные данные</NavLink> <br />
                <NavLink to={`/okveds/${inn}`}>Виды экономической деятельности   </NavLink> <br />
                <NavLink to={`/info/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Телефоны и Адреса</span>:'Телефоны и Адреса'} </NavLink> <br />
                <NavLink to={`/changescompany/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; История изменений</span>:'История изменений'}</NavLink> <br />
                <div className = "navdiv">Структура компании</div>
                <NavLink to={`/leaders/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Органы управления</span>:'Органы управления'}</NavLink> <br />
                <NavLink to={`/cowners/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Совладельцы</span>:'Совладельцы'}</NavLink> <br />
                <NavLink to={`/openstruct/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Структура (развернуто)</span>:'Структура (развернуто)'}</NavLink> <br />
                <div className = "navdiv">Деятельность компании</div>
                <NavLink to={`/finstr/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Баланс и отчет о финансовых результатах</span>:'Баланс и отчет о финансовых результатах'}</NavLink> <br />
                <NavLink to={`/goszakupki/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Участие в Госконтрактах</span>:'Участие в Госконтрактах'} </NavLink> <br />
                <NavLink to={`/arbitr/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Арбитражные дела</span>:'Арбитражные дела'} </NavLink> <br />
                <NavLink to={`/pledges_uk/${inn}`}>{props.commercial>0? <span style={{margin:0,padding:0}}>&#129689; Залоги</span>:'Залоги'}</NavLink> <br />

            </animated.div>
        </Fragment>
    )
 }


 if (inn && inn.length===12) {
    return (
        <Fragment>
            <animated.div style={{...sMenu} } className={"menu"} >
                <img src="..\icon\paper-plane.png" height="40px" alt="a" />
                <h6>Навигация</h6>
                <div className = "navdiv">Основная информация</div>
                <NavLink  to={`/${inn}`}>Карточка компании ИП</NavLink> <br />
            </animated.div>
        </Fragment>
        )

 }

}
export default NAVLINKS;