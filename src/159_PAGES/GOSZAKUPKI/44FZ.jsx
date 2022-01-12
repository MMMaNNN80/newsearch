
import React, { Fragment } from "react";
import { getEmpty } from "../../JS/properties";

import GETGOSZAKUPKIGOV from "../../JS/FUNC";


const FZ44 = ({ main, inn}) => {
  
   
    if (!main.mass44FZAGG || main.mass44FZAGG.length===0 ) { return getEmpty('Нет данных об участии в закупах в рамках 44ФЗ') }

   const excHback = '483D8B'
   const excHtxt = 'f2f3f7'


       
   

    return (
        <Fragment>
     
          <GETGOSZAKUPKIGOV 
          FZ = {44} 
          mass={main}
          inn={inn} 
          excHback={excHback} 
          excHtxt = {excHtxt}
          />
        </Fragment>
    )

}
export default FZ44;