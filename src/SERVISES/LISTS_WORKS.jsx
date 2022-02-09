import React from "react";
import GET_MODAL from "../JS/GET_MODAL";
import s from "../CSS/listworks.module.css"
import { useState, useRef } from "react";
import { getResponse } from "../JS/properties";



const LIST_WORKS = ({ activeModal, setActiveModal, name }) => {
    return (
        <>
            <GET_MODAL
                activeModal={activeModal}
                setActiveModal={setActiveModal}
                CHILDREN={<CHILDREN />}
                text={name}
                styleHead={{
                    fontSize: '35px'
                    , padding: '5px'

                    , fontWeight: '700'
                    , color: '#4a7f7a'
                }} />

        </>
    )


function CHILDREN() {

        let mass = [
            { id: 0, text: 'Юридические лица', checked: true, type: 'OPF' },
            { id: 1, text: 'Индивидуальные предприниматели', checked: false, type: 'OPF' },
            //кнопки Юр лица \ ИП
            { id: 2, text: 'ТОП-50 по выручке', checked: false, type: 'check' },
            { id: 3, text: 'Подгруппы ОКВЭД', checked: true, type: 'check' },
            { id: 4, text: 'Все', checked: true, type: 'status' },
            { id: 5, text: 'Действующие', checked: false, type: 'status' },
            { id: 6, text: 'Ликвидированные', checked: false, type: 'status' }]

        const massNames = ['Название компании', 'ОКВЭД Основной', 'Директор', 'Регион', 'Телефон', 'Email']

        massNames.forEach((el, i) => {

            mass.push({ id: 7 + i, name: el, text: '', checked: false, type: 'txtBox', disabled: true, clear: true })
        })



        const [massStatus, setMassStatus] = useState(mass) //Главный массив


        const [view, setView] = useState([]) // меню - готовая разметка
        const act = useRef(false)   // для прокидывания переменной


        let massX = []

        function HandleSubmit(event) {
            event.preventDefault();
            console.log(massStatus) // для просмотра массива контролов

        }


        let UL = true

        if (massStatus.filter(el => el.id === 1)[0].checked) { UL = false }


        return (<>
            {<div style={{ color: 'white', fontSize: '80px', zIndex: 7 }}> {''}</div>}

            <hr />
            <div style={{ padding: '10px' }}>
                <form onSubmit={HandleSubmit}>
                    <div style={{

                        textAlign: 'center'
                        , width: 'auto'
                        , display: 'flex'
                        , fontSize: '10px'

                        , alignItems: 'center'


                    }}>

                        <span className={s.dName} >НАСТРОЙКИ ФИЛЬТРОВ: </span>
                        {/* {Кнопки} */}
                        {massStatus.filter(el => el.type === 'OPF')
                            .map((el, i) => {
                                return (<>
                                    <span key={i} onClick={() => {groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.text}</span> </>)
                            })}
                    </div>

                    <div style={{
                        textAlign: 'left'
                        , width: 'auto'
                        , display: 'inline-flex'
                        , fontSize: '14px'

                    }}>
                        {/* {Чек боксы} */}
                        {massStatus.filter(el => el.type === 'check')
                            .map((el, i) => {
                                return (
                                    <div key={el.id} className="form-check" style={{ marginLeft: '5px' }} >
                                        <input onChange={() => groupHandler(el)} disabled={!UL && el.text.includes('ТОП')}
                                            className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={el.checked} />
                                        <label key={el.id} style={{ fontSize: '12px', fontWeight: '700' }} className="form-check-label" htmlFor="flexCheckChecked">
                                            {el.text}
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

                        {/* {Кнопки} */}
                        {massStatus.filter(el => el.type === 'status')
                            .map((el, i) => {
                                return (<>
                                    <span key={i} onClick={() => { groupHandler(el) }}
                                        className={s.dBtn + (el.checked ? ' ' + s.active : '')}
                                        style={{ marginRight: '1rem' }}>{el.text}</span> </>)
                            })}


                    </div>
                    <hr />

   {/* {ТЕКСТБОКСЫ} */}
   {/* ******************************************************************************************************************** */}
                    <div style={{ display: 'grid', gridTemplateColumns: '400px  400px', marginTop: '20px' }}>
                        {

                            massStatus.filter(el => el.type === 'txtBox').map((el, i) => {
                                return (
                                    <div key={el.id} style={{ gridColumn: i % 2 === 0 ? 1 : 2, 
                                    display: 'inline', position: 'relative' }}>

                                        <input onChange={() => setMassStatus(
                                            massStatus.map((el_) => el_.id === el.id ? { ...el, checked: !el.checked } : el_))}

                                            name={el.id} type="checkbox" disabled={el.disabled} checked={el.checked} />

                                        <input type="text"
                                            placeholder={' ' + el.name} style={{
                                                fontSize: '12px',
                                                marginLeft: '2px',
                                                height: '60px',
                                                marginBottom: '5px',
                                                width: '90%',
                                                paddingLeft: '15px',
                                                whiteSpace: 'pre-wrap',
                                                multiline: 'true'

                                            }}
                                            id={el.id}
                                            value={el.text}
                                            onChange={(e) => { 
                                                setMassStatus(massStatus.map((el_) => el_.id === el.id ? 
                                                { ...el, text: e.target.value,clear:true, disabled: e.target.value.length>0 ? false:true} : el_))
                                              ; Handler(e, el)
                                            }}
                                        />
                                        {!el.clear  ? <span onClick={
                                            () => setMassStatus(massStatus.map((el_) => el_.id === el.id ?
                                                {
                                                    ...el
                                                    , checked: false
                                                    , clear: true
                                                    , text: ''
                                                    ,disabled:true
                                                } : el_))}
                                            style={{ color: 'red', cursor: 'pointer' }}>Х</span> : null}
                                        {el.name.includes('Название компании') && act.current && view ? view : null}
                                    </div>
                                )
                            })
                        }

                    </div>
                    {/* ******************************************************************************************************************** */}

                    <button type={"submit"}>Submit</button>
                    <div style={{ color: 'blue', fontSize: '20px', zIndex: 22 }}> {act.current}</div>
                </form>
            </div>
        </>


        )

        async function Handler(e, el) {

     
            if (el.name.includes('Название компании')) 
            {
                massX = await getResponse(e)

                if (massX && massX.suggestions) {
                    massX = massX.suggestions.map(el => {
                        return el.value
                    })

                    massX = [...new Set(massX)] //убрали дубли
                    act.current = true

                    setView(SuggMenu(massX, el))

                }


            }
            

        }

        function SuggMenu(mass, element) {
            return <>
                <div style={{
                    position: 'absolute'
                    , zIndex: 3
                    , border: '1px solid grey'
                    , width: '90%', marginLeft: '15px', background: 'whitesmoke', maxHeight: '500px', overflow: 'auto'
                }}>
                   
                    {mass.map((el_names, i) => {
                        return (
                            <div key={i} style={{ paddingLeft: '5px', paddingRight: '5px', width: '100%' }}
                            >
                                <div className={s.menuItem}
                                    value={el_names}
                                    onClick={(e) => {
                                        act.current = false
                                        setMassStatus(
                                        massStatus.map(el => {
                                                if (el.id === element.id) 
                                                // прокинул id 'элемента, куда нужно добавить выбранное
                                                 {
                                                    el.text = el_names /// ---добавили имя где его выбрали
                                                    el.checked = true
                                                    el.disabled = false
                                                    el.clear = false
                                                } return el

                                            }))}}>
                                    {el_names}

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