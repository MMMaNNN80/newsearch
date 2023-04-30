import s from '../../CSS/nodes.module.css'
export function getMainMass(mass = []
  ,text = `Выберите компанию для показа структуры совладений`) {
  let initialNodes = []
  let initialEdges = []
  let x = 1800
  let y = 800
  let r = 500
  let alfa = 180
  let x0 = 1800;
  let y0 = 800;

     if (!mass.length) // Нет данных!!!
     {
      return [[{
        id: "1",
        data: {
          label:
            <div style={{
              fontWeight: '700'
              , color: 'black'
              , fontSize: '40px'
              , textAlign: 'center'
              , margin: 'auto  0'
              , display: 'flex'
              ,flexDirection:'column'
              , justifyItems: 'center'
              , alignItems: 'center'
              , background: 'white'
              , height: '100%'

            }}>
                  <div style={{
     
                height: '100%'
                ,width: '100%'
                ,background: 'white'
                ,alignItems:'center'
                , flexDirection:'column'
                ,justifyContent:'center'
                ,alignSelf:'center'
                ,display:'flex'
              }}>
                <div style={{
           borderTop: '1px solid black'
           ,borderBottom: '1px solid black'
           ,padding:'20px'

                }}>
                <p style={{
                  fontWeight: 700, letterSpacing: 2
                  , textAlign: 'left', textTransform: 'uppercase'
                }}>
                  {text}</p>
                  <div style={{ textAlign:'left',padding: '10px',color: 'red', fontSize: '14px' }} >{`*Нет данных для показа`}</div>
              </div>
              </div>
              
            </div>
        }
        ,className:s.main_node
        , style: {
       
        background:'transparent'
        ,width:800
        ,height:800
        ,padding:0
        ,margin:0
        ,border:'none'
        }
        , position: { x: 100, y: 100 }
        

      }],[] ]
    

           
     }
    const initmass = mass

    /// 
    console.log(mass)

 if (initmass?.length) {
      const mass = initmass?.filter(el => el.lvl === 1)
 
   if (mass.length > 20) { x = 800; y = 20 }
     if (mass.length <= 20){
      initialNodes.push(
        {
          id: `${mass.filter(el => el.holder === el.coowner_spark_id)[0].holder}`,
          data: {
            label:
              <div >
                <div className={s.main_node_up}>
                <div title="ИНН:"  className={s.main_up_info}> {mass.filter(el => el.lvl === 1)[0].coowner_inn}</div>
                <div title="ОГРН:"className={s.main_up_info} > {mass.filter(el => el.lvl === 1)[0].coowner_ogrn}</div>
                </div>
                <div className={s.main_node_body}> {mass.filter(el => el.lvl === 1)[0].coowner_name} </div>
                <div className={s.main_node_footer}> 
                {`Совладеет кол-вом компаний -  ${mass.filter(el => el.lvl === 1).length}`} </div>
              </div>
          }
          ,className:s.main_node
          , style: {
           display: mass.length > 20 ? 'none' :'block'
          }
          , sourcePosition: 'right'
          , targetPosition: 'right'
          , position: { x: x, y: y }
          , type: 'mainNode'

        }
      )
    }
      ;
      mass.forEach((el, i) => {
         if (mass.length <= 20) {
          if (i % 10 === 0) { r += 150; }
          if (i === 0) { r = 250; }
          alfa = alfa + 20
          x = x0 + r * Math.cos(alfa)
          y = y0 + r * Math.sin(alfa)
        }
        if (mass.length > 20) {
          if (i===0) {y=760;x=1800}
          if (i % 6 === 0) { y += 100; x = 1800; }
          x += 160
        }

        let t_pos
        if (x > x0) { t_pos = 'left' }
        if (x < x0) { t_pos = 'right' }
        if (y < y0 && Math.abs(x0 - x) < 200) { t_pos = 'bottom' }
        if (y > y0 && Math.abs(x0 - x) < 200) { t_pos = 'top' }

        let sourceHandle;
        if (x > x0 && x - x0 > 100 && y < y0 && y0 - y > 30) { sourceHandle = 'r1' }
        if (x > x0 && x - x0 > 100 && Math.abs(y0 - y) <= 30) { sourceHandle = 'r2' }
        if (x > x0 && x - x0 > 100 && y > y0 && y - y0 > 30) { sourceHandle = 'r3' }

        if (x0 > x && x0 - x > 100 && y < y0 && y0 - y > 50) { sourceHandle = 'l1' }
        if (x0 > x && x0 - x > 100 && Math.abs(y0 - y) <= 50) { sourceHandle = 'l2' }
        if (x0 > x && x0 - x > 100 && y > y0 && y - y0 > 50) { sourceHandle = 'l3' }
        //********************************* */
        if (Math.abs(x - x0) <= 200 && y0 > y) { sourceHandle = 't1' }
        if (Math.abs(x - x0) <= 200 && y0 < y) { sourceHandle = 'b1' }
        
        let bg_
          if(el.share_part=== 100) { bg_='lightgreen'}
          if (el.share_part< 100 && el.share_part>=50 ) {bg_='lightblue'} 
          if (el.share_part<50) {bg_ = 'gold'}
        initialNodes.push(
          {
            id: `${el.sparkid}`
            , data: {
              label:
              <>
              <div style={{fontSize:'8px'
              ,width:'min-content'
              ,margin:'2px'
              ,borderRadius:'50%'
            
              ,padding:'2px'
              ,textAlign:'center'
             
              ,backgroundColor:bg_
            }
              
              }><span style={{color:'white' ,mixBlendMode: 'difference'}}>{ `${el.share_part}%`} </span></div>
              <div style={{width:'100%',padding:'2px'}}>
                <div className={s.node}>
                    <div>
                  {`${el.company_name} `}
                  </div>
                  

                </div>
                
                </div>
                {el.cnt? <div className={s.main_node_footer}> {` Совладеет кол-вом компаний -  ${el.cnt}`} </div>:null}
                </> 
            },
            targetPosition: t_pos,
            position: { x: x, y: y },
            style: { 
              textAlign: 'left'
              ,padding:0
              ,margin:0
              ,minWidth:'auto'
              ,maxWidth:'150px'
              ,borderRadius:'2px'
            }

          })
        initialEdges.push(
          {
            id: `${el.coowner_spark_id}_${el.sparkid}`, source: `${el.lvl <= 1 ? el.holder : el.coowner_spark_id}`
            , target: `${el.sparkid}`
            , label: `${el.share_part}%`
            ,labelBgPadding: [25, 5]
            ,labelBgBorderRadius: 4
            ,labelBgStyle: { fill: 'lightblue', color: 'red', fillOpacity: 0.9 },
            // markerEnd: {
            //   type: 'out'}
            sourceHandle: sourceHandle,
            animated: true
            , style: { stroke: 'black', display: 'block' }
            , hidden: mass.length > 20 ? true : false
          }
        )
      }
      )
      return [initialNodes, initialEdges]
    }

  }