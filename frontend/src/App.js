import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Link } from 'react-router-dom';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import NavBar from './Components/NavBar';
import Profile from './Pages/Profile';
import Tickets from './Pages/Tickets';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import injectContext, { Context } from './Store/appContext';

function App() {

	const { store } = useContext(Context);

	function NotFound() {
		return (
			<Container className="d-flex flex-column justify-content-center align-items-center" id="not-found-container">
				<h1>Page Not Found</h1>
				<div className="mt-4">
					<Link to="/">
						<Button className='form-button'>
							Go home
						</Button>
					</Link>
				</div>
			</Container>
		);
	}

	function Logged() {
		return (
			<Container className="d-flex flex-column justify-content-center align-items-center" >
				<h1>You are already logged!</h1>
				<div className="mt-4">
					<Link to="/">
						<Button className='form-button'>
							Go home
						</Button>
					</Link>
				</div>
			</Container>
		);
	}

	return (
		<div>
			<Router>
				<NavBar />
				<Container className="d-flex justify-content-center align-items-center app-container" style={{ minHeight: '90vh' }}>
					<Routes>
						<Route path="/" element={store.token ? <Home /> : <Login />} />
						<Route path="/profile" element={store.token ? <Profile /> : <Login />} />
						<Route path="/tickets" element={store.token ? <Tickets /> : <Login />} />
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