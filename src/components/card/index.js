import React from 'react'
import "./style.css"
import {  Card,Row } from 'antd'
import Button from '../Button'

const Cards = ({income,expense,totalBalance,showExpenseModal,showIncomeModalVisible,resetTransaction}) => {
  return (
    <div>
   <Row className='my-row'>
    <Card className='my-card' title="Current 
    Balance" >
    <p style={{color: "green",fontSize: "1rem"}}>₹{totalBalance}</p>
    <Button text="Reset Balance" onClick={resetTransaction} blue={true}/>
    </Card>
    <Card className='my-card' title="Total Income">
    <p style={{color: "black",fontSize: "1rem"}}>₹{income}</p>
    <Button text="add income" blue={true} onClick={showIncomeModalVisible}/>
    </Card>
    <Card className='my-card' title="Total Expenses">
    <p style={{color: "red",fontSize: "1rem"}}>₹{expense}</p>
    <Button text="add expense" blue={true} onClick={showExpenseModal}/>
    </Card>
   </Row>
    </div>
  )
}

export default Cards
