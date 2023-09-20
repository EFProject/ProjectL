import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ProfileSettings() {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [buttonState, setButtonState] = useState(true)



	useEffect(() => {
		setUserEmail(sessionStorage.getItem('email'));
		setUserName(sessionStorage.getItem('name'));
	}, []);

  const handleButton = ((event)=> {
    if (event.target.value.length > 0) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  })

  return (
    <Form>
      <Form.Group className="mb-3" controlId="NomeUtente">
        <Form.Label>Nome utente</Form.Label>
        <Form.Control className="w-80" type="text" placeholder={userName}></Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder={userEmail} /> 
      </Form.Group>

      <Form.Group className="mb-3" controlId="NuovaPassword">
        <Form.Label>Nuova Password</Form.Label>
        <Form.Control type="password" placeholder="Nuova Password" />
      </Form.Group>

      
      <Form.Group className="mb-3" controlId="ConfermaPassword">
        <Form.Label>Password corrente</Form.Label>
        <Form.Control type="password" placeholder="Password corrente" onChange={handleButton}></Form.Control>
        <Form.Text className="text-danger">
          Per confermare le modifiche, inserisci la password corrente.
        </Form.Text>
      </Form.Group>

      <Container>
        <Row>
          <Col>
            <Button className='form-button-profile' type="submit" disabled={buttonState}>
              Conferma
            </Button>
          </Col>
          <Col></Col>
          <Col>
            <Button className='form-button' type="submit" disabled={buttonState}>
              Elimina
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default ProfileSettings;
