import React, { Fragment } from "react";
import {NavLink } from 'react-router-dom'
import {useSpring, animated,config} from 'react-spring'
import { getNavMenuMass } from "../JS/properties";


const NAVLINKS = (props) => {
    const sMenu = useSpring({
          to: {opacity: 1,x:0,border: "1px dotted  orange"}
        ,from: {opacity:0,x: -500,border: "1px dotted  white"}
        ,loop: { reverse: false }
        ,config: { duration: 800,config:config.wobbly
        }        
    })


const inn =(props.state ) ? props.state[0].data.inn  : null
const img = <img src="..\img\close.png" height="10px" alt=""/>

if (inn && inn.length===10 ){
const mass =getNavMenuMass('UL',inn)

if(props.cardstate >1) {return null}
if (props.commercial ===0  ) {mass.map(el=> el.isCom=false)}


return (
    
        <animated.div key={1}  style={sMenu} className={"menu"} >
            <img src="..\icon\paper-plane.png" height="40px" alt="a" />
            <h6 >Навигация</h6>
        {mass.map((el,x)=>{
          
          if(el.type==='div') { return <div key={x}  className = "navdiv">{el.name}</div>}
          if(el.type==='nav') { return <><NavLink key={x} to={el.path}>{<span style={{margin:0,padding:0}}>{el.isCom ? img:''} {el.name}</span>}</NavLink> <br /></>}
          return null
        })}
        </animated.div>
       
)} 



if (inn && inn.length===12 && props.cardstate>1 ) {
      const massNavIP =getNavMenuMass('IP',inn)
    if (props.commercial ===0) {
        
        massNavIP.map(el=> el.isCom=false)
    }

    return (
        
            <animated.div  key={2} style={sMenu}  className={"menu"} >
                <img src="..\icon\paper-plane.png" height="40px" alt="a" />
                <h6 >Навигация</h6>
                {massNavIP.map((el,z)=>{
          
          if(el.type==='div') { return <div key={z} className = "navdiv">{el.name}</div>}
          if(el.type==='nav') { return <><NavLink  key={z} to={el.path}>{<span style={{margin:0,padding:0}}>{el.isCom ? img:''} {el.name}</span>}</NavLink> <br /></>}
          return null
        })}
            </animated.div>
        
        )

 }
 
 return null;
}


export default NAVLINKS;