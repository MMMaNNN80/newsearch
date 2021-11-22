import React, { Fragment } from "react"


const PAGINATION =({perCountPages,totalItems,setCurrentPage})=>{
let pageNumbers = []

for (let i = 1; i <= Math.ceil(totalItems/perCountPages); i++) {
    pageNumbers.push(i)
    
    }
    return (
        <Fragment>
            <div className="pag_div" style={{ fontSize: '8px', marginTop: '10px'}}>
                <ul className="pagination">
                    {
                        pageNumbers.map(number => {
                            return (
                                <li className="pageItem" key={number} style={{marginRight:'1px'}} onClick={()=>setCurrentPage(number)}>
                                    <a href="#!" className="page-link">{number}</a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </Fragment>)
}

export default PAGINATION;