import React, { useState } from 'react'
import './style.css'
import Button from '../Button';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup} from 'firebase/auth';
//import { Toast } from 'react-toastify/dist/components';
import {auth} from "../../firebase";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc,getDoc } from "firebase/firestore";
import { db } from '../../firebase';
//import { ToastContainer } from 'react-toastify';

//import Input from '../Input'
const provider = new GoogleAuthProvider();

const SignupSignInComponent = () => {

  // const [name,setName]=useState();
  // const [email,setEmail]= useState();
  // const [password,setPassword]=useState();
  // const [confirmpswd,setConfpswd]=useState();
  const [values,setValues]= useState({
    name: "",
    email: "",
    password: "",
    confirmpswd: "",
  })
 const [loading , setLoading]=useState(false);
 const [isLogin,setIsLogin] = useState(false);
 const navigate =useNavigate();
  // const [errorMsg,setErrorMsg]=useState("");
  // const [successMsg,setSuccessMsg]=useState("");

  

   function signupWithEmail(e){
    e.preventDefault();
    setLoading(true)
   
  
   if(values.name!="" && values.email!="" && values.password!="" && values.confirmpswd!="" ){
    if(values.password===values.confirmpswd){

    createUserWithEmailAndPassword(auth,values.email,values.password)
   .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("user>>>>",user)
    toast.success("user created")
    setLoading(false)
    setValues({
      name: "",
      email: "",
      password: "",
      confirmpswd: "",
    
    });

  
    createDoc(user);
    navigate("/dashboard")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMesage = error.message;
    //console.log(errorMessage);
    toast.error(errorMesage);
    setLoading(false)
    // ..
  });
} else{
  toast.error("password and confirm password didn't match");
  setLoading(false)
}
   
   
  
 } else{
    toast.error("All fields are required!")
    setLoading(false)
   }
  }
   
  function signInpWithEmail(e){
    setLoading(true);
    e.preventDefault();
      if(values.email!="" && values.password!="")
      {
        signInWithEmailAndPassword(auth, values.email, values.password)
       .then((userCredential) => {
       // Signed in 
        const user = userCredential.user;
        toast.success("user Logged In")
        setLoading(false)
        createDoc(user);
        navigate("/dashboard")
    // ...
       })
       .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false)
      });
      }
      else{
        toast.error("All fields are required!")
        setLoading(false)
      }
     }

      function signUpWithGoogle(e){
      e.preventDefault();
      setLoading(true);
      try{
        signInWithPopup(auth, provider)
       .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
        const credential =  GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
    // The signed-in user info.
       const user = result.user;
       createDoc(user);
       console.log(user)
       navigate("/dashboard")
       toast.success("you are signed with google")
       setLoading(false);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false)
    // The email of the user's account used.
   // const email = error.customData.email;
    // The AuthCredential type that was used.
    //const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
      }
      catch(e){
        toast.error(e.message)
        setLoading(false)
        
      }
     
     }
 async function createDoc(user){
  setLoading(true)
  if(!user){
    return
  }

  const useRef =doc(db,"users",user.uid);
  const userData = await getDoc(useRef);

if(!userData.exists()){
  try{
  await setDoc(doc(db, "users", user.uid),{
      name: user.displayName? user.displayName: values.name,
      email: values.email,
      photoURL: user.photoURL? user.photoURL: "",
      createdAt: new Date(),
    })
    toast.success("Doc created");
    setLoading(false)
 }
 catch(e){
   toast.error(e.message)
   setLoading(false)
 }
   
} 
else{
 // toast.error("Doc already exists")
  setLoading(false)
}


  }

  return (
    <>
    {isLogin? 
    (
    <div className='signup-wrapper'>
    <h2 className='title'>
        Login to <span style={{color: "var(--theme)"}}>Financebook</span>
    </h2>
      <form className='form'>
        {/* <label htmlFor="name">Full Name</label>
        <input type="text" name="name" id="" placeholder='Enter your Name' 

         value={values.name}
       onChange={(event) => setValues((prev)=>({...prev,name: event.target.value}))}
             /> */}
        <label htmlFor="name">email</label>
        <input type="email" name="email" id=""  placeholder='Enter your Email'   value={values.email} onChange={(event) => setValues((prev)=>({...prev, email: event.target.value}))} 
        />

       <label htmlFor="password">Password</label>
        <input type="password" placeholder='password'   value={values.password} onChange={(event) => setValues((prev)=>({...prev, password: event.target.value}))} />
{/* 
       <label htmlFor="password">Confirm Password</label>
        <input type="password" placeholder='Confirm password'   value={values.confirmpswd} onChange={(event) => setValues((prev)=>({...prev, confirmpswd: event.target.value}))}
        /> */}

         {/* <p className='error-msg'>{errorMsg}</p> */}
        <Button  disabled={loading} text={loading?"Loading...": "Login using Email and Password"} onClick={signInpWithEmail}/>
        <p className='center-or'>or</p>
        <Button text={loading?"Loading...": "Login using google"} onClick={signUpWithGoogle} blue={true}/>
         <p className='p-login' onClick={(e)=>setIsLogin(!isLogin)}>or Don't Have An Account already?</p>
      </form>
      
    
    </div>
    ):(
    <div className='signup-wrapper'>
    <h2 className='title'>
        Sign Up on <span style={{color: "var(--theme)"}}>Financebook</span>
    </h2>
      <form className='form'>
        <label htmlFor="name">Full Name</label>
        <input type="text" name="name" id="" placeholder='Enter your Name' 
         value={values.name}
       onChange={(event) => setValues((prev)=>({...prev,name: event.target.value}))}
             />
        <label htmlFor="name">email</label>
        <input type="email" name="email" id=""  placeholder='Enter your Email'   value={values.email} onChange={(event) => setValues((prev)=>({...prev, email: event.target.value}))} 
        />

       <label htmlFor="password">Password</label>
        <input type="password" placeholder='password'   value={values.password} onChange={(event) => setValues((prev)=>({...prev, password: event.target.value}))} />

       <label htmlFor="password">Confirm Password</label>
        <input type="password" placeholder='Confirm password'   value={values.confirmpswd} onChange={(event) => setValues((prev)=>({...prev, confirmpswd: event.target.value}))}
        />

         {/* <p className='error-msg'>{errorMsg}</p> */}
        <Button  disabled={loading} text={loading?"Loading...": "Signup using Email and Password"} onClick={signupWithEmail}/>
        <p className='center-or'>or</p>
        <Button text={loading?"Loading...": "Signup using google"} onClick={signUpWithGoogle} blue={true}/>
        <p className='p-login' onClick={(e)=>setIsLogin(!isLogin)}>Or Have An Account already? click here</p>
      
      </form>
      
    
    </div>)
    }
   
    </>
  )
}

export default SignupSignInComponent
