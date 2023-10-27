import React from 'react'
import "./style.css"
import {  Card,Row } from 'antd'
import Button from '../Button'

const Cards = ({income,expense,totalBalance,showExpenseModal,showIncomeModalVisible}) => {
  return (
    <div>
   <Row className='my-row'>
    <Card className='my-card' title="Current 
    Balance">
    <p>₹{totalBalance}</p>
    <Button text="Reset Balance" blue={true}/>
    </Card>
    <Card className='my-card' title="Total Income">
    <p>₹{income}</p>
    <Button text="Reset Balance" blue={true} onClick={showIncomeModalVisible}/>
    </Card>
    <Card className='my-card' title="Total Expenses">
    <p>₹{expense}</p>
    <Button text="Reset Balance" blue={true} onClick={showExpenseModal}/>
    </Card>
   </Row>
    </div>
  )
}

export default Cards
