import React from 'react'
import { useEffect } from 'react';
import "./style.css";
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import userImg from '../../assets/user.svg'
const Header = () => {


  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
 // const auth = getAuth();

  useEffect(()=>{
    if(user){
     navigate("/dashboard")
    }
  },[user,loading])

    function logoutHandler(){
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged out")
        navigate("/")
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });
      
    }
  return (
    <div className='navbar'>
      <p className='logo'>Financebook</p>
      {
      user && (
        <div style={{display: "flex",alignItems: "center",gap: "0.5rem"}}>
        <img src={user.photoURL? user.photoURL: userImg} alt="" className='user-image'/>
        <p  className='logo link' onClick={logoutHandler}>Logout</p>
        </div>
      )
      
      }
    </div>
  )
}

export default Header;
