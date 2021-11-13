
import React  from "react";

function CARD({state,update,setCardstate,cardstate,status,setStatus}) {
    
     if (state) {
        let mass = state

     return  mass.map((obj, num) => 
     {
            const shortname = obj.value;
            const data = obj.data;
            let color = [];
            let branchStyle = {}
            obj.key = num
            if (data.branch_type === 'MAIN') {         
           //data.branch_type = 'Головная компания'
             branchStyle = { color: 'green'}
            }
            if (data.branch_type === 'BRANCH') {
               // data.branch_type = 'Филиал'
                branchStyle = { color: ' rgb(149, 156, 223)' }
                  
            }
            if (data.state && data.state.status === "ACTIVE") { color = { backgroundColor: "green" } }
            else if (data.state && data.state.liquidation_date) {
                color = { backgroundColor: "red" }
            }
            else {
                color = { backgroundColor: "blue" }
            }
 
            const  closeCards= () => { update(null) }

            function setDataReport(key,e) //onClick
            {
                 if (e==='X') {return} //если нажата кнопка закрытия окна
                 //console.log(cardstate)
                
                 // если ни разу не нажимали до этого на подсказку
                if (cardstate===0) {
                   mass = mass.filter(el=>el.key ===key)
                   setCardstate(1) // ставим состояние карты 1 - для работы с ней
                    update(mass)
                               
                    return
            } 
                      
            } 

            function BTNSRC () {
               if(cardstate<1) {return null}
                 return (
                 <div className="btnBlock" style={{"color":"orange"}}>
                    <button id={"CDI"} className="btn btnSrc btn-primary" onClick={(e)=>clickHanhler(e)}> CDI</button>
                    <button id = {"159"} className="btn btnSrc btn-primary" onClick={(e)=>clickHanhler(e)}>Внешний контур</button>
                    <button id ={"151"} className="btn btnSrc btn-primary" onClick={(e)=>clickHanhler(e)}>Продуктив</button>
                 </div>
                 ) 
     
            }

            function clickHanhler(e) {
               
                if (e.target.id==="159"){(status.S159)? setStatus(prev=>
                   { 
                       return {
                    ...prev,
                       S159:false
                    } }) : setStatus(prev=>
                        { 
                            return {
                         ...prev,
                            S159:true
                            
                         } }); setCardstate(2);
                        return
                        }
                        if (e.target.id==="151"){(status.S151)? setStatus(prev=>
                            { 
                                return {
                             ...prev,
                                S151:false
                             } }) : setStatus(prev=>
                                 { 
                                     return {
                                  ...prev,
                                     S151:true
                                  } }); setCardstate(2);
                                 return
                                 }
                                 if (e.target.id==="CDI"){(status.CDI)? setStatus(prev=>
                                    { 
                                        return {
                                     ...prev,
                                        CDI:false
                                     } }) : setStatus(prev=>
                                         { 
                                             return {
                                          ...prev,
                                            CDI :true
                                          } }); setCardstate(2);
                                         return
                                         }
               
               
                
            }

            function BTNCLOSE (){
                if(cardstate >0) return  (
            <button name="X" className ={'btn cardbtn btn-danger'} onClick={closeCards}  >&times;</button>) 
         return null;    
        }

///////////*****************************************************************/////////////////////////////////////////////////////////////////////////////////////////////
         return (
            
                 <div className="card" key={obj.key}
                     onClick={(e) => {
                         setDataReport(obj.key,e.target.name)
    

                     }}>
                     <div className="status " style={color}></div>


                     <div className="reqv  lead">

                         &#9885;  {' ИНН: ' + data.inn + ' КПП: ' + (data.kpp ? data.kpp : '-') + ' ОГРН: ' + (data.ogrn ? data.ogrn : '-')} &#9885;
                     </div>
                     <div className="orginfo">
                         <div className="orgname lead">
                             {shortname}
                         </div>
                         <div className="orgform" style={{ ...branchStyle }}>
                             &#9971;  {
                                 data.branch_type ? data.branch_type : ''
                             }
                         </div>

                         <div className="orgleader">
                             {
                                 !data.management ? '' : data.management.post.toLowerCase() + ': ' + data.management.name
                             }
                         </div>


                         <div className="orgaddress monospace lead">
                             {data.address.unrestricted_value}

                             <BTNCLOSE />
                         </div>
                     </div>
                    <BTNSRC/>
                     <div className="divider  "> </div>
                  
                 </div>
                 


           
         )
     }

     )
    } else { return null; }

}
export default CARD;