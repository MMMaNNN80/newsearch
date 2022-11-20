

const ZAGOLOVOK = ({text, fSize})=>{
  const fontSize = fSize ? `${fSize}px`: '16px';
return (
    <div style={{"color":"lightblue", "padding":"5px", "margin":"0","textAlign":"center",fontSize, fontWeight:"700"}}>
  {text}
    </div>

)
}
export default ZAGOLOVOK;