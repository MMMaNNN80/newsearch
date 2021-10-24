

export function getTextObj(text){
  let info = {}
    if (text && text.replace(/[^A-Za-zА-Яа-яЁё]/gi , "".length >0)) {
     
      info.textlength = text.length;
      info.text = text;
      info.isNullorEmpty = false;
    } else {info.isNullorEmpty = true}    
    return info;
  }

  export function getMassChangeClass(mass, strAdd = null,strRemove =null) {

   if(strRemove  !== null && mass.indexOf(strRemove) !==-1 ) {mass= mass.filter(el => el !== strRemove)}
   strAdd !== null ? mass.push(strAdd) : mass= mass.filter(el => el !== strAdd)
   return mass;
    }