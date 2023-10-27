import React from 'react';
import { Card } from 'antd';
import './style.css'

import {Chart as ChartJS,ArcElement,Tooltip,Legend} from "chart.js"
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const PieChart = ({sortedTransaction}) => {

       const spendingData = sortedTransaction.filter((transaction)=>{
    if(transaction.type === 'expense'){
      return {tag: transaction.tag, amount: transaction.amount};
   }
   })

  const data = {
    labels: spendingData.map((kindof)=>(
    kindof.tag)
  
    ),
    datasets: [
      {
        data: spendingData.map((price)=>(
                price.amount
        )),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      
      },
    ],
  };

  const options={
  
responsive: true,
width: 200,
height: 200,
  }

  return (
    <Card title="" className='pie-chart'>
      <Pie data={data}  options={options}/>
    </Card>
  );
};

export default PieChart;
