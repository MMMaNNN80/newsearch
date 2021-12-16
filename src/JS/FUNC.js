import React, { useState, Fragment } from "react"
import { getDetailzakupki_ejs } from "./properties"
import GETTABLE from "../COMPONENTS/GETTABLE"
import { getMassRows } from "./properties"
import  SPINER from  './SPINER'

const GETGOSZAKUPKIGOV = ({ FZ, inn, mass, excHback, excHtxt }) => {
  const [loading, setLoading] = useState(false)
  const [isPmass,setisPmass] = useState(false)

  if (!mass && mass.length < 1) { return null }
  let massALL = []
  let mainMass = []
  let btntxt = ''
////////////////////////////////////////////////////////
  FZ === 44 ? massALL = mass.mass44FZAGG :
    massALL = mass.mass223FZAGG
/////////////////////////////////////////////////////////

  if (!isPmass) {mainMass = massALL.filter(el => el.sort === 'ЗАКАЗЧИК') ; btntxt = 'ЗАКАЗЧИК'}
   
  if(isPmass && massALL.filter(el => el.sort === 'ПОСТАВЩИК').length>0 ) {mainMass = massALL.filter(el => el.sort === 'ПОСТАВЩИК') ; btntxt = 'ПОСТАВЩИК' }


  function X () {
    if((!isPmass && massALL.filter(el => el.sort === 'ПОСТАВЩИК').length>0 )|| (isPmass && massALL.filter(el => el.sort === 'ЗАКАЗЧИК').length>0) ) {
      setisPmass(!isPmass)
    }

  }


  if (!mainMass || mainMass.length < 1) { return null }

  let perTenders = '0'
  let cnt = ''
  let max_cnt = ''
  let massYears = []
  
  mainMass.forEach(el => { if (!massYears.includes(el.years)) { massYears.push(el.years) } })

  const head = [
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '5px' }}>
      <p style={{ gridColumn: 1, margin: 0, padding: '5px' }}>Информация о закупках</p>

      {mainMass.length>0 ? 
     <button className={`btn btn-outline-info`} 
     onClick = {()=>{X()}}
     style={{border:'1px solid violet', width:'90px',
      padding:'5px',opacity:'0.8'}}
     >{btntxt}</button> : setisPmass(!isPmass)}
    </div>
  ]
  mass = []
  mass.push(head)

   let massx = []

 massYears.forEach((year) => {
   massx = [] 
    mass.push
      ([
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 50px minmax(auto,60px) auto 5px'
            , columnGap: '2px', padding: '5px'
          }}>
            {/* ГОДЫ */}
            <div style={{
              gridColumn: 1, gridRow: 1
              , color: 'lightblue'
              , fontSize: '12px'
              , border: '1px solid',
              height: 'min-content',
              borderRadius: '2px',
              marginRight: '8px',
              padding: '5px'
              , alignSelf: 'center'
            }}>{year}</div>

            {/* Количество тендеров */}

            {mainMass.forEach((el) => {
              if (el.years === year) {
                cnt = el.cnt_year // количество тендеров в год
                max_cnt = el.max_cnt_year //максимальное количество за все годы
                perTenders = cnt / max_cnt * 100  // процент 
              }
            })}
            <div style={{
              gridColumn: 2, gridRow: 1
              , height: '20px'
              , width: '45px'
              , padding: '1px'
              , textAlign: 'center'
              , alignSelf: 'center'
              , fontSize: '12px'
              , color: 'violet',
              border: '1px solid',
              borderRadius: '10px',
          
            }}>  {`${Math.round(perTenders)}%`}  </div>

            <div style={{
              fontSize: '18px'
              , gridColumn: 3
              ,justifySelf:'start',
              
              gridRow: 1,
              zIndex: 2, 
              color:'white',
              textShadow:'1px 1px grey',
              
              alignSelf: 'center'
            }}>

              {` ${cnt}`}</div>

            <div className={{}} style={{
              gridColumn: '3', gridRow: 1, alignSelf: 'center'
              , position: 'relative'
            }}>

              <div className={`graf_${FZ}`} style={{
                  width: `${perTenders}%`
                  , height: '50px', alignSelf: 'center', position: 'relative'
              }}>
              </div>
            </div>

{/* Суммы по разным валютам */} 

            {
     mainMass.filter(elem=>elem.years === year)
              .forEach((el, k) => {
                 massx.push([
                    <Fragment key={k}>
{/* Количество в %   */}   
                     
                      <div style={{
                        alignSelf: 'left'
                        , padding: '2px'
                        , fontSize: '10px'
                        , color: 'lime'
                        
                         
                      }}> {Math.round(el.cnt / el.cnt_year * 100) >= 1 ? 
                        `${Math.round(el.cnt / el.cnt_year * 100)}%`
                        : `<1%`}
                      </div>
{/* Типы валют */}             
                      <div className='lead'
                        style={{
                          color: 'white', fontSize: '10px', gridColumn: 2
                        }}>{`${el.currency_name}`}</div>
{/* Количество по валюте */}

                      <div style={{
                        gridColumn: 3

                      }}>{`${el.cnt}`}</div>

               

                     
       {/* <div className={{}} style={{ width: '90%'}}> 
    <div className={`graf_${FZ}_sum`} style={{ ...{
                     height:'10px'
                     ,width: `${el.cnt/el.cnt_year* 100}%`
                     ,gridcolumn:3
                     }}}>    
                </div>
                </div> */} 

                      <div style={{
                        gridColumn: 4
                     
                        , alignSelf: 'center'
                        , fontSize: '14px'
                        , zIndex: 1
                        , fontWeight: '500'

                        , color: 'darkturquoise'
                      }}>{`${el.p_price}`}  </div>
                    </Fragment>
          ])    }  
      )})
            <div className={'smallGrid'} style={{
              gridcolumn: 4
              , gridRow: 1
              , display: 'grid'
              , gridTemplateColumns: 'auto auto  auto auto  auto  '
              , columnGap: '2px'
              , alignSelf: 'center'
              , opacity: '0.9'

            }}>

              {[...massx]}

            {/* Кнопка */}
            <div className={'btn_block'}
              style={{
                gridColumn: '5', gridRow: '1/10', padding: '2px'
              }}
              onClick={() => ExcelDownloadHandler(year,mainMass[0].sort)}>
              {!loading ?
                <>
                <div style={{height:'40px'}}>
                  
                  <img
                    src='..\img\excel_import.png' style={{
                      height: '35px',
                      margin: '1px'
                    }}
                    alt="Скачать"></img>
                  <div style={{
                    fontSize: '10px', alignSelf: 'end', color: 'white'
                  }} >Скачать </div>
                  </div>
                </>
                :
                <div style={{
                  fontSize: '10px', alignSelf: 'end'
                  , color: 'white'
                }} >...</div>

              }
            </div>
          </div>
          </div>
        </>
      ]
      )})




  //   function get_zakupkiPost (el, currencymass) {  
  //       massx = mass_P
  //       massx=massx.filter(element => element.years ===el.years)      
  //  if (massx.length >0)  {
  //      return (
  //          <>
  //     <div style={
  //         {gridColumn:'1/6',gridRow:2
  //     ,display:'block'
  //     ,padding:0
  //     ,margin:0
  //     ,alignSelf:'self-start'
  //     ,fontSize:'10px'
  //      ,color:'white'
  //     ,borderRadius:'10px'}}> 
  //        {`Являлся Поставщиком в ${massx[0].cnt} контрактах:  ${massx[0].p_price}`}
  //          </div>
  //          </>
  //       ) 

  //     } 
  // }


  async function ExcelDownloadHandler(years,sort) {
    let x= 0
  if (sort==='ПОСТАВЩИК') {sort = 1}

    setLoading(true)
    await getDetailzakupki_ejs(inn, years, x, FZ, excHback, excHtxt)
    //getDetailzakupki(inn, years, 44)
    setLoading(false)
  }

  return (
  <Fragment>

{!loading ?  <GETTABLE funcGetRows={[...getMassRows(mass)]}  //Регистрационные данные
      style={{
        tclass: [`fz${FZ}  tblcolorhead`],
        captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
      }}
      name={`Данные о закупках в соответствии с ${FZ}-ФЗ `}
      endtbl={true}
      tStyle={{
        width: '90%',
        margin: 'auto',
        justifyContent: 'center'

      }}
      cut={4}
    /> :<SPINER text={`Файл загружается, дождитесь загрузки...`} val={`60`}/>}
  </Fragment>
  )




}

export default GETGOSZAKUPKIGOV;