import React, { Fragment } from "react";

function GETTABLE(props) {
    return (
        <Fragment>
            <table className={[...props.style.tclass]} onClick = {props.onClick}>
                <caption align="top" style={props.style.captionStyle}> {props.name}</caption>
                <tbody>
                    {[...props.funcGetRows]}
                </tbody>
               
            </table>
        </Fragment>
    )


}

export default GETTABLE;