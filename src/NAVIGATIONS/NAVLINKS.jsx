import React, { Fragment } from "react";
import {NavLink } from 'react-router-dom'
import {useSpring, animated,config} from 'react-spring'

const NAVLINKS = (props) => {
    const sMenu = useSpring({
        to: {opacity: 1,x:0,border: "1px dotted  orange"}
        ,from: {opacity:0,x: -500,border: "1px dotted  white"}
        ,loop: { reverse: false }
        , config: { duration: 800,config:config.wobbly }
        
    })

    //console.log(props.state,props.cardstate )
const inn =(props.state && props.cardstate===2) ? props.state[0].data.inn  : 'empty'
 // const inn=''

 
    return (
        <Fragment>
            <animated.div style={sMenu} className={"menu"} >
                <img src="..\icon\paper-plane.png" height="40px" alt="a" />
                <h6>Навигация</h6>
                <div className = "navdiv">Основная информация</div>
                <NavLink  to={`/${inn}`}>Карточка компании</NavLink> <br />
                <NavLink to={`regdata/${inn}`}>Регистрационные данные</NavLink> <br />
                <NavLink to={`/okveds/${inn}`}>Виды экономической деятельности</NavLink> <br />
                <NavLink to={`/info/${inn}`}>Телефоны и Адреса</NavLink> <br />
                <NavLink to={`/changescompany/${inn}`}>История изменений</NavLink> <br />
                <div className = "navdiv">Структура компании</div>
                <NavLink to={`/leaders/${inn}`}>Органы управления</NavLink> <br />
                <NavLink to={`/cowners/${inn}`}>Совладельцы</NavLink> <br />
                <NavLink to={`/openstruct/${inn}`}>Структура (развернуто)</NavLink> <br />
            </animated.div>
        </Fragment>
    )
}
export default NAVLINKS;