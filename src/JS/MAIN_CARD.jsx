
const MAIN_CARD = (props) => {

    const CHILDREN = (props.CHILDREN) ? props.CHILDREN :  function X (){return <div style={{color:'white'}}>Отсутствуют данные</div>}
   const name = props.name
//    {mainForm.short_name.value}
    return (
        <div className="form" style={{ "background": "linear-gradient(55deg, rgb(25, 23, 100),rgb(1, 60, 26))" }} >
            <div className="spcard">
                <div className="lblCard">
                    <p className="c_name" style={{}}> КАРТОЧКА КОМПАНИИ: </p>
                    <img src="/icon/rtk-logo-desktop.png" alt="." style={{}} />
                    <p className="sh_name">{name}</p>
                    <p className="c_source">&reg;источник {"Внешний контур 159 сервер"}</p>
                </div>
                <div className="main_card">
                    <div className="cowners" style={{ "padding": "5px" }}>
                            <CHILDREN/>
                    </div>
                </div>
            </div>
     </div>
            )


}
export default MAIN_CARD;