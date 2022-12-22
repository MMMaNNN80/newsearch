export function getMainMass(mass) {
    const initmass = mass
    let initialNodes = []
    let initialEdges = []
    let x = 800
    let y = 800
    let r = 500
    let alfa = 90
    let x0 = 800;
    let y0 = 800;

 if (initmass?.length) {
      const mass = initmass?.filter(el => el.src === 'h_data' && el.lvl === 1)
 
   if (mass.length > 20) { x = 500; y = 20 }
     if (mass.length <= 20){
      initialNodes.push(
        {
          id: `${mass.filter(el => el.holder === el.coowner_spark_id)[0].holder}`,
          data: {
            label:
              <div style={{  }}>
                <div style={{display:'flex', width:'100%',background:'white',fontSize: '8px' ,padding: '3px'}}>
                <div style={{ fontWeight: '600',  color: 'black'}}> {`ИНН:  `}</div>   
                <div style={{ fontWeight: '600',  color: 'blue' }}> {mass.filter(el => el.lvl === 1)[0].coowner_inn}</div>
                </div>
                <div style={{ minHeight: '30px', color: 'white', fontWeight: '700', fontSize: '11px', padding: '5px' }}> {mass.filter(el => el.lvl === 1)[0].coowner_name} </div>
                <div style={{ padding: '5px', background: '#455769', fontSize: '8px' }}> {`Совладеет кол-вом компаний -  ${mass.filter(el => el.lvl === 1).length}`} </div>
              </div>
          }
          , style: {
            padding: '0px'
            , backgroundColor: '#188c72'
            , borderRadius: '2px'
            , height: 'auto'
            , width: '150px'
            , textAlign: 'left'
            , border: '1px 1px 1px red'
            ,display: mass.length > 20 ? 'none' :'block'
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
          if (i===0) {y=560;x=800}
          if (i % 6 === 0) { y += 100; x = 560; }
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

        initialNodes.push(
          {
            id: `${el.sparkid}`
            , data: {
              label:
                <div style={{ color: 'black', fontSize: '11px', fontWeight: 700 }}>
                  {`${el.company_name} `}
                </div>
            },
            targetPosition: t_pos,
            position: { x: x, y: y },
            style: { textAlign: 'left', display:'flex' }
            ,inn: el.inn

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