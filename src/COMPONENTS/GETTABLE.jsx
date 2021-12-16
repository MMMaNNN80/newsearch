import React, { Fragment, useState } from "react";

function GETTABLE(props) {
    const [isOpen, setIsOpen] = useState(false)
    let colmass = props.colmass?  props.colmass : []
    let funcGetRows = []
    const funcGetRows_all = props.funcGetRows
    const tStyle = props.tStyle ? props.tStyle : ''  
    let cut = 6
    if(props.cut && props.cut>0) {cut=props.cut}
    
    if (funcGetRows_all.length >= cut 
        && props.endtbl) { funcGetRows = funcGetRows_all.slice(0, cut) }
    return (
        <Fragment>
            <table style={{...tStyle}} className={[...props.style.tclass]} onClick={props.onClick}>
                <caption align="top" style={props.style.captionStyle}> {props.name}</caption>
                {[...colmass]}

                <tbody>
                    {(!isOpen && props.endtbl && funcGetRows_all.length >= cut) ? [...funcGetRows] : [...funcGetRows_all]}
                </tbody>
            </table>
            {props.endtbl && funcGetRows_all.length >= cut ?
                <div style={{...tStyle}} className="endreport"
                    onClick={() => setIsOpen(!isOpen)} >&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;
                </div> : ''
            }
        </Fragment>
    )


}

export default GETTABLE;