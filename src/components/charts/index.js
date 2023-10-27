import React from 'react';
import { Line } from '@ant-design/charts';
import PieChart from '../PieChart/PieChart';
import { Flex } from 'antd';

const  Charts = ({sortedTransaction}) => {
  const data = sortedTransaction.map((item)=>{
    return {date: item.date, amount: item.amount}
  })

  // const spendingData = sortedTransaction.filter((transaction)=>{
  //   if(transaction.type === 'expense'){
  //     return {tag: transaction.tag, amount: transaction.amount};
  //   }
  // })

  // let newSpendings=[
  //   {tag: "food",amount: 0},
  //   {tag: "education",amount:0},
  //   {tag: "office",amount: 0}
  // ];
  // spendingData.forEach((item)=>{
  //   if(item.tag === "food"){
  //     newSpendings[0].amount+=item.amount;
  //   }
  //   else if(item.tag === "education"){
  //     newSpendings[1].amount+=item.amount;
  //   }
  //   newSpendings[2].amount+=item.amount;
  // })
  
  const config = {
    data: data,
    width: 800,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
  };

  // const spendingConfig={
  //   data: newSpendings,
  //   width: 500,
  //   autoFit: true,
  //  anleField: "amount",
  //  colorField: "tag",
  // }

  let chart;
  //let pieChart

  // Export Image
//   const downloadImage = () => {
//     chart?.downloadImage();
//   };

//   // Get chart base64 string
//   const toDataURL = () => {
//     console.log(chart?.toDataURL());
//   };

  return (
    <div>
    <h2 style={{margin: "1rem"}}>Your Analytics</h2>
    <div className='charts-wrapper'>
   <div className='flex-stats'>
        <div>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
         <PieChart sortedTransaction={sortedTransaction}/>
    </div>

    
   </div>
   </div>
  );
};
export default Charts