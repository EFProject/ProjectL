import React from 'react';
import NavBar from '../Components/NavBar';
import SignupForm from '../Components/SignupForm';


function Signup() {
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <h2>Sign Up</h2>
        <SignupForm />
    </div>
    </div>
  );
}

export default Signup;
