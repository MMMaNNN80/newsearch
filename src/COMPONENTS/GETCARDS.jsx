import React from 'react'
import '../App.css';
import CARD from './CARD';


function GETCARDS( {state,update,setCardstate,cardstate} ) {

   //  console.log(state)

    return (
        <div className="cards">
            <CARD  state= {state  } update = {update} setCardstate = {setCardstate} cardstate={cardstate}/>
        </div>
    )


    
}
export default GETCARDS;