import React from 'react';
import NavBar from '../Components/NavBar';
import LoginForm from '../Components/LoginForm';


function Login() {
  const token = sessionStorage.getItem("token")

  return (
    <div>
      <NavBar></NavBar>
      <h2>Log In</h2>
      {(token && token!=="" && token!=="undefined" && token!==undefined ? "You are logged in with token" + token :  <LoginForm />)}
    </div>
  );
}

export default Login;
