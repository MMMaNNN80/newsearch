

import React from 'react';
import { Bar,Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';


ChartJS.register(...registerables);

export default function CHARTS({data,type=`B`,title = {display:false,text:''},legend = {display:false} })
 {

  if (type ===`B`){
  return (
<>
      <Bar
        data={data}
        options={{
          plugins: {
            title: title,
            legend: legend,
     
        }
        }}
      />
  </>
)} else if (type ===`P`){
return (
<Pie
      type="pie"
      options={{
        title: title,
        legend: legend}}
      data={data}     
      
    />


)

} 
}


