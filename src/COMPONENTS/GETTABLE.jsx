import React, { Fragment, useState } from "react";

function GETTABLE(props) {
    const [isOpen, setIsOpen] = useState(false)
    let funcGetRows = []
    const funcGetRows_all = props.funcGetRows
    const tStyle = props.tStyle ? props.tStyle : ''  
    
    if (funcGetRows_all.length >= 6 
        && props.endtbl) { funcGetRows = funcGetRows_all.slice(0, 6) }
    return (
        <Fragment>
            <table style={{...tStyle}} className={[...props.style.tclass]} onClick={props.onClick}>
                <caption align="top" style={props.style.captionStyle}> {props.name}</caption>

                <tbody>
                    {(!isOpen && props.endtbl && funcGetRows_all.length >= 11) ? [...funcGetRows] : [...funcGetRows_all]}
                </tbody>
            </table>
            {props.endtbl && funcGetRows_all.length >= 6 ?
                <div style={{...tStyle}} className="endreport"
                    onClick={() => setIsOpen(!isOpen)} >&#8230;&#8230;&#8230;&#8230;&#8230;&#8230;
                </div> : ''
            }
        </Fragment>
    )


}

export default GETTABLE;