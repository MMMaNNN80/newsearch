import XL from 'exceljs'
import FileSaver from 'file-saver';

export const writeExcelJS = async (data=[],workSheetColumnNames,WorksheetNames,filePath, hbgColor ='131b8f',htextcolor= 'f2f3f7') =>{
    
  console.log(hbgColor)
  const workbook = new XL.Workbook();
  
  
WorksheetNames.forEach((WorksheetName,i)=>
    {
     
   const worksheet = workbook.addWorksheet(WorksheetName,{properties:{tabColor:{argb:hbgColor}}});
    worksheet.columns  = workSheetColumnNames[i]
   const colNumber = workSheetColumnNames[i].length
   
   worksheet.getRow(1).eachCell({includeEmpty: true}, (cell, colNumber) =>{
      colNumber =  workSheetColumnNames[i].length
      cell.fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb: hbgColor},
        bgColor:{argb:'f2f3f7'}
      }
      cell.font = {
        color: {argb:htextcolor},
        size:9
      }   
  })
  worksheet.getRow(1).height = 20;
  
  // const col = worksheet.getColumn('href')
  // col.eachCell( (cell,rowNumber)=>{
  //    rowNumber = mass.length
      
  //    cell.font = {
  //     color: {argb:'6141bf'}
  //   }
  // })
  worksheet.views = [
    {state: 'frozen', xSplit: 0, ySplit: 1}
  ];
  worksheet.autoFilter = {
    from: {
        row: 1,
        column: 1
    },
    to: {
        row: 1,
        column: colNumber
    }
  }
  

  
    if (data[i] && data[i].length>0) data[i].forEach(el=> {
       worksheet.addRow(el)
    });



  })
  // save under export.xlsx
   workbook.xlsx.writeBuffer()
  .then(buffer => FileSaver.saveAs(new Blob([buffer]), filePath))
  .catch(err => console.log('Error writing excel export', err))
  
  }