import React, { Fragment } from "react";
import {NavLink } from 'react-router-dom'
import {useSpring, animated,config} from 'react-spring'
import { getNavMenuMass } from "../JS/properties";


const NAVLINKS = (props) => {
    const sMenu = useSpring({
        to: {opacity: 1,x:0,border: "1px dotted  orange"}
        ,from: {opacity:0,x: -500,border: "1px dotted  white"}
        ,loop: { reverse: false }
        , config: { duration: 800,config:config.wobbly
        }        
    })

//const navigate = useNavigate()

    //console.log(props.comercial,props.cardstate )
const inn =(props.state && props.statusAll ) ? props.state[0].data.inn  : null

//if(!inn && props.cardstate ===2 && inn.length===10){navigate('/')}

const mass =getNavMenuMass('UL',inn)

if (props.commercial ===0) {mass.map(el=> el.isCom=false)}

const img = <img src="..\img\close.png" height="10px" alt=""/>

if (inn && inn.length===10 && props.statusAll){
return (
    <Fragment key={0}>
        <animated.div style={sMenu} className={"menu"} >
            <img src="..\icon\paper-plane.png" height="40px" alt="a" />
            <h6>Навигация</h6>
        {mass.map((el,i)=>{
          
          if(el.type==='div') { return <div key={i} className = "navdiv">{el.name}</div>}
          if(el.type==='nav') { return <><NavLink key={i} to={el.path}>{<span style={{margin:0,padding:0}}>{el.isCom ? img:''} {el.name}</span>}</NavLink> <br /></>}
          return null
        })}
        </animated.div>
    </Fragment>
)} 

if (inn && inn.length===12 && props.statusAll ) {
    return (
        <Fragment key={1}>
            <animated.div style={{...sMenu} } className={"menu"} >
                <img src="..\icon\paper-plane.png" height="40px" alt="a" />
                <h6>Навигация</h6>
                <div className = "navdiv">Основная информация</div>
                <NavLink  to={`/${inn}`}>Карточка компании ИП</NavLink> <br />
            </animated.div>
        </Fragment>
        )

 }
 
 return null;
}


export default NAVLINKS;