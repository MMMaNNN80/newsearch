

function SPINER({val,text} ){
  if (!val) { val='100px'} 
  if(text===undefined) {text=true}
    return (<>
    <div className="" style={{margin:'5%  auto',position:'relative'}}>

<div className="spinner-border text-light" role="status" style=
{{height: `${val}px`
,width:   `${val}px`
,display:'block' 
,position:'relative' 
,margin:'0 auto',justifyContent:'center'
,animation: '2s linear infinite spinner-border'
,opacity: 0.9
,borderWidth:'15px'
}}>


</div>
<br/>
{text===true ?<div style={{color:'white' ,textAlign:'center'}}>Подождите, идет загрузка...</div> :
<div style={{color:'white' ,textAlign:'center'}}>{text}</div> 
}
</div>
    </>)
  }
export default SPINER;
