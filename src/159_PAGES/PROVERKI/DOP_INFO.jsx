import React from 'react'




const DOP_INFO = ({massDopInfo}) => {
    
        const obj = massDopInfo.filter(el=> el.src.includes("MAIN"))[0]
    const org = obj.org
    const ins = obj.ins
    return <>
    <div style={{display:'block', padding:'20px'}}>
    <div style={{color:'black'}}>{`Наименование органа контроля:`} </div>
    <div style={{color:'#1e7cca',fontSize:'18px', fontWeight:700}}>{org} </div>
    
    <div style={{color:'black'}}>{`Инспекторы:`} </div>
    <div style={{color:'#006f90'}}>{ins ? ins :'Отсутствуют  данные о проверяющих '} </div> 
    <hr/>
    
    {massDopInfo.filter(el=> el.src.includes("EVENTS")).length> 0 ?
    <div>
    <p  style={{fontWeight:'700',textTransform:'uppercase',margin:0}}>Перечень действий, осуществляемый в рамках КНМ: </p> 
    
    <div style={{display:'grid'
    ,gridTemplateColumns :'2fr 150px 150px 2fr'
    ,padding:'10px',fontSize:'14px'}}> 
    <div style={{gridColumn:'1',fontSize:'16px',margin:'5px',borderBottom:'1px dotted #193daa'}}>Действия</div>
    <div style={{gridColumn:'2',fontSize:'16px',margin:'5px',borderBottom:'1px dotted #193daa'}}>Дата начала</div>
    <div style={{gridColumn:'3',fontSize:'16px',margin:'5px',borderBottom:'1px dotted #193daa'}}>Дата окончания</div>
    <br/>
    {massDopInfo.filter(el=> el.src.includes("EVENTS"))
    .map( (ev,i)=>{
    return (
    <>
    <div style={{gridColumn:'1'}}>{`${i+1}. ${ev.event_}`}</div>
    <div style={{gridColumn:'2'}}>{` ${new Date(ev.start_date).toLocaleDateString()}`}</div>
    <div style={{gridColumn:'3'}}>{`${new Date(ev.stop_date).toLocaleDateString()}`}</div>
    </>
    )
    })
    }
    </div>
    </div>
    :null}
    
    <p  style={{fontWeight:'700'}}>ИНФОРМАЦИЯ ОБ ОБЪЕКТАХ ПРОВЕРОК: </p> 
    <ul style={{maxHeight:'250px',overflow:'auto',fontSize:'14px',border:'2px solid lightblue',padding:'30px'}}>
    {massDopInfo.filter(adr=> adr.src.includes('OBJECT_DATA'))
    .map ( (a,i)=> {
    
    let x = true
    if(a.type_name.includes('определ') && a.address_type.includes('определ') ) {x=false}
    
    return (
    <>
    <li key={i}>
    <div style={{
    display:'grid'
    ,gridTemplateColumns:'1fr 1fr 50px '
    ,columnGap:'20px'
    
    }}> 
    <div style={{gridColumn:1,borderRight:'3px dotted blue'}}>
    <div style={{ padding:'2px'}}><span style={{color:'#1e7cca',fontWeight:'700'}}> {`Тип объекта:    ` }</span> <span>{a.type_obj}</span></div>
    <div  style={{ padding:'2px'}}><span style={{ fontWeight:'700', color:'#1e7cca'}}> {`Вид объекта:    ` }</span> <span>{a.kind_obj}</span></div>
    { x===true ? <> <span style={{ padding:'2px',fontWeight:'700', color:'#1e7cca'}}> {`Тип адресата:   ` }</span> <span>{a.address_type.includes('определено') ? a.type_name : a.address_type}</span> </>: null}
    </div>
    
    <div style={{gridColumn:2,alignSelf:'center',color:'#1e7cca',fontSize:'16px'}}>
    {a.address}
    
    </div>
    
    
    </div>
    </li>
    <br/>
    </>
    )
    })} </ul>
    
    </div>
    </>
    
    }
    
export default DOP_INFO;