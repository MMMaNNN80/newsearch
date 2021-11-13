import React,{ useRef,useState} from 'react'
import {getMainform,getOBJpublic} from '../JS/MAPPING_SQL'
import { getMassForm,getParamsObj} from "../JS/properties"
import GETTABLE from '../COMPONENTS/GETTABLE'


const CARD_159 = (props) => {

const [mainForm, setMainform] = useState(()=>getOBJpublic())


//const refMainForm = mainForm
   
 
    const ref = useRef(true);
   if (ref.current )  { render()  }


     async function  render () {

            ref.current = false;
            let obj =  getParamsObj()
            obj.inn = props.objState[0].data.inn
            obj.fields = "*"
            obj.table = `f_getforms('${props.objState[0].data.inn}')`
            obj.host = '/159'
            
             await getMainform(obj).then(
                data=>{
                    
                    setMainform (prev=> {return{ ...prev, ...data}})
                })
           
            
     }
         
        // console.log(mainForm,refMainForm)
     





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
                                tclass: "maininfo",
                                captionStyle: { "color": "cyan", "alignText": "center" }
                            }
                        }
                        name={"Основная информация:"}

                    />
                                <GETTABLE funcGetRows={getMassForm("159",'CONT',mainForm)}
                        style={
                            {
                                tclass: "maininfo",
                                captionStyle: { "color": "cyan", "alignText": "center", }
                            }
                        }
                        name={"Контакты:"}

                    />

                </div>
            </div>
        </div>

    )

}
export default CARD_159;