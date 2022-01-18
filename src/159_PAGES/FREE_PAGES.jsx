import React, { Fragment } from "react";

import { getEmpty } from "../JS/properties";
import MAIN_CARD from "../JS/MAIN_CARD";
import { NavLink } from "react-router-dom";




const FREE_PAGE = (props) => {


    const mainForm = props.mainForm
    if (!mainForm) { getEmpty('Нет данных') }

    function DATA() {
        let razdelName = 'Административные дела'
        let postHtml = 'Раскрыта инфрмация по арбитражным делам'
        const massList = ['Количество арбитражных дел за период (5 лет)', 
        'Суммы исковых требований'
        , 'Аналитика по роли участия в административных делах'
      , 'Аналитика по категориям административных дел'
      , 'Экспорт арбитражных дел в Excel'
      ]
        let afterHtml = <div>******************************************</div> 
       
        

        return (
            <Fragment>
                <div style={{
                    "color": "lightblue"
                    , "padding": "5px", "margin": "0 auto", "textAlign": "center",fontSize:'20px',fontWeight:'700'
                }}>
                   {razdelName}
                </div>
                <div style={{paddingTop:'10px',color:'lightcoral',fontSize:'14px'}}>
                *** Внимание данные доступны только по платной подписке на ресурс!</div>
                <div style={{padding:'20px',color:"lightgreen"}}>{postHtml}</div>   
                <div className="full" style={{position:'relative'
                , padding: '8px'
                ,minHeight:'600px' }}>
                    <p className="" style={{ color: "orange", fontSize: '18px' ,fontWeight:'600'}}>
                        В данном разделе по платной подписке представлены данные:</p>
                        {massList.length>0 ? < ul style =  {{ "color": "lightblue" , fontSize:'14px'}}>
                    {massList.map((el,i)=> <li key={i}><p>{el}</p></li>)}
       </ul> :null
}
          <div style={{padding:'20px',color:"lightgreen"}}>{afterHtml}</div>    
              
        <div style={{
         position:'absolute' 
    
        ,bottom:'0px'
        ,maxWidth:'100%'
        ,maxHeight:'60px'
        ,minHeight:'auto'
        ,background:'#242468'
   
        ,color: 'white'
        ,fontSize:'13px'}}>
     

        <div style={{padding:'20px'}}>  
         <span style={{marginRight:'5px'}}>Для получения информации по запросу полного доступа необходимо перейти по ссылке   </span>  
           <span> <NavLink to='/'>Условия подключения</NavLink> </span>
           </div>   
        
        </div>  
  
              </div>

      </Fragment >
      
  
    )
  }
return (<Fragment><MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN={DATA} /> </Fragment>)

}

export default FREE_PAGE;




