import React from "react";
import GET_MODAL from "../JS/GET_MODAL";
import s from "../CSS/inndemo.module.css"
import GET_TABLE_SRC from "../JS/GET_TABLE_SCR"


//import e from "cors";



const INN_DEMO = ({ activeModal, setActiveModal, name }) => {

 return (
        <> <GET_MODAL
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            CHILDREN={<CHILDREN key={1} />}
            text={name}
            styleHead={{
                fontSize: '30px'
                , padding: '8px'
                , fontFamily: 'ui-monospace'
                , fontWeight: '700'
                , color: '#006f90'
            }}
            styleBody={{
                minWidth: '1000px'
                , maxWidth: '1000px', height: 'auto'
                , background: 'white'
                ,
            }}
        />

        </>
    )

function CHILDREN() {
    let  objmass = 
[{type:'ХОРОШИЕ КАРТОЧКИ - ЗАПОЛНЕНИЕ',
 obj: [ {inn: `7707049388`, dataport_id: `24468233`, name: `ПАО РОСТЕЛЕКОМ`,comm: `-`},
       {inn: `7703616170`, dataport_id: `16140365`, name: `ООО ЦЕНТР ХРАНЕНИЯ ДАННЫХ`,comm: `-`}
], use:'Везде'},

 {type:'БАНКРОТЫ ЮЛ', 
 obj:  [
    {inn: `4704002080`, dataport_id: `20940761`, name: `ООО РОЩИНСКИЙ ДОМ`,comm: `Заполнены банкротные данные`},
     ], use:'Банкроты'},


 {type:'РАПФ', 
 obj: 
 [
    {inn: `9909001015`, dataport_id: `не может быть`, name: `ШЕРИНГ-ПЛАУ СЕНТРАЛ ИСТ АГ`,comm: `-`},

 ], use:'РАПФ'
},
{type:'ОРГАНЫ УПРАВЛЕНИЯ',
obj: 
[
   {inn: `0277125426`, dataport_id: `15180093`, name: `ООО БАШСТРОЙБЕТОН`,comm: `заполнены: руководители, дисквалификация,сведения недостоверности`}

], use:'ОРГАНЫ УПРАВЛЕНИЯ'
}
,{type:'РЕГИСТРАТОРЫ', 
obj: 
[
   {inn: `7707083893`, dataport_id: `18388582`, name: `ПАО СБЕРБАНК`,comm: `присутствуют регистраторы`}

], use:'КАРТОЧКА КОМПАНИИ'
}
,{type:'СРЕДНЯЯ ЧИСЛЕННОСТЬ', 
obj: 
[
   {inn: `7802003104`, dataport_id: `16291867`, name: `ЗАО "РОССТАР"`,comm: `уменьшение средней численности`},
   {inn: `7703616170`, dataport_id: `16140365`, name: `ООО "ЦЕНТР ХРАНЕНИЯ ДАННЫХ"`,comm: `увеличение средней численности`}

], use:'КАРТОЧКА КОМПАНИИ'
}

]

objmass = objmass.map((el,i)=>{

return (
[i+1,<span>{el.type}</span>,
<div key={i}>
{el.obj.map((elem,i) => <><div style={{color:'blue',fontSize:'12px'}}>{`${elem.inn}`}</div><br/></>)}

</div>
,<div key={i}>

{el.obj.map((elem,i) => <><div key={i}>{`${elem.dataport_id}`}</div><br/></>)}
 
</div>
, el.obj.map((elem,i) => <><div key={i}>{`${elem?.comm}`}</div><br/></>)
,<div key={i}>
{el.obj.map((elem,i) => <><div  style={{color:'#793587',fontSize:'18px',fontWeight:'700'}} key={i}>{`${elem.name}`}</div><br/></>)}
</div>
]
)


})

return (
<>
<hr/>
  
<div className= {s.wrapper}>



 <GET_TABLE_SRC massObjCol={
                                        [
                                            { name: '#', style: { width: '4%' } },
                                            { name: 'ТИП примера', style: { width: '25%' } },
                                            { name: 'ИНН', style: { width: '20%' } },
                                            { name: 'DATAPORT_ID', style: { width: '20%' } },
                                            { name: 'Комментарии', style: { width: '30%' } },
                                            { name: 'Наименование организации', style: { width: '60%' } }
                                          
                                        ]
                                    }
                                    
                                     massValues={ objmass} heightT={{ minheight:  '300px' }} />
                        

                        {/* ******************************************************************************************************************** */}
                 
     </div>
                       
     </>          
)
}
}

// `ИНН: 0277125426 , dataport_id: 15180093 ООО "БАШСТРОЙБЕТОН" (заполнены: руководители, дисквалификация
//   ,сведения недостоверности)`
// ]} 


// , { id: 8, name: `Совладельцы`, isCom: true, type: 'nav', path: `/cowners/${inn}` 

// ,exTextMass:[
// `ИНН: 7740000076 , dataport_id: 22315514  ПАО МТС (тип ПАО - статика с Интерфакса),
// есть ЮЛ, ИК -  ЕГРЮЛ и РОССТАТ
// `,s
// `ИНН: 6901028274 , dataport_id: 21471741 "ТД"ДУБРОВСКИЙ" (тип пополняемый, ФИЗ ЛИЦА),
// `
// ]} 

/* <div style={{
            color: 'white', padding: '5px'
          }}>
            <p style={{ width: 'max-content' }}>Примеры ИНН для демонстрации разделов </p>
            <div style={{ display: 'flex' }}>

              <select style={{
                width: '150px'
                , fontSize: '12px'
                , maxHeight: '25px'
              }}

                value={exID}
                onChange=
                {e => {
                  setExId(e.target.value);


                }}
              >
                {massEx.map((elem, i) =>
                  <option
                    key={i}
                    value={elem.id}
                  > {`${i + 1}. ${elem.name}`}
                  </option>)}
              </select>

              <div style={{
                marginLeft: '10px'
                , padding: '10px'
                , minHeight: '100px'
                , minWidth: '500px'
              }}>
                <ul style={{
                  listStyleType: 'circle'
                  , fontSize: '13px'
                }}>
                  {massEx.filter(el => el.id === exID)[0]?.exTextMass
                    .map(
                      (el, i) => {
                        console.log(exID)
                        return (<li key={i}> {el}</li>)
                      })} </ul>
              </div>

            </div>


          </div> */

export default INN_DEMO;