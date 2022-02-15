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
                    , color: 'rgb(192 207 223)'
                }}
                styleBody={{
                    minWidth: '1000px', maxWidth: '1000px'
                    , background: '#fff'
                    ,
                }}
            />

        </>
    )


    function CHILDREN() {

        const [result, setResult] = useState({ load: false, massData: [] })
        const [startDate, setStartDate] = useState(null)
        const [endDate, setEndDate] = useState(null);





        //console.log(massDic)

        let mass = [
            { id: 0, name: 'Юридические лица', checked: true, type: 'OPF', code: '0' },
            { id: 1, name: 'Индивидуальные предприниматели', checked: false, type: 'OPF', code: '1' },
            //кнопки Юр лица \ ИП
            { id: 2, name: 'ТОП-50 по выручке', checked: false, type: 'check', code: '*' },
            { id: 3, name: 'Подгруппы ОКВЭД', checked: true, type: 'check', code: '*' },
            { id: 4, name: 'Все', checked: true, type: 'status', code: 9 },
            { id: 5, name: 'Действующие', checked: false, type: 'status', code: 1 },
            { id: 6, name: 'Ликвидированные', checked: false, type: 'status', code: 0 }]

        const massNames = ['ОКВЭД Основной', 'Регион', 'Лидер']  // ---'Дата регистрации', 'Капитал'

        massNames.forEach((el, i) => {

            mass.push({ id: 7 + i, name: el, text: '', checked: false, type: 'txtBox', disabled: true, clear: true, code: '' })
        })



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
            <span className={s.dName} > НАСТРОЙКИ: </span>
            <div style={{ padding: '15px' }}>

                <form onSubmit={HandleSubmit}>



                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'flex'
                        , fontSize: '10px'
                        , alignItems: 'center'


                    }}>
                        {/* БЛОК ФОРМЫ СОБСТВЕНННОСТИ */}

                        <div className={s.module_header}>Выберите форму собственности:</div>

                        {/* {Кнопки форм собственности} */}

                        {massStatus.filter(el => el.type === 'OPF')
                            .map((el, i) => {
                                return (<>
                                    <span key={i} onClick={() => { groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.name}</span> </>)
                            })}



                    </div>

                    <br />


                    {/* {Чек боксы} */}
                    <div className={s.module_header} style={{}}>Дополнительные опции:</div>
                    <div style={{
                        textAlign: 'left'
                        , width: 'auto'
                        , display: 'inline-flex'
                        , fontSize: '14px'
                        , padding: '10px 10px'

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




                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'flex'
                        , fontSize: '10px'

                        , alignItems: 'center'


                    }}>

                        <div className={s.module_header}>Выберите статус:</div>


                        {/* {Кнопки} */}
                        {massStatus.filter(el => el.type === 'status')
                            .map((el) => {
                                return (<>
                                    <span key={el.id} onClick={() => { groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.name}</span> </>)
                            })}


                    </div>
                    <hr />

                    {/* {ТЕКСТБОКСЫ} */}
                    {/* ******************************************************************************************************************** */}

                    <div className={s.module_header}>Детальные настройки. Выберите/введите значения для уточнения условий поиска информации:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr  1fr 1fr', marginTop: '20px', padding: '20px' }}>
                        {

                            massStatus.filter(el => el.type === 'txtBox').map((el, i) => {
                                return (
                                    <div key={el.id} style={{
                                        gridColumn: i % 2 === 0 ? 1 : 2,
                                        display: 'inline', position: 'relative'
                                    }}>

                                        <div style={{
                                            fontSize: '11px',
                                            position: 'absolute',
                                            zIndex: '3',
                                            left: 30,
                                            top: -15
                                            ,color:'magenta'

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
                                                style={{ verticalAlign: 'center' }}
                                                onChange={() => setMassStatus(
                                                    massStatus.map((el_) => el_.id === el.id ? { ...el, checked: !el.checked } : el_))}
                                                name={el.id} disabled={el.disabled} checked={el.checked} />
                                            <textarea
                                                // placeholder={' ' + el.name}
                                                style={{
                                                    fontSize: '14px',
                                                    marginLeft: '8px',
                                                    height: '60px',
                                                    marginBottom: '2px',
                                                    width: '90%',
                                                    paddingLeft: '10px',
                                                    overflow: 'auto',
                                                    resize: 'none',
                                                    outline: 'none'
                                                    ,borderRadius:'1px'


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
                                        <br />


                                     

                                    </div>
                                )
                            })
                        }

                    </div>



                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '5px' }}>

                        <input type='checkbox' style={{ marginRight: '2px' }} onChange={() => { }} />

                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MM/yyyy"
                            locale={"ru"}
                            showMonthYearPicker
                        />

                        <p style={{ margin: '5px 5px' }}>ПО</p>

                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            locale={"ru"}
                            dateFormat="MM/yyyy"
                            showMonthYearPicker
                        />
                    </div>
                    <br />

                    {result.load ?
                        <div style={{ padding: '20px' }}>



                            <GETTABLE funcGetRows={[...getMassRows(result.massData)]} //Регистрационные данные
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

                    <button type={"submit"}>Submit</button>
                    <button onClick={prepareSQL}>Сборка SQL</button>
                    <button onClick={getResult}>Получение результата</button>
                    {/* <div style={{ color: 'blue', fontSize: '20px', zIndex: 22 }}> {act.id.current}</div> */}
                </form>
            </div>
        </>


        )


        async function getResult() {

            const head = [
                '№',
                'Наименование организации',
                'Дата статуса',
                'Дата первой регистрации',
                `Коды класификаторы организации`,
                'Регион',
                'ОКВЭД(основной)',
                'ФИО руководителя',
                'Контакты',
                'e-mail'
            ]



            f_getResult(
                JSON.stringify(massStatus).replaceAll('"', '\\"'), 15) // ----Json в postgres
                .then(mass => {
                    mass = mass.map((el, i) => {
                        return [
                            i + 1,
                            <span>
                                <div className="quadr" style={{ "display": "inline-flex", 'background': el.isacting && el.isacting === 1 ? 'green' : 'red' }}></div>
                                <div style={{ "display": "inline", color: 'gold' }}>{el.shortnamerus && el.okved && el.shortnamerus.length > 1 ? el.shortnamerus : el.fullnamerus}</div>
                            </span>
                            , el.status_date
                            , el.datefirstreg
                            ,
                            <>
                                <div>{`ИНН:  ${el.inn}`}</div>
                                <div>{`КПП:  ${el.kpp}`}</div>
                                <div>{`ОГРН: ${el.ogrn}`}</div>

                            </>

                            , (el.regioncode ? el.regioncode : '') + ' ' + (el.regionname ? el.regionname : '')
                            , (el.okved_code ? el.okved_code : '') + ' ' + (el.okved ? el.okved : '')
                            , el.fio
                            , el.phone_parsed
                            , el.email







                        ]

                    })


                    mass.unshift(head)
                    console.log(mass)
                    setResult({ load: true, massData: mass })

                }


                )

        }

        function prepareSQL() {

alert(`f_getLists(join(',')})`)
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




        function SuggMenu(mass, element) {
            return <>
                <div style={{
                    position: 'absolute'
                    , zIndex: 10
                    , border: '1px solid grey'
                    , width: '90%', marginLeft: '15px', background: 'whitesmoke', maxHeight: '500px', overflow: 'auto'
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