
import React, { Fragment } from 'react'



const  GETINSERVICES = ({actionList, setActionList}) => {

 let mass = [
   {id:1, options: ["МОНИТОРИНГ", "http://10.42.78.166:38183"]}
  ,{id:2, options: ["ЧЕРНЫЕ СПИСКИ", "http://10.42.78.166:38185"]}
  ,{id:3, options: ["ОРПОНИЗАЦИЯ АДРЕСОВ", "https://10.42.78.166:38167"]}
  ,{id:4, options: ["МИГРАЦИИ"]}
  ,{id:5, options: ["СХЕМЫ СОВЛАДЕНИЯ"]}

]
  return (
    <>
      <div style={{ display:'inline-block',padding: '5px' }}>
        <p style={{fontWeight:600,color: '#9ca366',fontSize:'30px' }}>ВНУТРЕННИЕ СЕРВИСЫ</p>
        <div style={{ display: 'flex',flexWrap:'wrap',minWidth:'480px', padding: '10px' }}>
          {mass.map((el, i) => {
             
             return (
              <Fragment key={i}>
              {el.options.length> 1 ? 
              <a  style={{padding:'2px'}} key={i} href= {el.options[1]}
                target={"_blank"}
                rel= {`noopener noreferrer`}
              ><button 
              className='btn'
              style={{ fontSize:'13px',minWidth: '70px', padding: '8px',backgroundColor:'#5f6f22' }}
                >
                  {el.options[0]}
                </button>
              </a>
              :     
              <span style={{padding:'2px'}}>
              <button 
                    className='btn'
                    style={{ fontSize:'13px',minWidth: '70px', padding: '8px',backgroundColor:'#5f6f22' }}
                      onClick={()=>setActionList({open:true, id:!actionList.open ? el.id:0})}>
                        {el.options[0]}
                      </button>
                </span>
              }
                </Fragment> 
              
          
            )  
          }  )}    
        </div>

      </div>
    </>
  )
 


}

export default GETINSERVICES;


