import { React, useState, useRef } from 'react'
import {getOBJpublic} from '../JS/MAPPING_SQL'
import { getParamsObj, getMassForm } from "../JS/properties"
import {  getResponsePg } from '../JS/connection'
import GETTABLE from './GETTABLE'


const CARD_151 = (props) => {
    const [mainForm,setMainform] = useState(()=>getOBJpublic() )
    
    const r = useRef(true)

    if (r.current) { render() } //что бы рендер компонента был 1 раз
// Настраиваем соединение 
    async function render() {
       r.current = false   // чтобы не было перерендера
        let obj = getParamsObj()
        obj.fields = "*"
        obj.table = `f_getforms('${props.objState[0].data.inn}')`
        obj.host = '/151'
        getResponsePg(obj)
            .then(mass => {
                let objX = mass[0].f_getforms;
                
                //MAPPING с источника
                //---ОСНОВНАЯ ИНФОРМАЦИЯ
                mainForm.sparkid.value = objX.sparkid
                mainForm.full_name.value = objX.fullnamerus
                mainForm.short_name.value = objX.shortnamerus
                mainForm.date_first_reg.value = objX.datefirstreg
                mainForm.ogrn.value = objX.ogrn
                mainForm.inn.value = objX.inn
                mainForm.kpp.value = objX.kpp
                mainForm.status.value = objX.status
                mainForm.okopf.value = objX.okopf
                mainForm.okved_name.value = objX.okved
                mainForm.capital.value = objX.chartercapital
                mainForm.leader.value = objX.position + ' ' + objX.fio
                //-----------------------КОНТАКТЫ-------------------------
                mainForm.address.value = objX.address
                mainForm.phones.value = (objX.phone) ? objX.phone : ''
                mainForm.email.value = (objX.phone) ? objX.email : ''
                setMainform((prev) => {
                    return {
                        ...prev,
                        ...mainForm
                    }

                });
            }
            )
    }



    return (
        <div style={{"background": "linear-gradient(55deg, rgb(12, 47, 56),rgb(9, 24, 26))"}} className="form" >
            <div className="spcard" style={{}} >
                <div className="lblCard">
                    <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
                    <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
                    <p style={{"color":"darkgreen"}} className="sh_name">{mainForm.short_name.value}</p>
                    <p style={{"color":"darkred"}} className="c_source">&reg;источник {"Продуктовый сервер 151 (ИНТЕРФАКС)"}</p>
                </div>
                <div className="main_card" >

                    <GETTABLE funcGetRows={getMassForm("151",'OSN',mainForm)}
                        style={
                            {
                                tclass: "maininfo",
                                captionStyle: { "color": "white", "alignText": "center" }
                            }
                        }
                        name={"Основная информация:"}

                    />
                                <GETTABLE funcGetRows={getMassForm("151",'CONT',mainForm)}
                        style={
                            {
                                tclass: "maininfo",
                                captionStyle: { "color": "white", "alignText": "center", }
                            }
                        }
                        name={"Контакты:"}

                    />

                </div>
            </div>
        </div>

    )

}
export default CARD_151;