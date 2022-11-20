import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import { getResponse } from '../JS/properties'

function SEARCHSTRING(props) 

{


    const [inputStyle, setinputStyle] = useState([]);
  
    let navigate= useNavigate()

    let btn_name = ''
    if(props.commercial===0) {btn_name='Коммерческая полная версия'}
    if(props.commercial===1) {btn_name='Бесплатная (без авторизации)'}
    if(props.commercial===2) {btn_name='Бесплатная (с авторизацией)'}


    //suggestions
    const setSuggestions = async (e) => {
        const mass = await getResponse(e)
        if (mass) { props.objState.update(mass.suggestions) }
    }
    return (
        <div className="container" >
            <div className={"lbl  "} >ПОИСК</div>
            <input type="text" name="searchstr" style={{ ...inputStyle }}
                placeholder={'Введите поисковый запрос'}
                onChange={(e) => {
                     navigate('/') 
                    if (e.target.value.length > 0) {
                        setinputStyle(
                            {
                                textTransform: 'uppercase'
                                , fontWeight: '500'
                                , letterSpacing: '1px'
                            })
                            
                    }
                    else { setinputStyle() };
                  props.objState.setCardstate(0);
                  props.objState.clearStatus()
               
                    setSuggestions(e);
                }
                }
            /> 
            <div className='services' style={{paddingTop:'8px',gridRow:2 , gridColumn:'2/3'}} >
          <button  
          
          onClick={()=>{props.param.current = true ;props.setCommercial(()=>{
           if (props.commercial === 0) {return 1}
           if (props.commercial === 1) {return 2}
           if (props.commercial === 2) {return 0}
          });}}
          
          style={{margin:'2px 5px',height:'auto',border:'2px solid green'
          ,padding:'5px'
          ,width:'120px' 
          ,color:'white'
          ,fontSize:'12px'
        }}
          className="btn btnSrc">{btn_name}</button>
            
            
            
            <button   
          
          onClick={()=>{

            if(props){
            ///props.setServices({isOpen:!props.services.isOpen, service_id:  1})
            props.setActiveModal({active:!props.activeModal.active, id:1})
            }
            
          }}
          
          style={{margin:'2px 5px' ,height:'auto',border:'2px solid green'
          ,padding:'5px'
          ,width:'120px' 
          ,color:'white'
          ,fontSize:'12px'
        }}
          className="btn btnSrc">Работа со списками</button>
           <button   
          
          onClick={()=>{

            if(props){
            ///props.setServices({isOpen:!props.services.isOpen, service_id:  1})
            props.setActiveModal({active:!props.activeModal.active, id:2})
            }
            
          }}
          
          style={{margin:'2px 5px' ,height:'auto',border:'2px solid green'
          ,padding:'5px'
          ,width:'120px' 
          ,color:'white'
          ,fontSize:'12px'
        }}
          className="btn btnSrc">{`ИНН ДЕМО`}</button>
          </div>           
                      
         
        </div>
    )
}

export default SEARCHSTRING;
