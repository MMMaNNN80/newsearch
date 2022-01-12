import React, { Fragment } from "react";
import { getEmpty } from "../../JS/properties";

import GETGOSZAKUPKIGOV from "../../JS/FUNC";


const FZ223 = ({ main, inn}) => {
  
   
    if (!main.mass223FZAGG || main.mass223FZAGG.length===0 ) 
    { return getEmpty('Нет данных об участии в закупах в рамках 223ФЗ') }

   const excHback =  '61543b'
   const excHtxt =  'f2f3f7'
   

    return (
        <Fragment>
     
          <GETGOSZAKUPKIGOV 
          FZ = {223} 
          mass={main}
          inn={inn} 
          excHback= {excHback} 
           excHtxt = {excHtxt}
          />
        </Fragment>
    )

    }
export default FZ223;