import React from "react";
import GET_MODAL from "../JS/GET_MODAL";
import s from "../CSS/listworks.module.css"
import { useState, useRef } from "react";
import { f_getDictionary } from "../JS/SQL";
import { f_getResult,f_getlistsresult_ip_do } from "../JS/SQL";
import GET_TABLE_SRC from "../JS/GET_TABLE_SCR"
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';
import Spinner from 'react-bootstrap/Spinner';
import {getListWorkData_ejs} from '../JS/preExportExcel'
//import e from "cors";


registerLocale("ru", ru);



const LIST_WORKS = ({ activeModal, setActiveModal, name }) => {

    const [massDic, setMassDic] = useState([])
    const load = useRef(false)
    const minVal = useRef('')
    const maxVal = useRef('')
    const [err,setErr] = useState(false)
    const massExcel = useRef([])


    if (!load.current) {
        load.current = false
        f_getDictionary()
            .then(mass => {
                setMassDic(mass)
                load.current = true
            })
    } return (
        <> <GET_MODAL
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            CHILDREN={<CHILDREN key={1} />}
            text={name}
            styleHead={{
                fontSize: '30px'
                , padding: '8px'
                , fontFamily: 'ui-monospace'
                , fontWeight: '700'
                , color: '#006f90'
            }}
            styleBody={{
                minWidth: '1000px'
                , maxWidth: '1200px', height: 'auto'
                , background: '#e6e6e6'
                ,
            }}
        />

        </>
    )

function CHILDREN() {

        const [result, setResult] = useState({ load: false, massData: [] })
        const startDate = useRef('')
        const endDate = useRef('')
  
        const [isCollapse, setCollapse] = useState(false)
        let UL = true

        let mass = [
            { id: 0, type_p: 'Фильтр (форма собственности)', name: 'Юридические лица', checked: true, type: 'OPF', code: '0' },
            { id: 1, type_p: 'Фильтр (форма собственности)', name: 'ИП', checked: false, type: 'OPF', code: '1' },
            //кнопки Юр лица \ ИП
            { id: 2, type_p: 'Доп. признак (ТОП 50)', name: 'ТОП-50 по выручке', checked: false, type: 'check', code: '*' },
            { id: 3, type_p: 'Доп. признак (включать подгруппы ОКВЭД)', name: 'Подгруппы ОКВЭД', checked: true, type: 'check', code: '*' },
            { id: 4, type_p: 'Фильтр (Статус)', name: 'Все', checked: true, type: 'status', code: 9 },
            { id: 5, type_p: 'Фильтр (Статус)', name: 'Действующие', checked: false, type: 'status', code: 1 },
            { id: 6, type_p: 'Фильтр (Статус)', name: 'Ликвидированные', checked: false, type: 'status', code: 0 }]

        const massNames = ['ОКВЭД Основной', 'Регион', 'Лидер']  // ---'Дата регистрации', 'Капитал'

        massNames.forEach(el => {
            mass.push({ id: mass.length, type_p: `Фильтр (${el})`, name: el, text: '', checked: false, type: 'txtBox', disabled: true, clear: true, code: '' })
        })

        mass.push({ id: mass.length, type_p: 'Фильтр (уставной капитал)', name: 'Все', checked: true, type: 'RangeC', code: '' })
        mass.push({ id: mass.length, type_p: 'Фильтр (уставной капитал)', name: 'до 10 тыс руб', checked: false, type: 'RangeC', code: '0,10000' })
        mass.push({ id: mass.length, type_p: 'Фильтр (уставной капитал)', name: 'до 100 тыс руб', checked: false, type: 'RangeC', code: '0,100000' })
        mass.push({ id: mass.length, type_p: 'Фильтр (уставной капитал)', name: 'до 1млн руб', checked: false, type: 'RangeC', code: '0,1000000' })
        mass.push({ id: mass.length, type_p: 'Фильтр (уставной капитал)', name: 'более 1млн руб', checked: false, type: 'RangeC', code: '1000000,10000000000' })
        mass.push({ id: mass.length, type_p: 'Фильтр (Дата регистрации)', name: 'Дата регистрации', checked: false, type: 'Range', code: '' })
        mass.push({ id: mass.length, type_p: 'Фильтр - Выручка', name: 'Вкл ', checked: false, type: 'RangeRev', code: !minVal.current && !maxVal.current ? 
         `${minVal.current},${maxVal.current}`:null})
        mass.push({ id: mass.length, type_p: 'Фильтр поиск по ИНН', name: 'Поиск по ИНН', checked: false, type: 'TextAreaINN', code: 'используется',cnt: 0 })


        const [massStatus, setMassStatus] = useState(mass) //Главный массив
        const [view, setView] = useState([]) // меню - готовая разметка
        const act = useRef({ act: false, id: '' })   // для прокидывания переменной


        let massX = []
        if (massStatus.filter(el => el.id === 1)[0].checked) { UL = false }

        return (
            <>
                {GET_HEAD()}
                <div style={{ padding: '5px' }}>
                    <form onSubmit={(e) => e.preventDefault()} >
                        <div style={{ display: isCollapse ? 'none' : 'block' }}>
                             <hr />
                            <Tabs defaultTab="1">
                                <TabList>
                                    <Tab  tabFor="1"><span style={{ color: '#006f90', fontWeight: '700' }}>ОСНОВНЫЕ ФИЛЬТРЫ</span></Tab>
                                    <Tab tabFor="2"><span style={{ color: '#006f90', fontWeight: '700' }}>ПОИСК ПО ИНН</span> </Tab>
                                </TabList>
                                <TabPanel  tabId="1">
                                    <div style={{ marginTop: '10px' }}>
                                            {DOP_OPTIONS()}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr  2fr 1fr', padding: '5px' }}>
                                            {TEXT_REASON()}
                                           <div style={{gridRow:4,gridColumn:'1/3'}}>   {REVENUE()} </div>  
      
                                        <div style={{ gridColumn: 3, gridRow: '1/5', borderLeft: '3px dotted black' }}>
                                            {DATEPICKER()}
                                            <div > {CHARTER_CAPITAL()}</div>   
                                        </div>
                                 
                                    </div>
                                </TabPanel>
                                <TabPanel tabId="2">
                                            {GET_INN()}
                                </TabPanel>
                            </Tabs>
                            <hr />
                            <br />
                        </div>
                        <div style={{
                            width: '100%', background: '#084153', padding: '25px'
                            , display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: '10px'
                        }}>
        <div style={{ color: 'orange', fontWeight: 700, gridColumn: '1/2' }}>КРИТЕРИИ ПОИСКА:</div>
        <ul style={{ gridColumn: '1', color: 'white', fontSize: '12px' }}>
                                {massStatus.filter(el => el.checked).map((el, i) => {
                                    let rangeRev =''
                                    if (minVal.current && !maxVal.current) {rangeRev = `от ${minVal.current}` }
                                    if (!minVal.current && maxVal.current) {rangeRev = `до ${maxVal.current}` }
                                    if (minVal.current && maxVal.current) {rangeRev = `от ${minVal.current} до ${maxVal.current}` }

                                    let val = ''

                                    if (el.type.includes('OPF')) {val = el.name}
                                    if (el.type_p.includes('Доп')) { val = '+ вкл' }
                                    if (el.type.includes('txt')) { val = el.text }
                                    if (el.type_p.includes('ИНН')) { val = `+ используется ${el.cnt} ИНН для поиска` }
                                    if (el.type_p.includes('Дата регистра')) { val = ` Выбран дипапазон: ${startDate.current ? startDate.current.toLocaleDateString() : ''} - ${endDate.current ? endDate.current.toLocaleDateString() : ''} ` }
                                    if (el.type_p.includes('Выручк')){val = rangeRev}
                                    if (!val) { val = `${el.name}` }
                                    return <li key={i}> <span > {el.type_p}</span>
                                        <span style={{ color: '#38ef9e', marginLeft: '10px', fontSize: '12px' }}>{"--------------> " + val}</span>  </li>})}


                            </ul>

                            <div style={{ display: 'flex', gridColumn: '2', gridRow: '1',justifySelf:'end', }}>
                            <button  disabled ={result.load}
                            style={{ width: '90px', height: '30px' }} className="btn btn-secondary"
                            
                            onClick={()=> {getResult(result.massData, UL)}}>ПОКАЗАТЬ  </button>
                                <button disabled  = {result.massData.length===0 } 
                                style={{ width: '90px', height: '30px' }} className="btn btn-success"
                            
                                onClick={()=> {getListWorkData_ejs(massExcel.current, UL);massExcel.current=[]}}> 
                                      <div style={{ display: 'flex',alignItems:'center',justifyContent:'center'}}>
                                          <div>ВЫГРУЗИТЬ</div> <div><img  style={{height:'30px'}} alt="" src="..\img\excel_import.png"></img></div> 
                                      </div> 
                                    </button>

                                <button style={{ width: '90px', height: '30px' }} onClick={() => {
                                    //alert(('').replace(/\D/g, ''))
                                    startDate.current = ''
                                    endDate.current=''
                                    minVal.current=''
                                    ;maxVal.current=''
                                    ;massExcel.current = []
                                    ;setErr(false)
                                    ;setCollapse(false)
                                    ;setMassStatus(mass)
                                    ;setResult({load:false,massData:[]}) }} 
                                className="btn btn-danger">ОЧИСТИТЬ</button>
                            </div>
                            
                            
                           {result.massData.length===0 ? null: <div style={{fontSize:'12px',padding:'10px',gridColumn: '2',gridRow:'2/4',color:'white',justifySelf:'end'}}>
                                
                             {`Результирующее количество строк показано ${result.massData.length}  из ${massExcel.current.length} готовых к экспорту.`}    </div>}

                                 </div>

                        { !result.load && result.massData.length>0 ?
                            <div style={{ padding: '20px' }}>

                                <GET_TABLE_SRC
                                    massObjCol={UL ?
                                        [
                                            { name: '#', style: { width: '5%' } },
                                            { name: 'Основная информация о организации', style: { width: '45%' } },
                                            { name: 'Коды организации', style: { width: '15%' } },
                                            { name: 'ОКВЭД(основной)', style: { width: '20%' } },
                                            { name: 'ФИО руководителя', style: { width: '15%' } },

                                        ] : [
                                            { name: '#', style: { width: '5%' } },
                                            { name: 'Наименование ИП', style: { width: '55%' } },
                                            { name: 'Коды ИП', style: { width: '15%' } },
                                            { name: 'ОКВЭД(основной)', style: { width: '25%' } },
                                        ]
                                    } massValues={ result.massData} heightT={{ height: !isCollapse ? '300px' : '700px' }} /> </div>
                            :result.load  ? <div style={{textAlign:'center',paddingTop:'50px'}}>
                                <Spinner animation="border"  style={{width: '100px',height:'100px',borderWidth:'20px'}} variant="primary"/></div>:null}

                        {/* ******************************************************************************************************************** */}
                    </form>
                </div>
            </>
        )


        


        //// Результат     
        async function getResult() {
           // console.log(massStatus)
            if((Number(minVal.current) > Number(maxVal.current) ) && massStatus.filter(el=>el.type.includes("RangeRev"))[0].checked
            )   {alert (`${minVal.current}  ${maxVal.current}`);setErr(true);return}
            setErr(false)
       
            setResult({load:true, massData:[]})
   
   if(UL) {

            f_getResult(
                JSON.stringify(massStatus).replaceAll('"', '\\"'), 50000) // ----Json в postgres
                .then(mass => {
                     // console.log(mass)
                  
                       massExcel.current = mass
                    if (mass && mass.length > 0) {
                        mass = mass.slice(0,1000).map((el, i) => {
                            return [
                                <span style={{ fontSize: '10px' }}>{i + 1}</span>,  // номер
                                <>   {/*Название компании*/}
                                <div style={{display:'grid',gridTemplateColumns: '1fr 160px',columnGap:'10px'}}>
                                    <div style={{gridColumn:1}}>
                                    <span>
                                        <div className="quadr" style={{ "display": "inline-flex", 'background': el.isacting && el.isacting === 1 ? 'green' : 'red' }}></div>
                                        <div style={{ "display": "inline", color: 'blue', fontWeight: '700' }}>
                                            {el.shortnamerus && el.okved && el.shortnamerus.length > 1 ? el.shortnamerus : el.fullnamerus}</div>
                                    </span>
                                    
                                    {el.regionname && el.regionname.length > 0 ? <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Регион: ${el.regionname}`}</div> : null}
                                    {el.datefirstreg && el.datefirstreg.length > 0 ? <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Дата регистрации: ${new Date(el.datefirstreg).toLocaleDateString()}`}</div> : null}
                                    </div>
                                    <div style={{gridColumn:2,fontSize:'12px'}}> 
                                    {el.chartercapital && el.chartercapital > 0 ? <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Уставной капитал: ${el.chartercapital}`}</div> : null}
                                    <div style={{ paddingTop: '2px', paddingBottom: '2px',color:'#262df4' }}>{`ФИН.ПЕРИОД: ${el.period} ГОД:`}</div> 
                                    <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Выручка: ${el.revenue2110}`}</div> 
                                    <span style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Прибыль/убыток: `}</span>
                                    <span style={{color: el.pribil2400>=0 ? 'green': 'red' }}>{el.pribil2400}</span>
                                    </div>
                                    </div>
                                </>
                                , <> {/*Реквизиты*/}
                                    <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                                        <div>{`ИНН:  ${el.inn}`}</div>
                                        <div>{`КПП:  ${el.kpp}`}</div>
                                        <div>{`ОГРН: ${el.ogrn}`}</div>
                                    </div>
                                </>
                                /*ОКВЭД*/
                                , <div style={{fontSize:'12px'}}>{(el.okved_code ? el.okved_code : '') + ' ' + (el.okved ? el.okved : '')}</div>
                                /*Лидер*/
                                , <><span style={{ color: 'blue' }}>{el.position}</span> <span>{el.fio}</span> </>
    ]
                        })}
                    setResult({ load: false, massData: mass })
                })}
if (!UL) {
    f_getlistsresult_ip_do(
        JSON.stringify(massStatus).replaceAll('"', '\\"'), 30000)
        .then(mass=> {
            massExcel.current = mass 
            if (mass && mass.length > 0) {
            mass = mass.slice(0,1000).map((el, i) => { 
                return [
                     <span style={{ fontSize: '10px' }}>{i + 1}</span>
                    ,<div style={{display:'grid',gridTemplateColumns: '1fr 160px',columnGap:'10px'}}>
                    <div style={{gridColumn:1}}>
                    <span>
                        <div className="quadr" style={{ "display": "inline-flex", 'background': el.isacting ? 'green' : 'red' }}></div>
                        <div style={{ "display": "inline", color: 'blue', fontWeight: '700' }}>
                            {el.full_name_rus }</div>
                    </span>
                       {el.address && el.address.length > 0 ? <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Регион: ${el.address}`}</div> : null}
                    {el.date_first_reg && el.date_first_reg.length > 0 ? <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>{`Дата регистрации: ${el.date_first_reg}`}</div> : null}
                    </div>
                    </div>
                    ,<> {/*Реквизиты*/}
                                        <div style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                                            <div>{`ИНН:  ${el.inn}`}</div>
                                            <div>{`ОГРНИП: ${el.ogrnip}`}</div>
                                        </div>
                    </>                       
                 ,<>    {/*ОКВЭД*/}
                  <div style={{fontSize:'12px'}}>
                     {(el.okved_code ? el.okved_code : '') + ' ' + (el.okved_name ? el.okved_name : '')}
                 </div>
                 </>
                    ] })
        setResult({ load: false, massData: mass })
    }} )}
}

 function handleChangeInnTextArea(e) {
            let mass = []
            let massCode = []
            
            mass = massStatus
                .map(el => {
                    if (el.type.includes('INN')) {
                        el.code = e.target.value.replace(/\D/g, ',').replace(/(\n)\1{1,}/gu, '$1');
                         massCode = el.code.split(',').filter(el=> el.length===10 || el.length===12) 
                      el.code = massCode.join(',') 
                      el.text = e.target.value
                      el.cnt = massCode.length

                    }
                    
                    return el
                })
    
            setMassStatus(mass)


        }

        function InnTextAreaMake(e) {
            let mass = []
            mass = massStatus
                .map(el => {
                    if (el.type.includes('INN')) {
                        el.text = el.code
                    }
                    
                    return el
                })
    
            setMassStatus(mass)


        }


        async function Handler(e, el) {

            if (el.name.includes('ОКВЭД')) {

                massX = massDic
                    .filter(el => el.src === "OKVED"
                        && (el.Name.includes(e.target.value) || el.short_name.includes(e.target.value))).map(el => {
                            return { id: el.Name, value: (el.Name + '  ' + el.short_name) }
                        }).sort((a, b) => a.id > b.id)

            }

            if (el.name.includes('Регион')) {

                massX = massDic.filter(el => el.src.includes("REGION")
                    && (el.Name.includes(e.target.value) || el.code.includes(e.target.value))).map(el => {
                        return { id: el.code, value: (el.code + '  ' + el.Name) }
                    })

            }

            massX = Array.from(new Set(massX.map(JSON.stringify))).map(JSON.parse) //убрали дубли
            act.current.act = false
            act.current.id = el.id

            setView(SuggMenu(massX, el))

        }


        function SuggMenu(mass, element) { //подсказка
            return <>
                <div style={{
                    position: 'absolute'
                    , zIndex: 10
                    , top: 50
                    , border: '1px solid grey'
                    , width: '80%', marginLeft: '15px', background: 'whitesmoke', maxHeight: '500px', overflow: 'auto'
                }}>

                    {mass.map((el_names) => {
                        return (
                            <div key={el_names.id} style={{ paddingLeft: '5px', paddingRight: '5px', width: '100%' }}
                            >
                                <div id={el_names.id} className={s.menuItem}
                                    value={el_names.value}
                                    onClick={() => {

                                        setMassStatus(
                                            massStatus.map(el => {
                                                if (el.id === element.id)
                                                // прокинул id 'элемента, куда нужно добавить выбранное
                                                {
                                                    el.text = el_names.value /// ---добавили имя где его выбрали
                                                    el.checked = true
                                                    el.disabled = false
                                                    el.code = el_names.id
                                                } return el

                                            }))
                                        act.current.act = true
                                        act.current.id = element.id
                                    }}>
                                    {el_names.value}

                                </div>
                            </div>
                        )
                    })}

                </div>
            </>

        }

        // Кнопки сверху и чекбоксы

        function groupHandler(elem) {

            let mass = []
            if (elem.type === 'OPF' || elem.type === 'status') {
                mass = massStatus.map(el => {
                    if (el.id === elem.id) { el.checked = true }
                    if (el.type === elem.type && el.id !== elem.id) { el.checked = false }
                    return el
                })
            }
            if (elem.type === 'check') {

                mass = massStatus.map(el => {
                    if (el.id === elem.id) { el.checked = !el.checked }; return el
                })
            }

            if (elem.type.includes('RangeC')) {

                mass = massStatus.map(el => {
                    if (el.id === elem.id) { el.checked = true }
                    if (el.type === elem.type && el.id !== elem.id) { el.checked = false }
                    return el

                })
            }

            
            if (mass.length > 0) { setMassStatus(mass) } else { alert('groupHandler - пустой массив') }

        }


        /// КОМПОНЕНТЫ 
        /* Формы собственности */
        function FORM_COWNERS() {
            return (<>



                <div style={{ display: "flex", alignItems: 'flex-start' }}>

                    {massStatus.filter(el => el.type === 'OPF')
                        .map((el, i) => {
                            return (<>
                                <span key={i} onClick={() => { groupHandler(el) }}
                                    className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                    style={{ marginRight: '1rem' }}>{el.name}</span>

                            </>)
                        })}
                </div>



            </>
            )
        }

        function STATUS() {
   return (<>
                {/* {Кнопки} */}
                <div style={{ display: 'flex' }}>
                    {massStatus.filter(el => el.type === 'status')
                        .map((el) => {
                            return (<>
                                <button onClick={() => { groupHandler(el) }}
                                    className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                    style={{ marginLeft: '5px' }}
                                >
                                    {el.name}
                                </button>
                            </>)
                        })}

                </div>
            </>
            )
        }

        function DOP_OPTIONS() {
            return (<>
                {/* {Чек боксы} */}

                <div style={{
                    textAlign: 'center'
                    , width: 'auto'
                    , display: 'flex'
                    , fontSize: '10px'
                    , gridColumn: '1/4'
                    , gridRow: 2
                    , alignItems: 'center'
                }}>
                    <div className={s.module_header} style={{}}>Дополнительные опции:</div>
                    <div style={{
                        textAlign: 'left'
                        , display: 'flex'
                        , fontSize: '14px'
                        , padding: '5px 10px'
                        , whiteSpace: 'nowrap'
                    }}>
                        {massStatus.filter(el => el.type === 'check')
                            .map((el) => {
                                return (
                                    <div key={el.id} className="form-check" style={{ marginLeft: '5px' }} >
                                        <input onChange={() => groupHandler(el)} disabled={!UL && el.name.includes('ТОП')}
                                            className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={(el.name.includes('ТОП') ? el.checked && UL : el.checked)} />
                                        <label key={el.id} style={{ fontSize: '12px', fontWeight: '700' }} className="form-check-label" htmlFor="flexCheckChecked">
                                            {el.name}
                                        </label>
                                    </div>
                                )
                            })}

                    </div>
                </div>
            </>
            )
        }


function REVENUE() {

 
    return (
        <>     
 <div style={{
                        alignSelf: 'center',
                        display: 'inline-flex',
                        alignItems: 'center'
                    }}>
                                
                                <input type='checkbox' 
                               checked= {massStatus.filter(el=>el.type.includes("RangeRev"))[0].checked}
                               disabled={!UL}
                            onChange={() => {
                                setMassStatus(massStatus.map(
                                    el => {
                                        return el.type.includes("RangeRev") ?
                                            { ...el, checked: !el.checked } : el
                                    }))

                            }} />
                                
                    <div style={{display:'flex'}}>
            <div className={s.module_header}
                style={{ paddingLeft: '1rem' }}
            >Выберите значения выручки от</div>

             <div style={{fontSize:'12px'}}>
              <input type={'number'}
              value={minVal.current}
              disabled={!UL}
              onChange = {(e)=>
                {
                  let mass=[]
                minVal.current =  e.target.value;
              
                mass = massStatus.map(el=> { 
                return el.type.includes("RangeRev") ?
                   { ...el, code: (!minVal.current && !maxVal.current) ? '':
                     [minVal.current ? minVal.current.replace(/\D/g, ''):''
                     ,maxVal.current  ? maxVal.current.replace(/\D/g, ''):''].join(',') } : el})
                   setMassStatus(mass)
                   }}
            
              placeholder="не выбрано"
              style={{textAlign:'center',width:'100px',padding:'5px'}} />
          
           <span style={{padding:'10px',}}>{ `до` }</span>
            <input  value={maxVal.current}
            placeholder="не выбрано" type={'number'} 
            disabled={!UL}
             onChange = {(e)=>
                {
                  let mass=[]
                  maxVal.current =  e.target.value;
                mass = massStatus.map(el=> { 
                return el.type.includes("RangeRev") ?
                   { ...el, code: [minVal.current,maxVal.current].join(',') } : el})
                   setMassStatus(mass)
                   }} style={{padding:'5px',width:'100px',fontSize:'12px',textAlign:'center'}} />
            </div>
            </div>

</div>
{err?<div style={{color:'red',padding:'10px',fontSize:'12px'}}> {`ОШИБКА!!!***Значение выручки "от" - ${minVal.current}  больше значения "до"- ${maxVal.current} `} </div>:null}
        </>
    )

}



        function TEXT_REASON() {
            return (
                <>
                    <div className={s.module_header}
                        style={{ paddingBottom: '25px', gridColumn: '1/3' }}
                    >Детальные настройки:</div>
                    {

                        massStatus.filter(el => el.type === 'txtBox').map((el, i) => {
                            return (
                                <div key={el.id} style={{
                                    gridColumn: i % 2 === 0 ? 1 : 2,
                                    display: 'inline', position: 'relative'
                                }}>

                                    <div style={{
                                        fontSize: '12px',
                                        position: 'absolute',
                                        fontWeight: 700,
                                        zIndex: '6',
                                        left: 20,
                                        top: -13
                                        , color: '#026f90'


                                    }}>{' ' + el.name} </div>


                                    <div style={{
                                        fontSize: '10px'
                                        , height: 'min-content'
                                        , position: 'relative'
                                        , width: '90%'
                                        , display: 'flex'
                                        , alignItems: 'center'

                                    }}>

                                        <input
                                        disabled = {el.name.includes('Лидер') && !UL}
                                            type="checkbox"
                                            style={{
                                                marginBottom: '15px'

                                            }}
                                            onChange={() => setMassStatus(
                                                massStatus.map((el_) => el_.id === el.id ?
                                                    { ...el, checked: !el.checked } : el_))}
                                            name={el.id}
                                           
                                            checked={el.checked}
                                        />
                                        <textarea
                                       disabled= {el.name.includes('Лидер') && !UL}
                                            // placeholder={' ' + el.name}
                                            style={{
                                                marginBottom: '15px',
                                                paddingLeft: '15px',
                                                fontSize: '12px',
                                                marginLeft: '8px',
                                                height: '40px',
                                                width: '95%',

                                                overflow: 'auto',
                                                resize: 'none',
                                                outline: 'none'
                                            }}
                                            id={el.id}
                                            value={el.text}
                                            onChange={(e) => {

                                                setMassStatus(massStatus.map((el_) => el_.id === el.id ?
                                                    { ...el, code: e.target.value, text: e.target.value, clear: e.target.value.length > 0 ? false : true, disabled: e.target.value.length > 0 ? false : true } : el_))
                                                    ;
                                                act.current.id = e.target.id
                                                act.current.act = false

                                                if (e.target.value.length > 0) { Handler(e, el) }

                                            }}
                                        />

                                        {!el.clear ? <span onClick={
                                            () => setMassStatus(massStatus.map((el_) => el_.id === el.id ?
                                                {
                                                    ...el
                                                    , checked: false
                                                    , clear: true
                                                    , text: ''
                                                    , disabled: true
                                                } : el_))}
                                            style={{ fontSize: '18px', marginLeft: '5px', color: 'red', cursor: 'pointer' }}>Х</span> : null}
                                    </div>

                                    {act.current.id === el.id && act.current.act === false && view ? view : null}

                                </div>
                            )
                        })
                    }

                </>)
        }

        function DATEPICKER() {
            return (
                <>
                    <div className={s.module_header}
                        style={{ paddingLeft: '1rem' }}
                    >Выберите диапазон даты первичной регистрации </div>

                    <div style={{
                        alignSelf: 'center', padding: '10px',
                        display: 'inline-flex',
                        alignItems: 'center'
                    }}>

                        <input type='checkbox' style={{ marginRight: '2px' }}
                            checked = {massStatus.filter(el=>el.name.includes("регистрац"))[0].checked}
                            onChange={() => {
                                setMassStatus(massStatus.map(
                                    el => {
                                        return el.name.includes("регистрац") ?
                                            { ...el, checked: !el.checked } : el
                                    }))

                            }} />

                        <DatePicker key={1}
                            selected={startDate.current}
                            onChange={(date) => {
                                startDate.current = date;
                                setMassStatus(massStatus.map(
                                    el => el.name.includes("регистрац") ?
                                        {
                                            ...el,
                                            code: ((startDate.current ? startDate.current.toLocaleDateString("ru") : '') + ','
                                                + (endDate.current ? endDate.current.toLocaleDateString("ru") : ''))
                                        } : el

                                ))
                                console.log(massStatus)
                            }}
                            endDate={endDate.current}
                            dateFormat="MM/yyyy"
                            locale={"ru"}
                            showMonthYearPicker
                        />

                        <p style={{ margin: '5px 5px' }}>по</p>

                        <DatePicker key={2}
                            selected={endDate.current}
                            onChange={(date) => {
                                endDate.current = date;
                                setMassStatus(massStatus.map(
                                    el => el.name.includes("регистрац") ?
                                        {
                                            ...el,
                                            code: ((startDate.current ? startDate.current.toLocaleDateString("ru") : '') + ','
                                                + (endDate.current ? endDate.current.toLocaleDateString("ru") : ''))
                                        } : el

                                ))

                            }
                            }
                            selectsEnd
                            startDate={startDate.current}
                            endDate={endDate.current}
                            locale={"ru"}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                        />
                    </div>
                </>


            )
        }


        function CHARTER_CAPITAL() {
            return (
                <>
                    <div className={s.module_header}
                        style={{ paddingLeft: '1rem', paddingTop: '1rem' }}
                    >Настройте фильтрацию по уставному капиталу </div>

                    <div style={{
                        paddingTop: '1rem', paddingLeft: '1rem', position: 'relative', display: 'grid'
                        , gridTemplateColumns: 'auto auto auto auto auto'
                    }}>
                        {/* //setStateDualRange */}

                        {/* ПО УСТАВНОМУ КАПИТАЛУ */}

                        {massStatus.filter((el) => el.type.includes("RangeC"))
                            .map((el, i) =>
                                <button
                                disabled={!UL}
                                key={i}
                                    style={{
                                        alignSelf: 'center'
                                        , textAlign: 'center'
                                        , border: '1px solid #9e7248'
                                        , marginLeft: '3px'
                                        , padding: '6px', borderRadius: '6px'
                                        , fontSize: '12px'
                                        , cursor: 'pointer'
                                        , minHeight:'30px'
                                        , MinWidth:'60px'
                                        , justifySelf:'center'
                                        
                                    }}
                                    onClick={() => { groupHandler(el) }}
                                    className={el.checked ? s.active : ''}


                                >
                                    {el.name}

                                </button>

                            )}
                    </div>

                </>
            )


        }

        function GET_INN() {

            const massINN = massStatus.filter(el => el.type.includes('INN'))[0]
            return (
                <>
         
                           
                            <div style={{display:'grid' , gridTemplateColumns:'1fr 1fr'}}>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                     <div style={{paddingTop:'10px'}} className={s.module_header}>
                            ПОИСК ПО ИНН: </div>
                            <span style={{display:'flex', marginRight:'2em',paddingTop:'10px'}}>
                            <button
                            onClick={(e)=> InnTextAreaMake(e)}
                            className="btn btn-warning">Подготовить</button>
                           {massINN && massINN.text ?  <button 
                            onClick={()=> 
                                setMassStatus(massStatus.map(
                                el => {
                                    return el.name.includes("ИНН") ?
                                        { ...el, text: '',code:'',cnt:0,checked:false } : el
                               }))}
                            className="btn btn-danger">Стереть</button> :null}
                            </span>
                </div>
                    
                    
                    <div style={{marginTop: '10px', display:'flex',gridColumn:1,gridRow:2, borderRight:'3px dotted black'}}>
                    <input type='checkbox'  style={{ marginRight: '10px' }}
                            onChange={() => {
                                setMassStatus(massStatus.map(
                                    el => {
                                        return el.name.includes("ИНН") ?
                                            { ...el, checked: !el.checked } : el
                                   }))
                            }} checked={massINN.checked}
                            />
                        <textarea
                            style={{
                                marginBottom: '15px',
                                paddingLeft: '5px',
                                fontSize: '12px',
                                width: '90%' }}
                            placeholder="Вставьте список ИНН через любой разделитель"
                            rows={5} cols={6}
                            onChange={handleChangeInnTextArea}
                            value={massINN.text}
                        />
                       
                    </div>
                    {massINN.checked?<div style={{gridRow:3}} >Загружено: {massINN.cnt}</div>:null} 


                    </div>

                </>)
        }


        function GET_HEAD() {

            return (
                <>
                    <hr style={{margin:'10px'}} />
                 <div style={{display:'grid' ,gridTemplateColumns:'1fr,1fr, 1fr, 20px',padding:'5px',columnGap:'5px'}}>
                    <div style={{ display: 'inline-flex', alignItems: 'center',  gridColumn:1,gridRow:'1/4' }}>
                        <span className={s.dName}> НАСТРОЙКИ </span>
                        <img alt='' src="..\img\GreyTools.svg" width={'50px'} />
                
                    </div>
           

                            <div style={{gridColumn: 2,gridRow:1,borderRight:'3px dotted black'}}>
                
                        <div className={s.module_header} style={{ padding: '10px' }}>
                                Выберите форму собственности: </div>
                            {FORM_COWNERS()}
                    </div>
                    <div style={{ gridColumn: 3, gridRow: '1' ,paddingLeft:'10px'}}>
                            <div className={s.module_header} style={{ padding: '10px' }}>Выберите статус:</div>
                            {STATUS()}
                        </div>
                        
                        <div style={{gridColumn:4, justifySelf:'end'}}>
                            <button style={{padding:'8px',color:'black'}} onClick={() => { setCollapse(!isCollapse) }} className="btn btn-outline-warning"> '|  |' 
                            </button></div>

                    </div>
       
                </>)
        }

    }


}

export default LIST_WORKS;