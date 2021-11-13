import React, { Fragment } from "react";
import {NavLink } from 'react-router-dom'


const NAVLINKS = (props) => {
    const home= React.useRef()
    return (
        <Fragment>
            <div className={"menu"} onLoad={()=>()=>home.click()}>
                <img src=".\icon\paper-plane.png" height="40px" alt="a" />
                <h6>Навигация</h6>
                <NavLink ref={home} to="/">Карточка компании</NavLink> <br />
                <NavLink to="/regdata">Регистрационные данные</NavLink>
            </div>
        </Fragment>
    )
}
export default NAVLINKS;