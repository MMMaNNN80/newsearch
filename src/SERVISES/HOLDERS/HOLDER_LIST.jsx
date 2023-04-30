import React  from 'react';
import s from '../../CSS/cownerslinks.module.css'


const HOLDER_LIST = ({massHolders,card,updatechart})=>{
return (
  <div className={s.list_holders} >
  {massHolders.length ?
    <div style={{ padding: 10, zIndex: '10' }}>
      {massHolders
        .map((el, i) => {
          return (
            <div className={s.card_h}
            style={{ boxShadow:card===el.inn ? '1px 1px 5px orange' : ''
            ,background:card=== el.inn ? 'white' : ''
          }}
            key={i} 
            onClick={() => {updatechart(el.sparkid,el.inn)}}>
              <div style={{color:'blue'}}> {el.inn} </div>
              <div> {el.name} </div>
            </div>
          )
        })}
    </div>
: null}
</div>
  )

}

export default HOLDER_LIST;
