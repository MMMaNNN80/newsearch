import React, { Fragment } from "react";
import {NavLink } from 'react-router-dom'


const NAVLINKS = (props) => {
  
    return (
        <Fragment>
            <div className={"menu"} >
                <img src=".\icon\paper-plane.png" height="40px" alt="a" />
                <h6>Навигация</h6>
                <div className = "navdiv">Основная информация</div>
                <NavLink  to="/">Карточка компании</NavLink> <br />
                <NavLink to="/regdata">Регистрационные данные</NavLink> <br />
                <NavLink to="/okveds">Виды экономической деятельности</NavLink> <br />
                <NavLink to="/info">Телефоны и Адреса</NavLink> <br />
                <NavLink to="/changescompany">История изменений</NavLink> <br />
                <div className = "navdiv">Структура компании</div>
                <NavLink to="/leaders">Органы управления</NavLink> <br />
                <NavLink to="/cowners">Совладельцы</NavLink> <br />
                <NavLink to="/*"></NavLink> <br />
            </div>
        </Fragment>
    )
}
export default NAVLINKS;