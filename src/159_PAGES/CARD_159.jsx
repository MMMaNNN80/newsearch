import React, {  } from 'react'
import { getMassForm} from "../JS/properties"
import GETTABLE from '../COMPONENTS/GETTABLE'

const CARD_159 = ({mainForm,cardstate}) => {

 if(cardstate===2) {
    return (
        <div className="form" style={{"background":"linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))"}} >
            <div className="spcard">
                <div className="lblCard">
                    <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
                    <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
                    <p className="sh_name">{mainForm.short_name.value}</p>
                    <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
                </div>
                <div className="main_card">
                    <GETTABLE funcGetRows={getMassForm("159",'OSN',mainForm)}
                        style={
                            {
                                tclass: ["maininfo"],
                                captionStyle: { "color": "lightgrey", "alignText": "center" }
                            }
                        }
                        name={"Основная информация:"}

                    />
                                <GETTABLE funcGetRows={getMassForm("159",'CONT',mainForm)}
                        style={
                            {
                                tclass: ["maininfo"],
                                captionStyle: { "color": "lightgrey", "alignText": "center", }
                            }
                        }
                        name={"Контакты:"}
                    />

                </div>
            </div>
        </div>

    )
} else {return null;}                 

}
export default CARD_159;