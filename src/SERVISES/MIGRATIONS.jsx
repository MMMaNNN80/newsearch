
import React from "react"
import { useState, useEffect } from "react"
import GET_TABLE_SRC from "../JS/GET_TABLE_SCR"
import { f_get_migr_all_info } from "../JS/SQL"

function MIGRATIONS({setActionList}) {
  const [mass_all, setMass_all] = useState([])
  const [gr, setGr] = useState(0)

  let mmm
  let massTables

  useEffect(() => {
    f_get_migr_all_info().then(mass_all => setMass_all(mass_all))
  }, []);


  if (mass_all.length > 0) {
    mmm = mass_all.filter(el => el.src.includes('УНИК') && el.gr_ < 100)
      .map((el) => {
        const png_addr = el.is_ready === 1 ? `..\\img\\ready.png` : `..\\img\\attention_warning.png`
        return ([
          <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }}><span>{el.gr_}</span></div>,
          <div style={{ display: 'flex', justifyContent: 'center' }}><img alt="status" src={png_addr} height={'25px'} /></div>,
          <div style={{ display: 'flex', justifyContent: 'center' }}><img onClick={() => alert('Запустить группу на загрузку')} alt="start" src="..\img\start.png" height={'20px'} /></div>,
          <div style={{ padding: '3px' }}>
            <div className="btn " onClick={() => setGr(el.gr_)}
              style={{
                background: 'rgb(33, 33, 75)'
                , opacity: gr === el.gr_ ? 1 : 0.9
                , textTransform: 'uppercase'
                , paddingLeft: '40px'
                , width: '95%'
                , fontSize: '25px'
                , textAlign: 'left'
                , color: 'white'
                , fontFamily: 'monospace'
                , letterSpacing: '5'
                 
              }}>{el.comment}</div>
          </div>
        ]
        )
      }

      )
    massTables = mass_all.filter
      (el => el.src.includes("Все") && el.gr_ && el.name.length && (gr !== 0 ? el.gr_ === gr : true))

  }

  if (mass_all.length > 0) {
    return (
        <div style={{
         overflow: 'auto',
          height: '100vh'
        , backgroundColor: '#2f3039'
        ,paddingleft:'10px'
    
        }}>
            
 
        
        <div style={{
  position:'fixed'
          ,fontSize: '60px'
           , fontWeight: 450
           ,width:'auto'
           , color: 'white'
           , background: 'rgb(50 101 146)', padding: '80px'
           , fontFamily: 'sans-serif'
          
         }}>МОНИТОРИНГ МИГРАЦИИ ДАННЫХ </div>   
         <div style={{
     position:'fixed'
       ,border:'1px solid grey'
       ,padding:'8px'
       ,marginTop:'20px'
       ,marginLeft:'5px'
       ,width:'110px'
     , fontSize:'14px'
     , color:'white'

     }}  onClick={()=>{setActionList({open:false,id:0})}}>
        {`<---- НАЗАД`}
        </div>
       
        
            <div style={{ zIndex:0
            }}>
              <div
                style={{
                  display: 'grid'
                  ,paddingTop:'150px'
                  , gridTemplateColumns: '1fr 3fr  50px'
                  , columnGap: '50px'
                  , rowGap: '10px'
                  , alignItems: 'flex-start'
                  , justifyItems: 'flex-start'
                  , color: '#a5aea9'
                  , fontFamily: 'cursive'
                
                  , height: 'auto'
                 ,zindex:0
                }}>
                <div style={{ gridColumn: 1,paddingTop:'200px' }}>
                  <GET_TABLE_SRC massObjCol={
                    [
                      { name: 'Группа загрузок', style: { width: '7%', fontSize: '13px' } },
                      { name: 'Статус', style: { width: '6%', fontSize: '13px' } },
                      { name: 'Запуск', style: { width: '6%', fontSize: '12px' } },
                      { name: `Тематика объектов`, style: { width: '30%', fontSize: '16px' } }
                    ]
                  }
                    massValues={mmm}
                    styleCell={{ background: 'white', alignItems: 'center' }}
                    widthT={{ width: '800px' }}
                    heightT={{ height: 'auto' }}
                    thread={{ background: '#4f64ca' }}
                  />
                </div>
                <div style={{ gridColumn: 2,paddingTop:'200px' }}>
                  <TABLES_INFO />
                </div>
              </div>
            </div>
          </div>
      
    
  
   
)
  } else { return null }

  function TABLES_INFO() {

    return (
      <>
        <div style={{
          height: '1500px', minWidth: '700px'
          , padding: '30px'
          , overflowY: 'auto'
          , color: 'white'
          , fontFamily: 'monospace'
          , letterSpacing: 1
          , fontSize: '18px'
          , borderTop: '1px dotted grey'
          ,zIndex:0
        }}>
          {/* --- */}
          {massTables
            .map((el, i) => {
              const color = el.is_ready ? 'green' : 'blue'
              return (
                <div key={i}
                  style={{

                    border: '1px solid grey'
                    , opacity: 0.98
                    , borderRadius: '6px'
                    , fontStyle: 'oblique'
                    , marginTop: '20px'
                    , boxShadow: `3px 1px 3px  ${color}`
                    ,background:'#4f64ca'
                  }}>

                  <div style={{ fontSize: '22px', padding: '10px', marginLeft: '10px' }}> {`${el.name} `}</div>

                  <div style={{
                    display: 'flex'
                    , justifyContent: 'space-between'
                    , alignItems: 'center'
                    ,background: 'white'
                     ,color:'black'
                     
                  }}>
                    <div style={{ color: 'brown', padding: '10px' }}>
                      <div style={{ fontSize: '18px' }}>Дата посл.загрузки</div>
                      <div style={{
                        color: 'black', padding: '2px'
                      }}> {`${new Date(el.last_proc_date).toLocaleDateString()} `}</div>
                    </div>
                    <div style={{marginRight:'25px'}}> 
                    {el.gr_ < 50 ? <img onClick={() => alert('Запустить группу на загрузку')} alt="start" src="..\img\start.png" height={'20px'} /> : null}
                  </div>
                  </div>
                </div>)
            })}
        </div>
  

      </>
    )

  }

}
export default MIGRATIONS;