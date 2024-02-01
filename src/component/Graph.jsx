import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import instance from '../instance';
import { Colors } from 'chart.js';
import {Chart, ArcElement} from 'chart.js';
import { Tooltip,Legend, Title} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ArcElement,Title,Legend);
Chart.register(Colors);
Chart.register([Tooltip]);
Chart.register(ChartDataLabels);
// Chart.register(ChartDataLabels);

// Chart.defaults.set('plugins.datalabels', {
//   color: '#FE777B'
// });


const Graph = (props) => {
// console.log("props.datasets",props.datasets);
// console.log("props.labels",props.labels);

    const config = {
        type: 'doughnut',
        data: {datasets:[{data:props.datasets,label:"Percentage %",datalabels: {
          color: '#FFCE56'
        }}],labels:props.labels,backgroundColor: [
            'rgba(255, 99, 71, 1)',
            'rgba(54,162,235,0.2)',
            'rgba(255,206,86,0.2)',
            'rgba(75,192,192,0.2)',
            'rgba(153,102,255,0.2)'
          ],label:'Top 5 Personality Traits',datalabels: {
            color: '#36A2EB'
          }},
        options: {
          responsive: true,
          plugins: {
            
            legend: {
              display:false,
            },
            datalabels:{
              display:true,
              formatter: (val, ctx) => {
                // Grab the label for this value
                const label = ctx.chart.data.labels[ctx.dataIndex];
      
                // Format the number with 2 decimal places
                const formattedVal = Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                }).format(val);
      
                // Put them together
                return `${label}: ${formattedVal}%`;
              },
              color: '#fff',
              backgroundColor: '#5F0F40',
            
            },
            title: {
              display: true,
              text: 'Top 5 Personality Traits',
              font:{
                size:17,
              },
      
            },
            // formatter: (val, ctx) => {
            //   // Grab the label for this value
            //   const label = ctx.chart.data.labels[ctx.dataIndex];
    
            //   // Format the number with 2 decimal places
            //   const formattedVal = Intl.NumberFormat('en-US', {
            //     minimumFractionDigits: 2,
            //   }).format(val);
    
            //   // Put them together
            //   return `${label}: ${formattedVal}`;
            // },
            // color: '#fff',
            // backgroundColor: '#404040',
          
            // datalabels: {
            //   color: 'blue',
            //   labels: {
            //     values:{color:'green'},
            //     title: {
            //       font: {
            //         weight: 'bold'
            //       }
            //     }
            //   }
            // },
            // datalabels: {
            //   color: 'black', // Color of the data labels
            //   anchor: 'end',  // Position of the data labels ('start', 'center', 'end')
            //   align: 'top',   // Alignment of the data labels ('start', 'center', 'end', 'bottom')
            // },
           
        colors: {
      forceOverride: true
    },
    // tooltips: {
    //     callbacks: { 
      
         
    //     }
    // }
          },
       
         
        }
      };
  return (
    <div>
      <Doughnut
{...config}
/>
    </div>
  )
}

export default Graph
