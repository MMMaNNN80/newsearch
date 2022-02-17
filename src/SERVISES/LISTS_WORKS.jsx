import React from "react";
import GET_MODAL from "../JS/GET_MODAL";
import s from "../CSS/listworks.module.css"
import { useState, useRef } from "react";
import { getResponse } from "../JS/properties";
import { f_getDictionary } from "../JS/SQL";
import { f_getResult } from "../JS/SQL";
import GETTABLE from "../COMPONENTS/GETTABLE";
import { getMassRows } from "../JS/properties";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ru from "date-fns/locale/ru";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

registerLocale("ru", ru);










const LIST_WORKS = ({ activeModal, setActiveModal, name }) => {

    const [massDic, setMassDic] = useState([])
    const load = useRef(false)



    if (!load.current) {
        f_getDictionary()
            .then(mass => {
                setMassDic(mass)
                load.current = true
            })
    }




    return (
        <>
            <GET_MODAL
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                CHILDREN={<CHILDREN key={1} />}
                text={name}
                styleHead={{
                    fontSize: '42px'
                    , padding: '20px'
                    , fontFamily: 'ui-monospace'
                    , fontWeight: '700'
                    , color: '#006f90'
                }}
                styleBody={{
                    minWidth: '950px', maxWidth: '30%',height:'auto'
                    , background: '#fff'
                    ,
                }}
            />

        </>
    )


    function CHILDREN() {
        
        const [result, setResult] = useState({ load: false, massData: [] })
        const startDate = useRef(null)
        const endDate = useRef(null)
        const [isCollapse,setCollapse] = useState(false)
 



        let mass = [
            { id: 0, name: 'Юридические лица', checked: true, type: 'OPF', code: '0' },
            { id: 1, name: 'ИП', checked: false, type: 'OPF', code: '1' },
            //кнопки Юр лица \ ИП
            { id: 2, name: 'ТОП-50 по выручке', checked: false, type: 'check', code: '*' },
            { id: 3, name: 'Подгруппы ОКВЭД', checked: true, type: 'check', code: '*' },
            { id: 4, name: 'Все', checked: true, type: 'status', code: 9 },
            { id: 5, name: 'Действующие', checked: false, type: 'status', code: 1 },
            { id: 6, name: 'Ликвидированные', checked: false, type: 'status', code: 0 }]

        const massNames = ['ОКВЭД Основной', 'Регион', 'Лидер']  // ---'Дата регистрации', 'Капитал'

        massNames.forEach((el, i) => {

            mass.push({ id:mass.length , name: el, text: '', checked: false, type: 'txtBox', disabled: true, clear: true, code: '' })
        })
        mass.push({ id: mass.length , name: 'Капитал', checked: false, type: 'Range', code: ''})
        mass.push({ id: mass.length , name: 'Дата регистрации', checked: false, type: 'Range', code: ''})

     


      
        const [massStatus, setMassStatus] = useState(mass) //Главный массив
         


        const [view, setView] = useState([]) // меню - готовая разметка
        const act = useRef({ act: false, id: '' })   // для прокидывания переменной


        let massX = []

        function HandleSubmit(event) {
            event.preventDefault();

            console.log(massStatus) // для просмотра массива контролов

        }


        let UL = true

        if (massStatus.filter(el => el.id === 1)[0].checked) { UL = false }

        //////*************************************************************************** */
        //////*************************************************************************** */
        //////*************************************************************************** */
        return (<>
            {<div style={{ color: 'white', fontSize: '90px', zIndex: 7 }}> {''}</div>}

            <hr />
            <div style={{display:'inline-flex'}}>
            <span  className={s.dName}> НАСТРОЙКИ </span>
            <img alt='' src= "..\img\GreyTools.svg"  width={'35px'} />
           
           <div>
           <button  onClick={() => {setCollapse(!isCollapse)}}className="btn btn-warning">{isCollapse?'Развернуть': 'Свернуть' }</button>
           <button onClick={()=>{setMassStatus(mass)}}className="btn btn-danger">Очистить</button>
           </div>
           
           
            </div>
            
            
            
            <div style={{ padding: '5px' }}>

                <form  onSubmit={HandleSubmit}>

<div style = {{display: isCollapse?'none':'block'}}>

                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'grid'
                        ,gridTemplateColumns: 'auto 2fr 1fr'
                        ,rowGap:'15px'
                        , fontSize: '10px'
                        , alignItems: 'center'

                    }}>
                        {/* БЛОК ФОРМЫ СОБСТВЕНННОСТИ */}
                       

                            

                        {/* {Кнопки форм собственности} */}
                        <div  style={{gridColumn: '1' }}    className={s.module_header}>Выберите форму собственности:</div>
            <div style={{display:'inline-flex'}}>   
                        {massStatus.filter(el => el.type === 'OPF')
                            .map((el, i) => {
                                return (<>
                                <div style={{gridColumn:'2/3',gridRow:1,display:"flex"}}>
                                    <span key={i} onClick={() => { groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.name}</span> 
                                        </div>
                                        </>)
                            })}
                            </div>
                          
                        {/* {Кнопки} */}                                                
<div style={{gridColumn:4,gridRow:'1/2',display:'inline-flex'}}>      
<div className={s.module_header}>Выберите статус:</div>                                     
                    
                                
{massStatus.filter(el => el.type === 'status')
    .map((el) => {
        let quadrColor = ''
        if(el.name.includes('Все')) {quadrColor = 'blue'}
        if(el.name.includes('Действ')) {quadrColor = 'green'}
        if(el.name.includes('Ликвидиров')) {quadrColor = 'red'}
        return (<>
         
                         <div style={{display: 'flex',cursor:'pointer'}}>
           {el.checked ? <div style={{height:'15px',width:'15px', background: quadrColor, borderRadius:'5px'}} className="quadr"></div> :null}
            <span key={el.id} onClick={() => { groupHandler(el) }}
                className={  (el.checked ? ' ' + s.active_btn : '')}
                style={{ 
                 
                  
                    marginRight: '1rem',
                    fontSize:'12px',
                    color:'#026f90'

            

            
            }}>{el.name}</span> 
            </div>
          

            </>)
    })}
         
              


                    </div>




                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'flex'
                        , fontSize: '10px'
                        ,gridColumn:'1/4'
                        ,gridRow:2
                        , alignItems: 'center'


                    }}>

              {/* {Чек боксы} */}
<div className={s.module_header} style={{}}>Дополнительные опции:</div>
                    <div style={{
                        textAlign: 'left'
                        , display:'flex'
                        , fontSize: '14px'
                        , padding: '5px 10px'
                        ,whiteSpace:'nowrap'

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



                    </div>

                
                    <hr />

                    {/* {ТЕКСТБОКСЫ} */}
                    {/* ******************************************************************************************************************** */}

                   
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr  2fr 1fr', padding: '5px' }}>
                    <div className={s.module_header}
                   style={{paddingBottom:'25px', gridColumn:'1/3'}}
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
                                            fontWeight:700,
                                            zIndex: '6',
                                            left: 20,
                                            top: -13
                                            ,color:'#026f90'
                                           

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
                                                type="checkbox"
                                                style={{ 
                                                    marginBottom: '15px'
                               
                                                 }}
                                                onChange={() => setMassStatus(
                                                    massStatus.map((el_) => el_.id === el.id ? 
                                                    { ...el, checked: !el.checked } : el_))}
                                                name={el.id} 
                                                disabled={el.disabled}
                                                checked={el.checked} 
                                                 />
                                            <textarea
                                                // placeholder={' ' + el.name}
                                                style={{
                                                    marginBottom: '15px',
                                                    paddingLeft: '15px',
                                                    fontSize: '12px',
                                                    marginLeft: '8px',
                                                    height: '50px',
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

        {/* ПО ДАТЕ РЕГИСТРАЦИИ */}

<div style={{gridColumn:3, gridRow:'1/5',borderLeft:'3px dotted black'}}>
<div className={s.module_header}
                   style={{paddingLeft:'1rem'}}
                    >Выберите диапазон даты первичной регистрации </div>
                         
                         <div style={{ alignSelf:'center', padding:'10px',
                          display: 'inline-flex', 
                           alignItems: 'center' }}>
               
<input type='checkbox' style={{ marginRight: '2px' }} onChange={(e) => {
  setMassStatus(massStatus.map(
    el=>el.name.includes("регистрац")? 
    {...el, checked: !el.checked} : el))}}  />

<DatePicker
    selected={startDate.current}
    onChange={(date) => {startDate.current = date;         
        setMassStatus(massStatus.map(
        el=>el.name.includes("регистрац")? 
        {...el,
            code:((startDate.current ?startDate.current.toLocaleDateString("ru"):'') +','+ (endDate.current ? endDate.current.toLocaleDateString("ru"):'') )
            } : el
    
    )) }}
    endDate={endDate.current}
    dateFormat="MM/yyyy"
    locale={"ru"}
    showMonthYearPicker
/>

<p style={{ margin: '5px 5px' }}>по</p>

<DatePicker
    selected={endDate.current}
    onChange={(date) => {endDate.current = date;
        setMassStatus(massStatus.map(
            el=>el.name.includes("регистрац")? 
            {...el,
                code:((startDate.current ?startDate.current.toLocaleDateString("ru"):'') +','+ (endDate.current ? endDate.current.toLocaleDateString("ru"):'') )
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
<div className={s.module_header}
                   style={{paddingLeft:'1rem',paddingTop:'1rem'}}
                    >Настройте фильтрацию по уставному капиталу </div>

               

            
                    <div  style={{paddingTop:'2rem',paddingLeft:'1rem',position:'relative' ,display:'flex'}}>
                    <input type='checkbox' style={{ marginRight: '20px' }} 
                    
                    onChange={() => {setMassStatus(massStatus.map(
                        el=>el.name.includes("Капитал")? 
                        {...el, checked: !el.checked} : el
                    
                    )) }} />


        {/* ПО УСТАВНОМУ КАПИТАЛУ */}
                    <Range marks={{
                        0: `0`,
                        1000000: `1млн`
          }}
          onChange={value=>{setStateDualRange(value); }}
            
           
          step={10000}
          min={0}
          max={1000000}
          defaultValue={[10000, 500000]}
          tipFormatter={value =>{
           if(value>=10000 && value<1000000) {return `${value/1000} тыс руб`}   
           if(value>=1000000 ) {return `${value/1000000} млн руб`}  
        }
          }
        
          tipProps={{
            placement: "bottom",
            visible: true,
        
          }}
        />

                    </div>
                  
</div>
              
 </div>

                   
                    <br />

    </div>
                    <button onClick={getResult}>Получение результата</button>

                    {result.load ?
                        <div style={{ padding: '20px' }}>



                            <GETTABLE funcGetRows={[...getMassRows(result.massData)]} 
                                style={{
                                    tclass: ["mtbl tblcolorhead"],
                                    captionStyle: { "color": "#5d40c5", "alignText": "center", "fontSize": "22px", fontWeight: '700' }
                                }}
                                name={"ВЫВОД ФРАГМЕНТА ВЫБОРКИ"}
                                endtbl={true}
                                cut={6}
                            />

                        </div>
                        : ''}

                    {/* ******************************************************************************************************************** */}
                </form>
            </div>
        </>


        )


        function setStateDualRange (value) {

            setMassStatus(massStatus.map(
                el=>el.name.includes("Капитал")? 
                {...el,code:value.join(',')} : el
            
            )) 
             


        }

   //// Результат     
        async function getResult() {

            const head = [
                '№',
                'Основная информация о организации',
               // 'Дата статуса',
                //'Дата первой регистрации',
                `Коды класификаторы организации`,
                'ОКВЭД(основной)',
                'ФИО руководителя',
                'Контакты'
            ]



            f_getResult(
                JSON.stringify(massStatus).replaceAll('"', '\\"'), 50) // ----Json в postgres
                .then(mass => {

                    console.log(mass)
                    if(mass && mass.length>0){
                    mass = mass.map((el, i) => {
                        return [
                            i + 1,
                            <>
                            <span>
                                <div className="quadr" style={{ "display": "inline-flex", 'background': el.isacting && el.isacting === 1 ? 'green' : 'red' }}></div>
                                <div style={{ "display": "inline", color: 'gold' }}>{el.shortnamerus && el.okved && el.shortnamerus.length > 1 ? el.shortnamerus : el.fullnamerus}</div>
                            </span>
                           
                            {el.chartercapital && el.chartercapital>0 ? <div style= {{paddingTop:'2px' ,paddingBottom:'2px' }}>{`Уставной капитал: ${el.chartercapital}`}</div> : null}
                            {el.regionname && el.regionname.length>0 ? <div style= {{paddingTop:'2px' ,paddingBottom:'2px' }}>{`Регион: ${el.regionname}`}</div> : null} 
                            {el.datefirstreg && el.datefirstreg.length>0 ? <div style= {{paddingTop:'2px' ,paddingBottom:'2px' }}>{`Дата регистрации: ${el.datefirstreg}`}</div> : null} 
                            </>
                          
                            ,<>
                            <div style={{paddingTop:'2px' ,paddingBottom:'2px'}}> 
                                <div>{`ИНН:  ${el.inn}`}</div>
                                <div>{`КПП:  ${el.kpp}`}</div>
                                <div>{`ОГРН: ${el.ogrn}`}</div>
                                </div>

                            </>
                            , (el.okved_code ? el.okved_code : '') + ' ' + (el.okved ? el.okved : '')
                            , el.fio
                            , <>
                             {el.phone_parsed && el.phone_parsed.length>0 ?
                             <>
                            <span style= {{color:'gold',paddingTop:'2px' ,paddingBottom:'2px' }}>{`Телефоны:`}</span>
                            <span>
                            {el.phone_parsed.split(',').map((el,i)=> {return <div key={i}>{el}</div>})} 
                            </span>
                            </> :null}

                            {el.email && el.email.length>0 ?
                            <>   
                            <span style= {{color:'gold',paddingTop:'5px' ,paddingBottom:'5px'}}>{`Электронная почта:`}</span>
                            {el.email.split(',').map((el,i)=> {return <div key={i}>{el}</div>})} 
                            </> :''

                        }
                            </>


                        ]

                    })
                }

                (!mass || !mass.length>0) ?  mass=([head]) : mass.unshift(head)
                    console.log(mass)
                    setResult({ load: true, massData: mass })

                }


                )

        }


        async function Handler(e, el) {


            if (el.name.includes('Название компании')) {
                massX = await getResponse(e)

                if (massX && massX.suggestions) {
                    massX = massX.suggestions.map(el => {
                        return { id: el.value, value: el.value }
                    })
                }
            }

            if (el.name.includes('ОКВЭД')) {

                massX = massDic
                .filter(el => el.src === "OKVED"
                    && (el.Name.includes(e.target.value) || el.short_name.includes(e.target.value))).map(el => {
                        return { id: el.Name, value: (el.Name + '  ' + el.short_name) }
                    }).sort((a,b)=>a.id>b.id)

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
                    , top:50
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

            if (mass.length > 0) { setMassStatus(mass) } else { alert('groupHandler - пустой массив') }
        }


    }












}

export default LIST_WORKS;