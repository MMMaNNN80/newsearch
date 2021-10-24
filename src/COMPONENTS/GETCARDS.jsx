import React from 'react'
import '../App.css';
import CARD from './CARD';


function GETCARDS( {state,update} ) {

     console.log(state)

    return (
        <div className="cards">
            <CARD  state= {state  } update = {update} />
        </div>
    )


    
}
export default GETCARDS;