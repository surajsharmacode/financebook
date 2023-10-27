
import React, { useState } from 'react'
import { Radio, Select, Space, Table} from 'antd';
import './style.css'
import searchImg from "../../assets/search.svg"
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import  {Button} from 'antd';
//import { type } from '@testing-library/user-event/dist/type';
//import AddExpenseModal from '../Modals/addExpense';

const TransactionDetail = ({transactionData,addTransaction,fetchTransactionsData}) => {
    const {Option} = Select;
    const [searchTrasnaction,setSearchTransaction] = useState('');
    const [typeFilter,setTypeFilter]=useState('');
    const [sortKey,setSortKey]=useState('');
    console.log('transactopns',transactionData)

    
 // const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  //const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

 
    // const filteredTransaction = transactionData.filter((transaction)=>{
    //     transaction.name.toLowerCase().includes(searchTrasnaction.toLocaleLowerCase())
    // })
    const filteredTransaction = transactionData.filter((transaction)=>
    transaction.name.toLowerCase().includes(searchTrasnaction.toLowerCase()) && transaction.type.includes(typeFilter)

    
)
    const sortedTransactions = filteredTransaction.sort((a,b)=>{
        if(sortKey === 'date'){
            return new Date(a.date)-new Date(b.date);
        }
        else if(sortKey === 'amount'){
            return a.amount - b.amount;
        }
        return 0;
    }
    )
       

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
          },
          // {
          // title: "Action",
          // dataIndex: 'key',
          // render: (key)=>(
          //   <Space size="small">
          //     <Button type='primary' onClick={()=>updateTransaction(transactionData)}>EDIT</Button>
          //     <Button type='danger' style={{background: "red",borderColor: 'red', color: "white"}} >DELETE</Button>
          //   </Space>
          // )
          // }
      ];
      
    
      function exportCSV() {
        const csv = unparse(transactionData, {
          fields: ["name", "type", "date", "amount", "tag"],
        });
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactionData.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      function importFromCsv(event) {
        event.preventDefault();
        try {
          parse(event.target.files[0], {
            header: true,
            complete: async function (results) {
              // Now results.data is an array of objects representing your CSV rows
              for (const transaction of results.data) {
                // Write each transaction to Firebase, you can use the addTransaction function here
                console.log("Transactions>>>", transaction);
                const newTransaction = {
                  ...transaction,
                  amount: parseFloat(transaction.amount),
                };
                await addTransaction(newTransaction, true);
                console.log("New Traansaction>>>",newTransaction);
              }
            },
          });
          toast.success("All Transactions Added");
          fetchTransactionsData();
          event.target.files = null;
        } catch (e) {
          toast.error(e.message);
        }
      }

      // function updateTransaction(){
    
     
  
      // }

      // function deleteTransaction(){
       
      // }
    

  return (
    <div style={{
        width: "90%",
        padding: "0rem 2rem",
      }}>
         <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}>
    <div className='input-flex'>
        <img src={searchImg} alt="" width="16" />
        <input type="text"  value={searchTrasnaction} onChange={(e)=>setSearchTransaction(e.target.value)} placeholder='Search transaction by name'/>
    </div>
  
    <Select
    className='select-input'
    onChange={(value)=>setTypeFilter(value)}
    value={typeFilter}
    placeholder="Filter"
    allowClear
    >
      <Option value="">All</Option>  
      <Option value="income">Income</Option>  
      <Option value="expense">Expense</Option>  
    </Select>
    </div>


    <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportCSV} >
              Export to CSV
            </button>
            <label for="file-csv" className="btn btn-blue">
              Import from CSV
            </label>
            <input
              id="file-csv"
              type="file"
              accept=".csv"
              required
              onChange={importFromCsv}
              style={{ display: "none" }}
            />
          </div>
        </div>
        </div>
   
        
      <Table dataSource={sortedTransactions} columns={columns} />
    </div>
  )
}

export default TransactionDetail
