
import React, { Fragment } from 'react'



const  GETINSERVICES = ({actionList, setActionList}) => {
  let mass = []
  let massActions = []
  mass.push(["МОНИТОРИНГ", "http://10.42.78.166:38183"])
  mass.push(["ЧЕРНЫЕ СПИСКИ", "http://10.42.78.166:38185"])
  mass.push(["ОРПОНИЗАЦИЯ АДРЕСОВ", "https://10.42.78.166:38167"])
  massActions.push(["МИГРАЦИИ"])
  massActions.push(["СХЕМЫ СОВЛАДЕНИЯ"])
  // console.log(mass)
console.log(actionList)

  return (
    <>
      <div style={{ display:'inline-block',padding: '5px' }}>
        <p style={{fontWeight:600,color: '#9ca366',fontSize:'30px' }}>ВНУТРЕННИЕ СЕРВИСЫ</p>
        <div style={{ display: 'flex',flexWrap:'wrap',minWidth:'480px', padding: '10px' }}>
          {mass.map((el, i) => {
            return (
              <Fragment key={i}>
              <a  style={{padding:'2px'}} key={i} href= {el[1]}
                target={"_blank"}
                rel="noopener noreferrer"
              ><button 
              className='btn'
              style={{ fontSize:'13px',minWidth: '70px', padding: '8px',backgroundColor:'#1f0b52' }}
                >
                  {el[0]}
                </button>
              </a>
              </Fragment>
              
              
            )    })}
           {massActions.map((el,i) =>{ 
           
           return (
            <Fragment key={i}>     
            <span style={{padding:'2px'}}>
            <button 
                  className='btn'
                  style={{ fontSize:'13px',minWidth: '70px', padding: '8px',backgroundColor:'#1f0b52' }}
                    onClick={()=>setActionList({open:true, id:!actionList.open ? i+1:0})}>
                      {el[0]}
                    </button>
              </span>
              </Fragment>

           )
           })}
   
              

            
      
        </div>

        

      </div>
    </>
  )
 


}

export default GETINSERVICES;


