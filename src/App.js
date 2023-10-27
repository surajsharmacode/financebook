
import './App.css';
//import Header from './components/Header';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";


//import SignupSignIn from './components/SignupSignin';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
// import { ToastContainer } from 'react-toastify';
import { ToastContainer,toast } from 'react-toastify';




function App() {
  return (
 
   
   <>
   <ToastContainer/>
     <Router>
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
   </Router>
   </>
  
  
  );
}

export default App;
