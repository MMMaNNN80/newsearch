import React,{  useState, useEffect} from 'react'
import {getOBJpublic} from '../JS/MAPPING_SQL'
import { getParamsObj, getMassForm } from "../JS/properties"
import {  getResponsePg } from '../JS/connection'
import GETTABLE from './GETTABLE'



const CARD_151 = ({inn,objState ,id}) => {
    
    const [mainForm,setMainform] = useState( null )
 
    const inn_ = inn ? inn: objState?.length?  objState[0]?.data?.inn : null   

    useEffect(()=>render(inn_),[inn_])

//if (r.current) { render() } //что бы рендер компонента был 1 раз   render()
// Настраиваем соединение 
    async function render(inn) {
      // r.current = false   // чтобы не было перерендера
      console.log(inn)
        let obj = getParamsObj()
        obj.fields = "*"
        obj.table = `f_getforms('${inn}')`
        obj.host = '/151'
      await  getResponsePg(obj)
            .then(obj => setMainform(obj))
        }

        let objX    =getOBJpublic() 

                if (mainForm) {
               // console.log(mainForm)
                    ///console.log(mass)
                    
                    
                    //MAPPING с источника
                    //---ОСНОВНАЯ ИНФОРМАЦИЯ
                    objX.sparkid.value = mainForm.sparkid
                    objX.full_name.value = mainForm.fullnamerus
                    objX.short_name.value = mainForm.shortnamerus
                    objX.date_first_reg.value = mainForm.datefirstreg
                    objX.ogrn.value = mainForm.ogrn
                    objX.inn.value = mainForm.inn
                    objX.kpp.value = mainForm.kpp
                    objX.status.value = mainForm.status
                    objX.okopf.value = mainForm.okopf
                    objX.okved_name.value = mainForm.okved
                    objX.capital.value = mainForm.chartercapital
                    objX.leader.value = mainForm.position + ' ' + mainForm.fio
                    //-----------------------КОНТАКТЫ-------------------------
                    objX.address.value = mainForm.address
                    objX.phones.value = (mainForm.phone) ? mainForm.phone : ''
                    objX.email.value = (mainForm.phone) ? mainForm.email : ''
                                        
                 
            } 

if(objX?.sparkid?.value) {
    return (
        <div className="form" style={{"background": id===1?"linear-gradient(55deg, rgb(50, 40, 116),rgb(93, 24, 26))" :
        "linear-gradient(55deg, rgb(12, 47, 56),rgb(9, 24, 26))"}}  >
            <div className="spcard" style={{}} >
                <div className="lblCard">
                    <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
                    <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
                    <p style={{"color":"darkgreen"}} className="sh_name">{objX?.short_name?.value}</p>
                    <p style={{"color":"darkred"}} className="c_source">&reg;источник {"Продуктовый сервер 151 (ИНТЕРФАКС)"}</p>
                </div>
                <div className=""  style={{height:'200px'}}>
                    <GETTABLE funcGetRows={getMassForm("151",'OSN',objX)}
                        style={
                            {
                                tclass: ["maininfo"],
                                captionStyle: { "color": "white", "alignText": "center" }
                            }
                        }
                        name={"Основная информация:"}

                    />
                    
                    
        <GETTABLE funcGetRows={getMassForm("151",'CONT',objX)}
                        style={
                            {
                                tclass: ["maininfo"],
                                captionStyle: { "color": "white", "alignText": "center", }
                            }
                        }
                        name={"Контакты:"}

                    />
 
                </div>
            </div>
        </div>

    ) } else {return null}

}
export default CARD_151;