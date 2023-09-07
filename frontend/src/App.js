import React, { useContext } from 'react'
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
import NavBar from './Components/NavBar';
import { Container } from 'react-bootstrap';
import injectContext, { Context } from './Store/appContext';

function App() {

	const { store } = useContext(Context);

	function NotFound() {
		return <div>Page Not Found</div>;
	}

	function Logged() {
		return <div>You are already logged Strunz!</div>;
	}

	return (
		<div>
			<Router>
				<NavBar />
				<Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
					<Routes>
						<Route path="/" element={store.token ? <Home /> : <Login />} />
						{!store.token ?
							<>
								<Route path="/Login" element={<Login />} />
								<Route path="/Signup" element={<Signup />} />
							</>
							:
							<>
								<Route path="/Login" element={<Logged />} />
								<Route path="/Signup" element={<Logged />} />
							</>
						}
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</Router>
		</div>

	)

}

export default injectContext(App);