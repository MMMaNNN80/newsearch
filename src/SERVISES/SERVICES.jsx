import React from "react"

const SEVICES = () => {

    return (<>
        <div style={{
            position: 'absolute'
            , display: 'grid'
            , gridTemplateColumns: '170px auto 35%'
            , background: 'transparent'
            , zIndex: 1

            , width: '100%'
            , height: '2000px'
            , marginTop: '250px'


        }}>

            <div style={{
                gridColumn: '2'
                , gridRow: 1
                , color: 'black'
                , textAlign: 'center'
                , fontSize: '20px'
                , fontWeight: 700
                , background: '#d8d8d8'
                , height: '1000px'
                , width: '1000px'
                , padding: '10px'


            }}>
                <div style={{
                    color: '#37598a'
                    , textAlign: 'left'
                    , fontSize: '30px'
                    , padding: '40px'
                    , textShadow: '1px 1px black'

                }}>
                    РАБОТА СО СПИСКАМИ
                </div>

                <div style={{

                    textAlign: 'left'
                    , width: 'auto'
                    , display: 'inline-flex'
                    , fontSize: '14px'
                }}>
                    <span style={{ marginRight: '1rem' }} >Фильтры: </span>
                    <span style={{ marginRight: '1rem', fontWeight: 'normal' }}>Юридические лица</span>

                    <span style={{ display: 'inline-flex' }}
                        className="form-check form-switch" >
                        <input
                            style={{}}
                            className="form-check-input" type="checkbox"
                            id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"
                        ></label>
                    </span>
                    <span style={{ fontWeight: 'normal' }}>Индивидуальные предприниматели</span>

                </div>
                <br/>
                <div style={{
                    textAlign: 'left'
                    , width: 'auto'
                    , display: 'inline-flex'
                    , fontSize: '14px'
                }}>

                    <div className="form-check" style={{ marginRight: '1rem' }} >
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label style={{ fontSize: '12px', fontWeight: '700' }} className="form-check-label" htmlFor="flexCheckChecked">
                            Топ-50 по выручке
                        </label>
                    </div>

                    <select id="selectvalue" style={{ width: '150px' }} >
                        <option>Все</option>
                        <option>Ликвидированные</option>
                        <option>Действующие</option>
                    </select>
                    <div className="form-check" style={{ marginLeft: '1rem' }}>

                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label style={{ fontSize: '12px', fontWeight: '700'  }} className="form-check-label" htmlFor="flexCheckChecked">
                            Подгруппы ОКВЭД
                        </label>
                    </div>
                    <span >
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '400px 400px', marginTop: '20px' }}>
                    <div style={{ gridColumn: 1, gridRow: 1 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Название компании" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                            background: '#e8e8e8',
                            width: '200px'
                        }} />
                    </div>
                    <div style={{ gridColumn: 1, gridRow: 2 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Директор" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                            background: '#e8e8e8',
                            width: '200px'
                        }} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 1 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="Адрес" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                            background: '#e8e8e8',
                            width: '200px'
                        }} />
                    </div>
                    <div style={{ gridColumn: 2, gridRow: 2 }}>
                        <input type="checkbox" />
                        <input type="text" placeholder="ОКВЭД основной" style={{
                            fontSize: '12px',
                            marginLeft: '2px',
                            height: '30px',
                            background: '#e8e8e8',
                            width: '200px'
                        }} />
                    </div>

                </div>



            </div>


        </div>
    </>)

}
export default SEVICES;