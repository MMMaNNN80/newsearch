import React, {  useState } from "react";

function GETTABLE(props) {
    const [isOpen, setIsOpen] = useState(false)
    let colmass = props.colmass?  props.colmass : []
    let funcGetRows = []
    const funcGetRows_all = props.funcGetRows
    const tStyle = props.tStyle ? props.tStyle : ''  
    const tClass =  props.style? props.style.tclass:[]
    const captionStyle =  props.style? props.style.captionStyle:[]
    const stbody = props.stbody ? props.stbody :{}
    let cut = 6
    if(props.cut && props.cut>0) {cut=props.cut}
    
    if (funcGetRows_all.length >= cut 
        && props.endtbl) { funcGetRows = funcGetRows_all.slice(0, cut) }
    return (
        <>
            <table style={{...tStyle,lineBreak:'auto' }} className={tClass} onClick={props.onClick}>
         
                    {[...colmass]}
                
            <caption align="top" style={captionStyle}> {props.name}</caption>
               
               
              

                <tbody style={stbody}>
                    {(!isOpen && props.endtbl && funcGetRows_all.length >= cut) ? [...funcGetRows] : [...funcGetRows_all]}
                </tbody>
               
            </table>
            {props.endtbl && funcGetRows_all.length >= cut ?
                <div style={{...tStyle}} className="endreport"
                    onClick={() => setIsOpen(!isOpen)} >&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;
                </div> : ''
            }
        </>
    )


}

export default GETTABLE;