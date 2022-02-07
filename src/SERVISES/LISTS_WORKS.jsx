import React  from "react";
import GET_MODAL from "../JS/GET_MODAL";
import s  from  "../CSS/listworks.module.css"



const  LIST_WORKS =  ({activeModal,setActiveModal,name }) =>{

console.log(s)
   
    return ( 
        <>
    <GET_MODAL 
         activeModal={activeModal} 
         setActiveModal={setActiveModal}  
         CHILDREN = {<CHILDREN/>}
         text ={name}
         styleHead={{
              fontSize: '25px'
            , padding: '5px'
            , textShadow: '1px 1px black'
            ,fontWeight:'700'
            ,color: '#474fa2'
    }} />  
  
    </>
    )

    function CHILDREN () {

        // const massStatus = [
        //     {id:0,text:'Все', checked:1 },
        //     {id:1,text:'Действующие', checked: 0},
        //     {id:2,text:'Ликвидированные', checked: 0}
        // ]
        return( <>
           <hr/>
             <div style={{padding: '10px'}}>
           <form>
                <div style={{

                    textAlign: 'center'
                    , width: 'auto'
                    , display: 'flex'
                    , fontSize: '10px'
                  
                    ,alignItems:'center'

                
                }}>
                    
                    <span  className= {s.dName} >Фильтры: </span>
                    <span className={s.dBtn + ' ' + s.active} style={{ marginRight: '1rem' }}>Юридические лица</span>
                    <span  className={s.dBtn} style={{ }}>Индивидуальные предприниматели</span>


                </div>
                <div style={{
                    textAlign: 'left'
                    , width: 'auto'
                    , display: 'inline-flex'
                    , fontSize: '14px'
                
                }}>

                    <div className="form-check" style={{ marginRight: '5px' }} >
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label style={{ fontSize: '12px', fontWeight: '700' }} className="form-check-label" htmlFor="flexCheckChecked">
                            Топ-50 по выручке
                        </label>
                    </div>
                     
                    <div className="form-check" style={{ marginLeft: '5px' }}>
                   

                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label style={{ fontSize: '12px', fontWeight: '700'  }} className="form-check-label" htmlFor="flexCheckChecked">
                            Подгруппы ОКВЭД
                        </label>
                    </div>
               
                </div>      
                <div style={{

textAlign: 'center'
, width: 'auto'
, display: 'flex'
, fontSize: '10px'

,alignItems:'center'


}}>


<span className={s.dBtn + ' ' + s.active} style={{ marginRight: '5px' }}>Все</span>
<span  className={s.dBtn} style={{marginRight: '5px' }}>Действующие</span>
<span  className={s.dBtn} style={{marginRight: '5px' }}>Ликвидированные</span>

</div>
<hr/>

                <div style={{ display: 'grid', gridTemplateColumns: '300px  300px', marginTop: '20px' }}>
                    <div style={{ gridColumn: 1, gridRow: 1 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Название компании" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                          
                            width: '90%'

                        }} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 1 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Название компании" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                        
                            width: '90%',
                            marginBottom:'5px'

                        }} />
                    </div>
                    <div style={{ gridColumn: 1, gridRow: 2 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Название компании" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                
                            width: '90%',
                            marginBottom:'5px'

                        }} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 2 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Название компании" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                      
                            width: '90%',
                            marginBottom:'5px'

                        }} />
                    </div>

                    

                </div>
                

</form>
</div>
</>


        )
    }
        
    
}

export default LIST_WORKS;