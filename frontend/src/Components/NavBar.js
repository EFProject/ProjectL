import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../Store/appContext';
import '../css/navbar.css'

function NavBar() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  function handleLogout() {
    actions.logout();
    navigate('/login');
  }

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className={`home-link ${window.location.pathname === '/' ? 'selected-home' : ''}`}>
          <img
            src='/favicon.ico'
            alt="Logo"
            className="navbar-logo"
          />
          OneSport
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="hamburger-menu" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!store.token ? (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className={`active-link ${window.location.pathname === '/login' ? 'selected' : ''}`}
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/signup"
                  className={`active-link ${window.location.pathname === '/signup' ? 'selected' : ''}`}
                >
                  Signup
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="active-link">
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;