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


       
     export async function result (inn,commercial) {
        if (inn){  
         let obj =  getParamsObj()
         obj.inn = inn
         obj.fields = "*"
         obj.table = commercial===true ?`f_getformsX('${inn}')`: `f_getforms_free('${inn}')`
         obj.host = '/159'
         console.log(obj.table)
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
          

           
         export async function getDATAinn (inn) {
          if (inn){ 
            
           let obj =  getParamsObj()
           obj.inn = inn
           obj.fields = "*"
           obj.table = `f_getformsIP('${inn}')`
           obj.host = '/159'
           return await getResponsePg(obj)
           }}