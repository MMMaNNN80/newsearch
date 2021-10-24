
import React  from "react";



function CARD({state,update}) {
    
    console.log(state)
     if (state) {
        const mass = state

     return  mass.map((obj, num) => 


     {
            const shortname = obj.value;
            const data = obj.data;
            let color = [];
            let branchStyle = {}
            obj.key = num
            if (data.branch_type === 'MAIN') {         
           //data.branch_type = 'Головная компания'
             branchStyle = { color: 'green'}
            }
            if (data.branch_type === 'BRANCH') {
               // data.branch_type = 'Филиал'
                branchStyle = { color: ' rgb(149, 156, 223)' }
                  
            }
            if (data.state && data.state.status === "ACTIVE") { color = { backgroundColor: "green" } }
            else if (data.state && data.state.liquidation_date) {
                color = { backgroundColor: "red" }
            }
            else {
                color = { backgroundColor: "blue" }
            }
            function setDataReport(i)
            {
                const Rmass = mass.filter(el=>el.key === i)
               update(Rmass)
            }

///////////*****************************************************************/////////////////////////////////////////////////////////////////////////////////////////////
            return (
                <div className="card" key={obj.key} 
                onClick={()=> setDataReport(obj.key)}
                
                >
                    <div className="status " style={color}></div>


                    <div className="reqv  lead">

                        &#9885;  {' ИНН: ' + data.inn + ' КПП: ' + (data.kpp ? data.kpp : '-') + ' ОГРН: ' + (data.ogrn ? data.ogrn : '-')} &#9885;
                    </div>
                    <div className="orginfo">
                        <div className="orgname lead">
                            {shortname}
                        </div>
                        <div className="orgform" style={{ ...branchStyle }}>
                            &#9971;  {
                                data.branch_type
                            }
                        </div>

                        <div className="orgleader">
                            {
                                !data.management ? '' : data.management.post.toLowerCase() + ': ' + data.management.name
                            }
                        </div>


                        <div className="orgaddress monospace lead">
                            {data.address.unrestricted_value}
                        </div>
                        <div className="divider  "> </div>
                    </div>

                </div>
            )

        }

        )
    } else { return ''; }

}
export default CARD;