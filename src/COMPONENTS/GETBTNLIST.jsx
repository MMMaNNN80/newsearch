
function GETBTNLIST({ 
    who 
    ,mass
    ,func
    ,actClass
    ,classActive = ['btnActive']
    ,classNonActive = [''] 


}) 

{
    //console.log(new Set(massYears))
    if (!mass.length) { return null }  
    return (
        <>
            {[...mass].map((el, i) => {
                return (<div  key={who+i}
                    className={
    getActiveClass(el,classActive,classNonActive)}
                    onClick={() => func(el)}
                    style={{
                        gridColumn: 2 + i
                       
                        ,alignSelf:"center"
                        ,justifySelf:'center'
                       ,color:'white'
                       ,marginRight:'5px'
                       , width: 'max-content'
                       , padding: '5px'
                       , opacity: '0.9'
                    }}
  
                >{el}</div>)
            })
            }
        </>
    )


function getActiveClass(el,classActive,classNonActive){
    

    if(actClass.val === el)
    {
        return [...classActive,...classNonActive].join(' ')
    }
      return [classNonActive]
}
}

export default GETBTNLIST;