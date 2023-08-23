import React from 'react';
import NavBar from '../Components/NavBar';
import LoginForm from '../Components/LoginForm';


function Login() {
  return (
    <div>
      <NavBar></NavBar>
      <h2>Log In</h2>
      <LoginForm />
    </div>
  );
}

export default Login;
