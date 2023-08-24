import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import {
	BrowserRouter as Router,
	Routes,
	Route,
  } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';

function App() {

	return (
		<div>
			<Router>
				<div>
					<Routes>
						<Route path="/" element={<Home/>} />
						<Route path="/Login" element={<Login/>} />
						<Route path="/Signup" element={<Signup/>} />
					</Routes>
				</div>
			</Router>
		</div>
		
	)

}

export default App