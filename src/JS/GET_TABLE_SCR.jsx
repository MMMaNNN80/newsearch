
import s from '../CSS/scrtable.module.css'
import { getEmpty } from './properties'

const GET_TABLE_SRC = ({massObjCol,massValues, thread,heightT,widthT,styleCell={}} )=>{


if (!massObjCol) {return getEmpty("Нет данных для построения таблицы")}
if(!thread) { thread={background:'rgb(0, 111, 144)'} };
if(!massValues) {massValues=[]}
if(!heightT) {heightT={height:'200px'}}
if(!widthT) {widthT={width:'100%'}}



  return (
        <div  className={s.scrolltable} >
        <table style={{...widthT}} key={1}>
            <thead style={{...thread  }}>
           <tr style={{}}>
         {massObjCol.map((el,i)=><th key={i}  style={{...el.style}}>{el.name}</th>)} 
         </tr>       
            </thead>
            
        </table>	
        <div className={s.scrolltablebody} style={{...heightT}}>
            <table style={{...widthT}} key={2}>
            <thead style={{}}>
                <tr style={{visibility:'collapse'}}>
            {massObjCol.map((el,i)=> 
            <th  key={i}  style={{...el.style}}/>)} 
            </tr>
          </thead>
       
        <tbody>  
       

                    {massValues.map((tr_,number)=>{
                         return  ( 
                              <>
                              <tr  key={number}>
      {tr_.map((td_,j)=>{ return <td style={{...styleCell}} key={j}>{td_}</td> })}
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