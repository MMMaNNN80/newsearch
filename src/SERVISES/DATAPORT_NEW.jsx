

import React from 'react';
import s from '../CSS/dataport_new.module.css'
import CHARTS from './DIAGRAMS/CHARTS'




export default function DATAPORT_NEW({ setActionList, data, tovZnak }) {


  const m_navMenu = ['Сводка', 'Исп. производства', `Арбитражи`, `Финансы`, `Госзакупки`, `Лицензии`, `Товарные знаки`, `Проверки`, `Сайты`, `Связи`, `Ещё`]

  let finmass = data?.fin_json?.value ? data?.fin_json?.value.filter(el => el.code === '2110')
    .sort((a, b) => a.period - b.period) : null
  let pribil = data?.fin_json?.value ? data?.fin_json?.value.filter(el => el.code === '2400')
    .sort((a, b) => a.period - b.period) : null

  let chartData = finmass ? {
    labels: finmass.map((data) => `${data.period}г.`),
    type: 'line',
    datasets: [
      {
        label: "Выручка за периоды,млн руб",
        data: finmass.map(data => data.val / 1000000),
        backgroundColor: ["lightblue"],
        borderColor: "transparent",
        borderWidth: 6,
        hoverBackgroundColor: ["#175000", "#003350", "#993d00"]
      }
    ]

  } : null;
  let chpribil = pribil ? {
    labels: pribil.map((data) => `${data.period}г.`),
    type: 'line',
    datasets: [
      {
        label: "Прибыль за периоды,млн руб",
        data: pribil.map(data => data.val / 1000000),
        backgroundColor: ["orange"],
        borderColor: "transparent",
        borderWidth: 6,
        hoverBackgroundColor: ["#175000", "#003350", "#993d00"]
      }
    ]

  } : null;


  console.log(tovZnak)
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.btnBack} onClick={() => { setActionList({ open: false, id: 0 }) }}>{`<---- НАЗАД`}</div>
        {/* TITLE */}
        <div className={s.mainTitle}>
          <div className={s.title}>
            <h1> RT.DATAPORT</h1>
            <h5>Сервис проверки компаний по различным показателям</h5>
            <div />
          </div>

        </div>
        {/* NAV_MENU */}
        <div style={{ width: 'max-content' }}>
          <ul className={s.nav_ul}>{m_navMenu.map((el, i) =>
            <li key={i}><a className={s.nav_a} href="#home">{el}</a></li>)}</ul>
          <div style={{ width: '100%', height: '1px', border: '1px dotted orange', marginTop: '5px', marginBottom: '5px' }}></div>

        </div>

        <div className={s.mainGrid}>
          <div style={{ gridColumn: 1, width: '100%', height: '100%', background: 'blue', opacity: 0.5 }}> </div>

          <div className={s.m_card}>
            <h6 style={{ color: 'orange' }}> КАРТОЧКА КОМПАНИИ</h6>
            <div style={{ padding: '15px', }}>
              <p n={`ПОЛНОЕ НАИМЕНОВАНИЕ:`} style={{ fontSize: '18px', color: 'black' }} className={s.v_name}>{data?.full_name?.value}</p>
              <div className={s.small_inline}>
                <span style={{
                  margin: '5px'
                  , width: '10px'
                  , height: '10px'
                  , backgroundColor: data?.isacting === 1 ? 'green' : 'red'
                }}>
                </span>
                <p style={{ marginLeft: '5px' }}> {data?.isacting === 1 ? `Действующее` : 'Ликвидировано'}</p>
                <p style={{ marginLeft: '10px' }} >{`Актуальноcть отчета: ${new Date(data?.actual_date).toLocaleDateString()}`}</p>

              </div>
              <p n={`Дата образования:`} style={{ padding: '5px' }} className={s.g_name}>{new Date(data?.date_first_reg?.value).toLocaleDateString()}</p>
              <div style={{ width: '100%', height: '1px', border: '1px dotted cyan', marginTop: '10px', marginBottom: '10px' }}></div>
              <p n={`КРАТКОЕ НАИМЕНОВАНИЕ:`} style={{ fontWeight: 700 }} className={s.v_name}>{data?.short_name?.value}</p>

              <div style={{ display: 'flex' }}>
                <p n={`ИНН:`} style={{ color: 'black' }} className={s.g_name}>{data?.inn?.value}</p>
                <p n={`КПП:`} style={{ marginLeft: '10px' }} className={s.g_name}>{data?.kpp?.value}</p>
              </div>
              <p n={`ОКПО:`} style={{}} className={s.g_name}>{data?.okpo?.value}</p>
              <p n={`ОГРН:`} style={{}} className={s.g_name}>{data?.ogrn?.value}</p>
              <br />

              <p n={`РУКОВОДИТЕЛЬ: `} style={{ fontWeight: 400, color: 'darkblue', cursor: 'pointer' }} className={s.g_name}>{data?.leader?.value}</p>
              <br />
              <p n={`АДРЕСА: `} style={{ fontWeight: 400 }} className={s.v_name}>{data?.address?.value}</p>
              <br />
              <p n={`ТЕЛЕФОНЫ: `} style={{ fontWeight: 400 }} className={s.v_name}>{data?.phone_parsed?.value}</p>
              <br />
              <p n={`УСТАВНОЙ КАПИТАЛ: `} style={{ fontWeight: 400 }} className={s.g_name}>{data?.capital?.value}</p>
              <br />
              <p n={`ОСНОВНОЙ ВИД ДЕЯТЕЛЬНОСТИ: `} style={{ fontWeight: 400 }} className={s.v_name}>{`${data?.okved_code?.value}   ${data?.okved_name?.value}`}</p>
              <br />
              {data?.massCompReg.length ? <div
                className={s.v_name} n={`КОМПАНИИ РЕГИСТРАТОРЫ: `}>
                {data?.massCompReg?.map((el, i) => {
                  return (
                    <div style={{ minWidth: '200px', maxWidth: '350px', textAlign: 'left', padding: '10px', border: '1px dotted orange' }}
                      key={i}>

                      <div style={{ display: 'inline-flex' }}>
                        <span style={{ color: 'black' }}> {`ИНН: `}</span>  <span>{el.inn}</span>
                        <span style={{ color: 'black' }}> {`ОГРН: `}</span>  <span>{el.ogrn}</span>
                      </div>
                      <div style={{ color: 'orange' }}>{el.name}</div>
                      <div style={{ fontSize: '10px' }}>{`* актуально на ${el.actual_date}`}</div>

                      <div style={{ display: 'inline-flex' }}>
                        <span style={{ color: 'black' }}> {`ГРН: `}</span>  <span>{el.grn}</span>
                        <span style={{ color: 'black' }}> {`Дата ГРН: `}</span>  <span>{el.recdate}</span>
                      </div>

                    </div>)
                })}
              </div> : null}
            </div>


          </div>
          <div className={s.plitki_grid}>






            {tovZnak?.mass ?
              <div className={s.item} style={{ display: 'flex', flexDirection: 'column', width: '350px', padding: '20px' }}>
                
                <div style={{ padding:'10px'
                ,width:'100%'
                , zIndex: 100 }}>
                  <h6 style={{ textAlign: "left", padding: '10px',color:'black' }}>ЗАРЕГИСТРИРОВАННЫЕ ТОВАРНЫЕ ЗНАКИ</h6>
                </div>

                <div style={{height:'auto', overflow:'auto'}}>
                  {tovZnak.mass.map((el, i) => {
                    return (
                      <div>
                        <div key={i} style={{
                          display: 'flex'
                          , alignItems: 'center', justifyContent: 'flex-start'
                        }} >
                          <p style={{ fontSize: '10px' }}>{i + 1}</p>
                          <div style={{ margin: '5px' }}>
                            <img alt="" src={`${el.url_logo}`} width={120} />
                          </div>
                          <div>
                            <span style={{ color: 'black', fontSize: '10px', marginLeft: '10px' }}>{el.registration_number}</span>
                            <span style={{ color: 'black', fontSize: '10px', marginLeft: '10px' }}> {`${new Date(el.registration_date).toLocaleDateString()}`} </span>
                            <span style={{ color: 'black', fontSize: '10px', marginLeft: '10px' }}> {`${new Date(el.expiration_date).toLocaleDateString()}`} </span>
                          </div>

                        </div>
                        
                        <div style={{ width: '100%', height: '1px', border: '1px dotted cyan', marginTop: '10px', marginBottom: '10px' }}></div>
                      </div>
                    )
                  })


                  }
                   </div>
                  <div>
                    <a style={{ textDecoration: 'none', textTransform: 'uppercase', fontSize: '14px' }} href="#home">
                      ПОДРОБНЕЕ
                    </a>

                  </div>  </div>: null
}

                  {chartData ?
                    <div className={s.item} style={{ display: 'flex', flexDirection: 'column', width: '350px',height:'max-content', padding: '20px' }}>

                      <h6 style={{ textAlign: "left", padding: '10px' }}>ФИНАНСОВЫЕ ПОКАЗАТЕЛИ И ОТЧЁТЫ КОМПАНИИ</h6>
                      <CHARTS data={chpribil} title={{ display: true, text: 'ЧИСТАЯ ПРИБЫЛЬ, млн руб', font: '14px' }} type={'B'} />

                      <br />
                      <CHARTS data={chartData} type={'B'} title={{ display: true, text: 'ВЫРУЧКА, млн руб', font: '14px' }} />
                      <br />
                      <div style={{
                        alignSelf: 'flex-end'
                        , justifySelf: 'flex-start'
                        , width: '100%', height: '100%'
                      }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <a style={{ textDecoration: 'none', textTransform: 'uppercase', fontSize: '14px' }} href="#home">
                            ПОДРОБНЕЕ
                          </a>
                          <a style={{ textDecoration: 'none', textTransform: 'uppercase', fontSize: '14px' }} href="#home">
                            СКАЧАТЬ ОТЧЁТЫ EXCEL
                          </a>
                        </div>

                      </div>
                    </div> : null}

                 
                  <div className={s.item} style={{ width: '200px', height: 'fit-content', boxShadow: '1px 1px black' }}>Прежде всего повышение уровня гражданского сознания требует определения и уточнения системы обучения кадров, соответствующей насущным потребностям. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции требует анализа дальнейших направлений развития. Равным образом понимание сущности ресурсосберегающих технологий играет важную роль в формировании соответствующих условий активизаци</div>
                  <div className={s.item} style={{ width: '100px', height: 'fit-content', boxShadow: '1px 1px black' }}>Таким образом дальнейшее развитие различных форм деятельности напрямую зависит от системы массового участия. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности обеспечивает актуальность соответствующих условий активизации. Значимость этих проблем настолько очевидна, что консультация с широким активом представляет собой интересный эксперимент укрепления демократической системы. С другой стороны понимание сущности ресурсосберегающих технологий влечёт за собой интересный процесс внедрения модернизации прогресса профессионального общества. Значимость этих проблем настолько очевидна, что понимание сущности ресурсосберегающих технологий напрямую зависит от соответствующих условий активизации.</div>
                  <div className={s.item} style={{ width: '100px', height: 'fit-content', boxShadow: '1px 1px black' }}>С другой стороны постоянное информационно-пропогандистское обеспечение нашей деятельности играет важную роль в формировании новых принципов формирования материально-технической и кадровой базы. Разнообразный и богатый опыт понимание сущности ресурсосберегающих технологий требует определения и уточнения прогресса профессионального общества. С другой стороны сложившаяся структура организации напрямую зависит от экономической целесообразности принимаемых изменений.</div>
                  <div className={s.item} style={{ width: '100px', height: 'fit-content', boxShadow: '1px 1px black' }}>Следует отметить, что начало повседневной работы по формированию позиции способствует повышению качества существующий финансовых и административных условий. Повседневная практика показывает, что выбранный нами инновационный путь обеспечивает актуальность направлений прогрессивного развития.</div>
                </div>

              </div>
  


      </div>



        </>

        )


}


