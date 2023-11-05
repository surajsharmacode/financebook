import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/card";
import { Modal } from "antd";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import { collection, doc,where,deleteDoc} from "firebase/firestore";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment/moment";
//import Header from '../components/Header'
import { auth } from "../firebase";
import { addDoc } from "firebase/firestore";
import { query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import TransactionDetail from "../components/TransactionsDetail";
import Charts from "../components/charts";
import NoTransactions from "./NoTransaction";
//import PieChart from "../components/PieChart/PieChart";

const Dashboard = () => {
const [user] = useAuthState(auth);
const [transactionsData,setTransactionData]=useState([]);
const [loading,setLoading]=useState(false)

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
const [income,setIncome]=useState(0);
const [expense,setExpense]=useState(0);
const [totalBalance,setTotalBalance]=useState(0) //totalBalance is current balance
const [transactionId,setTransactionID]=useState('');
const [editedtransaction,setEditedTransaction]=useState([])

console.log("transaction-ID>>>>>>>>",transactionId);
console.log("transactionData>>",transactionsData);


  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModalVisible = () => {
    setIsIncomeModalVisible(true);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const onFinish=(values,type)=>{
    // console.log("on finish",values,type)
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
      
      
     
    };
    addTransaction(newTransaction)
  }
// adding transaction
 async  function addTransaction(transaction,many){
      //Add the doc
      try{
      const docRef = await addDoc(
        collection(db,`users/${user.uid}/transactions`),
        transaction
      );
      console.log("Transaction Added",docRef)
     if(!many) toast.success("Transaction Added")
      let newArr = transactionsData;
      newArr.push(transaction)
       calculateBalance();
       fetchTransactionsData();
      
      }
      catch(e){
       console.error("Error adding document:",e)
      if(!many) toast.error("Couldn't added transaction")
      }
  }

   
  async function fetchTransactionsData(){
  //  e.preventDefault();
    setLoading(true)
  //  console.log('in1')
    console.log('user', user)
    if(user){
    //console.log('in2')
      const q = query(collection(db,`users/${user.uid}/transactions`));

      const querySnapshot = await getDocs(q);
      let transactionsArray=[]
      querySnapshot.forEach((doc) => {
        transactionsArray.push({...doc.data(), id: doc.id})
     // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    }
   
);
setTransactionData(transactionsArray);
console.log("Transaction Array",transactionsArray)
//console.log("trnsaction_ID>>>",transactionId)
//console.log("transaction id>>>",doc.uid)
toast.success("Transactions Fetched")

  }
  setLoading(false)
}

async function resetTransaction(){
try {
  const user = auth.currentUser;
  console.log("user to be reet",user)
  if(!user){
    toast.error("user doesn't exist")
    return
  }
  const userUid= user.uid;
  console.log("uid of user to be deleted",userUid)

  const userTransactionDataRef = collection(db, 'transactions');
      const q = query(userTransactionDataRef, where('userId', '==', userUid));

      // Retrieve all documents associated with the user
      const querySnapshot = await getDocs(q);
      console.log("querySnap",querySnapshot);

      querySnapshot.forEach((docSnap) => {
        const docRef = doc(db, 'transactions', docSnap.id);
       // db.collection('transactions').doc(docSnap.id).delete();
        // console.log("docsnapID>>",db.id)
        deleteDoc(docRef).then(()=>{
          console.log('Document deleted successfully');
          toast.success('deleted')
        }).catch((error)=>{
          console.error('Error deleting document:', error);
          toast.error("Error deleting document")
        })
      });

  console.log('Transaction data for the user has been deleted.');

} catch (error) {
  toast.error('Error restting Transactions')
  console.error('Error deleting data:', error);
}
}

async function updateTransaction(transactionData){
  
 // const transactionRef = collection(db, "transactions",transactionData.uid)
  if(transactionData.type==='income'){
    <AddIncomeModal
    isIncomeModalVisible={isIncomeModalVisible}
    handleIncomeCancel={handleIncomeCancel}
    onFinish={onFinish}
  />
  }
  
  // await updateDoc(transactionRef, {
    
  // });
     
}

// useEffect(()=>{
  
// async function getuserIdHandler(){

  
//   try{
   
//    const data = await getDocs(transactionRef);
//    const output= data.docs.map((doc)=>({...doc.data()})
//    )
//    console.log("TRANSA-ID>>>",output)
//    setTransactionID(output);
//   }
//   catch(err){
//    console.log(err)

//   }

  
// }
// getuserIdHandler();

// },[])

  useEffect(()=>{
    //get all doc from collection
    fetchTransactionsData()
  },[user])
  
  useEffect(()=>{
    calculateBalance()
  },[transactionsData])

  function calculateBalance(){
  //  e.preventDefault();

   let totalIncome=0;
   let totalExpense=0;
   transactionsData.forEach((transaction=>{
    if(transaction.type === 'income'){
      totalIncome += transaction.amount
    }
    else{
      totalExpense += transaction.amount;
    }
   }))

   setIncome(totalIncome);
   setExpense(totalExpense);
   setTotalBalance(totalIncome-totalExpense);

   console.log("transactions detail>>" , totalIncome,totalExpense);

  
  }

  let sortedTransaction=transactionsData.sort((a,b)=>{
    return new Date(a.date)-new Date(b.date);
  })

  return (
    <div>
      <Header />
    {loading? <p>Loading transactions...</p>:
    <div>
    <Cards
        income={income}
        expense={expense}
        totalBalance={totalBalance}
        showExpenseModal={showExpenseModal}
        showIncomeModalVisible={showIncomeModalVisible}
        resetTransaction={resetTransaction}
      />
    {/* { transactionsData.length!=0? <div className="flex-charts">
      <Charts sortedTransaction={sortedTransaction}/>
      <PieChart sortedTransaction={sortedTransaction}/>
    </div>: <NoTransactions/>} */}

    { transactionsData.length!=0? <Charts sortedTransaction={sortedTransaction}/>: <NoTransactions/>}
      <AddExpenseModal
        isExpenseModalVisible={isExpenseModalVisible}
        handleExpenseCancel={handleExpenseCancel}
        onFinish={onFinish}
      />
      <AddIncomeModal
        isIncomeModalVisible={isIncomeModalVisible}
        handleIncomeCancel={handleIncomeCancel}
        onFinish={onFinish}
      />
      </div>
    }
   
    <TransactionDetail 
    transactionData={transactionsData} 
    addTransaction={addTransaction} 
    fetchTransactionsData={fetchTransactionsData} 
    // getuserID={getuserIdHandler}/
 //  updateTransaction={updateTransaction}
   />
    </div>
  );
};

export default Dashboard;
