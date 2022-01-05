
import React, {Fragment} from "react";
//import { useParams } from "react-router";
import FZ44 from "./GOSZAKUPKI/44FZ";
import FZ223 from "./GOSZAKUPKI/223FZ";

import MAIN_CARD from "../JS/MAIN_CARD";
import SPINER from "../JS/SPINER";


const GOSZAKUPKI = ({mainForm,fzObj})=>{

  let inn=''

  let main ={}


if (mainForm && mainForm.inn) {inn = mainForm.inn.value; } else {return null}
if (fzObj.mass && fzObj.mass[0].f_getgoszakupkioptimal) {
    main.mass223FZAGG = fzObj.mass[0].f_getgoszakupkioptimal.filter(el=>el.fz ==='223')
    main.mass44FZAGG =  fzObj.mass[0].f_getgoszakupkioptimal.filter(el=>el.fz ==='44')
}
console.log(main);
  function ZAKUPKI () {
       return (
        <>
        <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center" }}>
         Участие в Госконтрактах 
         </div>         
        {!fzObj.loading? <>

          <FZ44 main = {main} inn={inn}/>
          <FZ223 main = {main} inn={inn}/>
        
      
        </>
         : <SPINER/> }
         </>
       )
}
return(
<Fragment>
    <MAIN_CARD name={mainForm.short_name.value} CHILDREN ={ZAKUPKI} />                   
</Fragment>
  )

}
export default GOSZAKUPKI;




