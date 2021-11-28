import GETTABLE from "../../COMPONENTS/GETTABLE";
import { getMassRows } from "../../JS/properties";
import React, { Fragment } from "react";
import { getEmpty } from "../../JS/properties";

const FZ223 = ({ mainForm }) => {


    if (!mainForm.mass223FZAGG || mainForm.mass223FZAGG.length < 1) { return (getEmpty('Данные по участию в госзакупках по 223-ФЗ отсутствуют')) }

    let mass = []
    const styles =
    {
        fontWeight: 700
        , height: '10px'
        , padding: '2px'
    }

    // console.log(mainForm.mass44FZAGG)

    const head =
        ['Периоды', 'Количество тендеров (контрактов)', 'Стоимость тендеров', 'Действия']
    mass.push(head)
    mainForm.mass223FZAGG.forEach(el => {
        let perTenders = '0'
        let perSumm = '0'
        perTenders = el.cnt / el.max_cnt * 100
        perSumm = el.price / el.max_price * 100
        mass.push
            ([<div style={{
                ...styles
                , color: 'white'
                , fontSize: '12px'
            }}>{el.years}</div>
                ,

            <div className={{}} style={{ width: '60%' }}> {el.cnt}
                <div className={'graf_223'} style={{ ...styles, ...{ width: `${perTenders}%` } }}></div>
            </div>,
            <div className={{}} style={{ width: '80%' }}> {el.p_price}
                <div className={'graf_223'} style={{ ...styles, ...{ width: `${perSumm}%`, display: 'block' } }}>
                </div> </div>,
            <img onClick={()=>ExcelDownloadHandler(el.years)} src='..\img\excel_import.png' style={{ height: '40px', display: "inline-flex" }} alt=""></img>
            ])
    });

    function ExcelDownloadHandler (years)
    {alert(  `Необходимо подключить функцию для скачивания и скачать excel для ${years} `)}

    return (
        <Fragment>
            
            <GETTABLE funcGetRows={[...getMassRows(mass)]}  //Регистрационные данные
                style={{
                    tclass: ["fz44 mtbl tblcolorhead"],
                    captionStyle: { "color": "lightblue", "alignText": "center", "fontSize": "12px" }
                }}
                name={"Данные о закупках в соответствии с 223-ФЗ (в роли Заказчика)"}
                endtbl={true}
                tStyle={{ width: '80%', margin: 'auto', justifyContent: 'center' }}
            />
        </Fragment>
    )

}
export default FZ223;