import {getParamsObj} from './properties'
import {getResponsePg,render} from './connection'

  





   export async function getDATAGoszakupki (inn)  {
    if(inn) {
       
      let obj =  getParamsObj()
       obj.inn = inn
       obj.fields = "*"
       obj.table = `f_getgoszakupkioptimal('${inn}')`
       obj.host = '/159'
       return await getResponsePg(obj)
       } }


       
     export async function result (inn,kpp,commercial) {
       let sql='';
       if (commercial===0) {sql= `f_getformsX('${inn}','${kpp}')`}  
       if (commercial===1) {sql= `f_getforms_free('${inn}',1)`}
       if (commercial===2) {sql= `f_getforms_free('${inn}',2)`}

        if (inn){  
         let obj =  getParamsObj()
         obj.inn = inn
         obj.fields = "*"
         obj.table = sql
         obj.host = '/159'
        return await render(obj)
         }}


         export async function getDATAArbitrAGG (inn) {
          if (inn){ 
            
           let obj =  getParamsObj()
           obj.inn = inn
           obj.fields = "*"
           obj.table = `f_getarbitrdata('${inn}')`
           obj.host = '/159'
           return await getResponsePg(obj)
           }}
          

           
         export async function getDATAinn (inn,ogrnip = null) {
          if (inn){ 
            
           let obj =  getParamsObj()
           obj.inn = inn
           obj.fields = "*"
           obj.table = `f_getformsIP('${inn}', '${ogrnip}')`
           obj.host = '/159'
           return await getResponsePg(obj)
           }}

                    
         export async function f_getDictionary( num =0) {
          let obj =  getParamsObj()
           obj.fields = "*"
           obj.table = `f_getDictionary(${num})`
           obj.host = '/159'
           return await getResponsePg(obj)
           
          }

          export async function f_getResult( json_ = '',dopSql = '') {  // ЮЛ работа со списками
            let obj =  getParamsObj()
             obj.fields = "*"
             obj.table = `f_getlistsresult_do('${json_}','${dopSql}')`
             obj.host = '/159/get_report_entity'
             obj.dopSql = ''
             return await getResponsePg(obj)
             
            }

            export async function f_getlistsresult_ip_do( json_ = '',dopSql = '') {// ИП работа со списками
              let obj =  getParamsObj()
               obj.fields = "*"
               obj.table = `f_getlistsresult_ip_do('${json_}',${dopSql})`
               obj.host = '/159'
               obj.dopSql = ''
               return await getResponsePg(obj)
               
              }



                       
         export async function f_getPledges (inn) {
          if (inn){        
           let obj =  getParamsObj()
           obj.inn = inn
           obj.fields = "*"
           obj.table = `f_getPledges('${inn}')`
           obj.host = '/159'
           return await getResponsePg(obj)
           }}
            
           export async function f_getpledges_participants (dataport_id, years) {
            if (dataport_id && years){        
             let obj =  getParamsObj()
             obj.fields = "*"
             obj.table = `f_getpledges_participants(${dataport_id},${years})`
             obj.host = '/159'
             return await getResponsePg(obj)
             }}
   //f_getpledges_detail


   export async function f_getpledges_detail (mainpart=0, part=0,year = 0) {
    if (1){        
     let obj =  getParamsObj()
     obj.fields = "*"
     obj.table = `f_getpledges_detail(${mainpart},${part},${year})`
     obj.host = '/159'
     return await getResponsePg(obj)
     }}

     export async function f_get_knm (inn ='') {
      if (1){        
       let obj =  getParamsObj()
       obj.fields = "*"
       obj.table = `f_getknm_info('${inn}')`
       obj.host = '/159'
       return await getResponsePg(obj)
       }}

       
     export async function f_getTovZnak (inn ='') {
      if (1){        
       let obj =  getParamsObj()
       obj.fields = "*"
       obj.table = `f_getTOVZNAK('${inn}')`
       obj.host = '/159'
       return await getResponsePg(obj)
       }}

       export async function f_getknm_dopinfo (rp_id =0) {
        if (1){        
         let obj =  getParamsObj()
         obj.fields = "*"
         obj.table = `f_getknm_dopinfo(${rp_id})`
         obj.host = '/159'
         return await getResponsePg(obj)
         }}

         export async function f_get_substates (dp_id =0,y = 0) {
               
           let obj =  getParamsObj()
           obj.fields = "*"
           obj.table = `f_get_substates(${dp_id},${y})`
           obj.host = '/159'
           return await getResponsePg(obj)
         }
// МОНИТОРИНГ
         export async function f_get_migr_all_info() {
          let obj =  getParamsObj()
          obj.fields = "*"
          obj.table = `f_get_migr_all_info()`
          obj.host = '/159'
          return await getResponsePg(obj)
        }

  // ХОЛДИНГИ СОВЛАДЕНИЯ

  export async function h_get_initialstate(holder = null) {
    let obj =  getParamsObj()
    obj.scheme = 'h3k'
    obj.fields = "*"
    obj.table = `h_get_initialstate(${holder})`
    obj.host = '/151'
    return await getResponsePg(obj)
  }
  export async function f_getforms(inn = null,sh='h3k', host='/151' ) {
    let obj =  getParamsObj()
    obj.scheme = sh
    obj.fields = "*"
    obj.table = `f_getforms('${inn}')`
    obj.host = host
    return await getResponsePg(obj)
  }