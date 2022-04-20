import React, { useRef,useState } from 'react'
import GET_TABLE_SRC from '../../JS/GET_TABLE_SCR'
import { f_getknm_dopinfo } from '../../JS/SQL'
import GET_MODAL from '../../JS/GET_MODAL'
import MAIN_CARD from '../../JS/MAIN_CARD'
import DOP_INFO from './DOP_INFO'



const PROS_FILTER = ({massMain, mainForm}) => {




    const [activeModal,setActiveModal] = useState({active: false, id:0})
    const[massDopInfo,setMassDopInfo] = useState([])
    const [filter,setFilter] = useState(()=>{
    let obj ={} ;
    obj = getInitialObj(massMain); return obj
     })
    const initRef = useRef(filter)

    return <>

    {activeModal.active ? 
                    <GET_MODAL
                                activeModal={activeModal}
                                setActiveModal={setActiveModal}
                                
                                text={`ДОПОЛНИТЕЛЬНЫЕ СВЕДЕНИЯ ПО ПРОВЕРКАМ`}
                                styleHead={{
                                    fontSize: '20px'
                                    , padding: '20px'
                                    , fontFamily: 'ui-monospace'
                                    , fontWeight: '700'
                                    , color: '#006f90'
                                }}
                                CHILDREN={<DOP_INFO key={1} massDopInfo = {massDopInfo} />}
                                styleBody={{
                                    minWidth: '600px'
                                    , maxWidth: '900px', height: 'auto'
                                    , background: 'white'       
                                   }}  
                            /> :  null}
                    
                    <MAIN_CARD mainForm={mainForm.short_name.value} CHILDREN ={ DATA } />
                              
                                                              </>



    function getInitialObj (mass) //********Начальное положение
    {
        if(mass.length===0) {return null}
        const def = "* Все *"
        let year = [...new Set (mass.map(el=>el.year_))].map(el=>{
            return {val:el,checked:false}})
        ///*******/
        let kind = ([...new Set (mass.map(el=>el.kind))]).map(el=>{return {val:el.toString(),checked:false}})
        let type_knm = ([...new Set (mass.map(el=>el.type_knm))]).map(el=>{return {val:el.toString(),checked:false}})
        let status = [...new Set (mass.map(el=>el.status))].map(el=>{return {val:el.toString(),checked:false}})
        ///
        year.unshift({val:def,checked:true})
        kind.unshift({val:def,checked:true})
        type_knm.unshift({val:def,checked:true})
        status.unshift({val:def,checked:true})
        //все данные
         return {year, kind,type_knm,status,massData:mass }
       }

       function set_unset_check (name,val) // установка всех параметров *** по фильтрам
        {
           let mass=[]
           let massData = {}
           let obj={}
           const Year = filter.year.filter(el=>el.checked===true)[0].val
           const Status = filter.status.filter(el=>el.checked===true)[0].val.toString()
           const Kind  = filter.kind.filter(el=>el.checked===true)[0].val.toString()
           const Kind_knm  = filter.type_knm.filter(el=>el.checked===true)[0].val.toString()
        //****** при нажатии года пересчитать все элементы 
        //****** получить новый массив и пересчитать объект

        
        if(name==="year") {mass = filter.year
                   .map(el=>{ el.val === val ? el.checked=true : el.checked=false; return el;})
       // выделил кнопку
               
       val.toString().includes('Все') ? 
       massData = massMain : massData = massMain.filter(d=> d.year_.toString().includes(val) ) 
       
       // получил массив урезанный по году - сброшенный по всему, кроме года
       
       obj = getInitialObj (massData)
                  setFilter({...obj, year: mass,massData: massData }) //
               }
       
       
           if(name==="status") {mass = filter.status
                       .map(el=>{
                               el.val === val ? el.checked=true : el.checked=false;
                           return el
                       })
                    /// val.toString().includes('Все') ? 
                      massData = massMain.filter(el=>
              
                      ( el.year_ === (Year.toString().includes('Все') ? el.year_ : Year) ) 
                       && ( el.kind === (Kind.toString().includes('Все') ? el.kind : Kind))
                       && ( el.status === (val.includes('Все') ? el.status : val)) 
                       )
                       obj = getInitialObj (massData)
                       console.log(massData)

                     /// : massData = PrevObj.current.massData.filter(d=> d.status.toString().includes(val) ) 
                   
                       setFilter({...filter, status: mass,massData: massData }) 
                           
                   }
                   if(name==="kind") {
                       
                    
                    mass = filter.kind
                    
                       .map(el=>{ el.val === val ? el.checked=true : el.checked=false;
                           return el
                       })
                       
                       /// val.toString().includes('Все') ? 
         massData = massMain.filter(el=>
              
                       el.year_ === (Year.toString().includes('Все') ? el.year_ : Year)
                   && el.status === (Status.toString().includes('Все') ? el.status : Status)    
                   && (el.type_knm === (Kind_knm.toString().includes('Все') ? el.type_knm : Kind_knm) )  
                   && ( el.kind === (val.includes('Все') ? el.kind : val))
                       )
                      obj = getInitialObj (massData)
                      
                      /// : massData = PrevObj.current.massData.filter(d=> d.status.toString().includes(val) ) 
                   
                       setFilter({...filter, kind: mass,massData: massData }) 
                           
                   }
       
                   if(name==="type_knm") {mass = filter.type_knm
                       .map(el=>{ el.val === val ? el.checked=true : el.checked=false;
                           return el
                       })
                       
                       /// val.toString().includes('Все') ? 
         massData = massMain.filter(el=>
              
                       el.year_ === (Year.toString().includes('Все') ? el.year_ : Year)
                   && el.status === (Status.toString().includes('Все') ? el.status : Status) 
                   && ( el.kind === (Kind.toString().includes('Все') ? el.kind : Kind))   
                   && ( el.type_knm === (val.includes('Все') ? el.type_knm : val))
                       )
                      obj = getInitialObj (massData)
                      
                      /// : massData = PrevObj.current.massData.filter(d=> d.status.toString().includes(val) ) 
                   
                       setFilter({...filter, type_knm: mass,massData: massData }) 
                           
                   }             
               
               }

    
    function DATA() {
    
function FILTER_PANEL ()
 
 { 
return (<>
        <div  style={{
         display:'grid'
        ,alignItems:'center'
        ,gridTemplateColumns: '140px 150px auto 20px' 
        ,width:'100%'
        ,height:'auto'
        ,background:'#33335d'
        ,padding:'10px'
        ,borderRadius:'5px'}}>
            {/* {getMainText (`ФИЛЬТРЫ`)} */}
            <div style={{gridColumn:'1',borderRight:'1px solid red',padding:'5px',height:'100%'}}>
                  {/* Кнопки годов */}
          <div style={{color:'aqua', fontSize:'11px',paddingBottom:'5px'}}>Выберите доступный период: </div>
         
        
        {filter.year.map((year,i) => {
      
        return ( <button key={i}
                className="btn btn-outline-info"
                style={{width:'50px',padding:'4px',margin:'2px'
                ,background: year.checked ? '#0dcaf0' :'none'
                ,color: year.checked ? 'black' :'white' 
            }}
             onClick={()=>{   set_unset_check('year',year.val)
                
            }}     
                >
                {year.val}
            </button>)
         }   
        )        }      
            </div>
        
        
            <div style={{gridColumn:2,borderRight:'1px solid red',paddingLeft:'10px' ,paddingRight:'10px',height:'100%'}}>
                    
            <div style={{color:'aqua', fontSize:'11px',paddingBottom:'5px'}}>Виды проверок: </div>
           
                <select   
                
                onChange={ (e)=> {set_unset_check('kind',e.target.value)}} 
                
                style={{width:'100%',height:'auto',fontSize:'10px',marginBottom:'10px'}}>
                {filter.kind.map((kind,i) => 
            <option key={i}   selected = {kind.checked }
                className=""
                 style={{}}
                
                value={kind.val}
                >
                {kind.val}
            </option>
            
            )}
            </select> <br/>
        
            <div style={{color:'aqua', fontSize:'11px',paddingBottom:'5px'}}>Типы проверок: </div>
            <select   onChange={ (e)=> {set_unset_check('type_knm',e.target.value)}} 
             style={{width:'100%',height:'auto',fontSize:'10px'}}>
                {filter.type_knm.map((type_knm,i) => 
            <option key={i} selected = {type_knm.checked }
                className=""
                 style={{}}
                onClick={()=>{}}
                value={type_knm.val}
                >
                {type_knm.val}
            </option>
            
            )}
            </select> <br/>
        
              </div>
              <div style={{gridColumn:3,padding:'5px',paddingRight:'10px',height:'100%'}}>
              <div style={{color:'aqua', fontSize:'11px',paddingBottom:'5px'}}>Выберите статус: </div>
         
         {filter.status.map((status,i) => 
        
             <button key={i}
                 className="btn btn-outline-info"
                 style={{minWidth:'40px',maxWidth:'120px',padding:'5px'
                 ,background: status.checked ? '#0dcaf0' :'none'
                 ,color: status.checked ? 'black' :'white' 
                }}
                 onClick={()=>{set_unset_check('status',status.val)}}
                 >
                 {status.val}
             </button>
        
             )}         
                  </div>    
        
                  <div style={{gridColumn:4,padding:'5px',paddingRight:'10px',height:'100%'}}>
              <div
              onClick={()=>{setFilter(initRef.current)}}
              style={{
               color:'aqua'
              ,height:'10px'
              ,width:'10px'
             ,background:'red'
             ,borderRadius:'20px'
             ,cursor:'pointer'
             }}>  </div> </div>

             <span  style={{color:'gold',fontSize:'10px',gridColumn:'3',paddingLeft:'10px'}}>{`***Показано: ${filter.massData.length} записей из ${massMain.length}`}</span>
            
        </div>

</>)

 } 
 

 function getDopInfo ( rp_id=0, ins='', org='' ){       
                     f_getknm_dopinfo(rp_id)
                     .then((mass)=>{
                        if(mass.length>0) {
                            mass.push({src:'MAIN', org:org, ins:ins}
                            )}
                            setMassDopInfo(mass)
                         return mass
                     }
                     ).then(m=> {if (m.length>0) { setActiveModal({active:true,id:0})} })  }


function getMassData(mass) {

                 
                 return mass.map((data, i) => {
                     let address = data.address.split("#")
                     let inspectors = data.inspectors_fio.split("#").join(', ')
                     let style = { background: 'aqua' }
                     if (data.status.includes('Завер')) { style = { background: 'green' } }
                     if (data.status.includes('Ожидает')) { style = { background: 'orange' } }
         
                     return [
                         i + 1
                         , <><div>{new Date(data.start_date).toLocaleDateString()}</div></>
                         , <>
                             <div style={{ display: 'flex', padding: '2px',alignItems:'center' }}>
                               <div style={{display: 'flex',}}> <div className="quadr" style={style}></div>
                                 <div style={{ "display": "inline-flex" }}>{data.status}</div>
                                 </div>
                                 <button key={i}
             className="btn btn-outline-info"
             style={{width:'auto',padding:'3px',marginLeft:'10px'}}
          onClick={()=>getDopInfo(data.report_id,inspectors,data.gov_name.toUpperCase())}     >
             {`Подробнее...`}
         </button>

                     </div>
                             <div style={{fontWeight:'700',color:'white',fontSize:'13px'}}>{`${data.type_knm} . ${data.kind}`}
                             </div>
                             <ul style={{ color: 'lightblue', margin: '2px' }}>
                                 {address.map((a, n) => <li key={n} style={{ padding: '0px', margin: '5px' }}>{a}</li>)}
                             </ul>
                    
                         </>
                         , <><div style={{ paddingBottom:'5px',color: '#f9cd57',fontSize:'10px',height:'max-content' }}>{data.gov_name.toUpperCase()}</div>
                                
                                <hr style={{margin:'5px'}}/>
                                {inspectors && inspectors.length>0 ? <div>

                             <div style={{paddingTop:'0px'}}>Инспекторы:</div>
                          <div style={{paddingTop:'3px',color:'#88e0e2',height:'50px',overflow:'auto'}} key={i}>{inspectors}</div>
                          
                             </div>
                             :null }
                 
                          </>]
                 }
                 )
             }
            if (mainForm.knm_cnt >0) { 
          return (<>
                    <FILTER_PANEL/>
                                
                                <hr/>
                    <GET_TABLE_SRC key={2} 
                    styleCell={{color:'white',background:'#33335d',fontSize:'11px',border:'1px solid grey' }}
                    thread={{background:'#3e47a7',borderBottom:'1px solid black',fontSize:'8px'}}
                    massObjCol={
                   [
                   { name: '#', style: { width: '6%' } },
                   { name: 'Дата', style: { width: '13%' } },
                   { name: 'Информация по проверке', style: { width: '50%' } },
                   { name: 'Проверяющие организации', style: { width: '50%'} },
                                                                              
                    ]} massValues={getMassData(filter.massData)} heightT={{ maxHeight:'400px' }} />              
                        </>)
                        } else {return null}
                    } 

        
            }
    
export default PROS_FILTER;