import React, { Fragment } from "react";


const NOT_FOUND = () => {

    return (
        <Fragment>
            <div className="form" style={{ "background": "linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))" }} >
                <div className="spcard">
                    <div className="lblCard">
                        <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
                        <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
                        <p className="sh_name">{'Компания не найдена'}</p>
                        <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
                    </div>
                    <p style={{ color: "white", fontSize: "50px" }}>Карточка контрагента не была найдена</p>
                </div>
            </div>

        </Fragment>
    )


}
export default NOT_FOUND