import React from "react";
import GET_MODAL from "../JS/GET_MODAL";
import s from "../CSS/listworks.module.css"
import { useState,   } from "react";



const LIST_WORKS = ({ activeModal, setActiveModal, name }) => {



    return (
        <>
            <GET_MODAL
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                CHILDREN={<CHILDREN />}
                text={name}
                styleHead={{
                    fontSize: '35px'
                    , padding: '5px'
                
                    , fontWeight: '700'
                    , color: '#4a7f7a'
                }} />

        </>
    )

    function CHILDREN() {

        const [massStatus, setMassStatus] = useState([
            //кнопки Юр лица \ ИП
            { id: 0, text: 'Юридические лица', checked: true, type: 'OPF' },
            { id: 1, text: 'Индивидуальные предприниматели', checked: false, type: 'OPF' },
            //кнопки Юр лица \ ИП
            { id: 2, text: 'ТОП-50 по выручке', checked: false, type: 'check' },
            { id: 3, text: 'Подгруппы ОКВЭД', checked: true, type: 'check' },

            { id: 4, text: 'Все', checked: true, type: 'status' },
            { id: 5, text: 'Действующие', checked: false, type: 'status' },
            { id: 6, text: 'Ликвидированные', checked: false, type: 'status' }
        ])

   const  massFilters = [
'Название компании',
'ОКВЭД Основной',
'Директор',
'Регион',
'Телефон',
'Email'
]


        function HandleSubmit(event) {
            event.preventDefault();
            alert('')

        }

       
        let UL=true

        if(massStatus.filter(el=>el.id===1)[0].checked) {UL=false}


        function groupHandler(elem) {
            let mass = []
            if(elem.type==='OPF' || elem.type==='status'){
            mass = massStatus.map(el => {
                if (el.id === elem.id) { el.checked = true }
                if (el.type === elem.type && el.id !== elem.id) { el.checked = false }
                return el
            })}
        
              if(elem.type==='check')
               {mass = massStatus.map(el=> {
                   if(el.id===elem.id) {el.checked = !el.checked} ; 
                   return el })}
             
           if(mass.length>0) {setMassStatus(mass) } else {alert ('groupHandler - пустой массив' )} 

        }

        return (<>
            {<div style={{ color: 'white', fontSize: '80px', zIndex: 7 }}> {''}</div>}

            <hr />
            <div style={{ padding: '10px' }}>
                <form onSubmit={HandleSubmit}>
                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'flex'
                        , fontSize: '10px'

                        , alignItems: 'center'


                    }}>

                        <span className={s.dName} >НАСТРОЙКИ ФИЛЬТРОВ: </span>
 {/* {Кнопки} */}
                        {massStatus.filter(el => el.type === 'OPF')
                            .map(el => {
                                return (<>
                                    <span onClick={() => { groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.text}</span> </>)
                            })}
                    </div>

                    <div style={{
                        textAlign: 'left'
                        , width: 'auto'
                        , display: 'inline-flex'
                        , fontSize: '14px'

                    }}>
                        {/* {Чек боксы} */}
                        {massStatus.filter(el => el.type === 'check')
                            .map(el => {
                                return (
                                    <>
                                
                                    <div className="form-check" style={{ marginLeft: '5px' }} >
                                        <input  onClick={()=>groupHandler(el) } disabled = {!UL && el.text.includes('ТОП')}
                                        className="form-check-input" type="checkbox" value="" id="flexCheckChecked"  checked = {el.checked} />
                                        <label style={{ fontSize: '12px', fontWeight: '700' }} className="form-check-label" htmlFor="flexCheckChecked">
                                            {el.text}
                                        </label>
                                    </div>  </>

                                
                                )})}
                      
                    

               
                </div>
                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'flex'
                        , fontSize: '10px'

                        , alignItems: 'center'


                    }}>

{/* {Кнопки} */}
                {massStatus.filter(el => el.type === 'status')
                            .map(el => {
                                return (<>
                                    <span onClick={() => { groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.text}</span> </>)
                            })}


                    </div>
                    <hr />
                   
                    <div style={{ display: 'grid', gridTemplateColumns: '400px  400px', marginTop: '20px' }}>
                      {

            massFilters.map((el,i)=>{ 
                return (            
      <div  key={i} style={{ gridColumn: i % 2 ===0 ?1 : 2, display:'inline' }}>
      <input type="checkbox"  disabled={true} checked={false}/>
      <input type="text"  placeholder= {' '+el}  style={{
          fontSize: '12px',
          marginLeft: '2px',
          height: '50px',
          marginBottom: '5px',
          width: '90%',
          paddingLeft:'15px'
          }}
          /> 
        <span style={{color:'red'}}>Х</span>
  </div>
                )
}) 
                      }
                  
                    </div>
                    <button type={"submit"}>Submit</button>


                </form>
            </div>
        </>


        )


    }


}

export default LIST_WORKS;