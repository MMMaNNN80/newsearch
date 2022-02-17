
import s from '../CSS/scrtable.module.css'
import { getEmpty } from './properties'

const GET_TABLE_SRC = ({massObjCol,massValues, thread,heightT} )=>{

//  massObjCol = [
//     {name:'Название блюда', style:{width:'60%'}},
//     {name:'Белки', style:{width:'10%'}},
//     {name:'Жиры', style:{width:'10%'}},
//     {name:'Углеводы', style:{width:'10%'}},
//     {name:'ККАЛ', style:{width:'10%'}},
// ]


if (!massObjCol) {return getEmpty("Нет данных для построения таблицы")}
if(!thread) { thread={background:'rgb(0, 111, 144)'} };
if(!massValues) {massValues=[]}
if(!heightT) {heightT={height:'200px'}}


 

    return (
        <div className={s.scrolltable}>
        <table>
            <thead style={thread}>
                <tr>
                    {massObjCol.map((el,i)=><th key={i} col style={el.style}>{el.name}</th>)} 
                </tr>
            </thead>
        </table>	
        <div className={s.scrolltablebody} style={heightT}>
            <table>
            {massObjCol.map((el,i)=><th key={i} col style={el.style}/>)} 
        

                <tbody>

                    {massValues.map((tr_,number)=>{
                         return  ( 
                              <>
                              <tr key={number}>
      {tr_.map((td_,j)=>{ return <td key={j}>{td_}</td> })}
                              </tr>
                              </>)
                    })}

                </tbody>
            </table>
        </div>	
    </div>
    
    
    )

}

export default GET_TABLE_SRC;