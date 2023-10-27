import React from 'react'
import Header from '../components/Header';
import SignupSignInComponent from '../components/SignupSignin'

const SignUp = () => {
  return (
    <div>
      <Header/>
      <div className='wrapper'>
         <SignupSignInComponent/>
      </div>
    </div>
  )
}

export default SignUp
