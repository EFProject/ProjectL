import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function ProfileSettings() {
  const [buttonState, setButtonState] = useState(true)
  const [smShow, setSmShow] = useState(false);
  const [typeChange, setTypeChange] = useState(null);

  const handleButton = ((event)=> {
    if (event.target.value.length > 0) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  })

  const handleModal = ((type) => {
    if (type === 0) {
      setTypeChange('Desideri confermare le modifiche al profilo?')
    } else {
      setTypeChange('Confermi di voler cancellare il profilo?')
    }
    setSmShow(true)
  })

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="NomeUtente">
          <Form.Label>Nome utente</Form.Label>
          <Form.Control className="w-80" type="text" placeholder="Nuovo Nome"></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Nuova Email" /> 
        </Form.Group>

        <Form.Group className="mb-3" controlId="NuovaPassword">
          <Form.Label>Nuova Password</Form.Label>
          <Form.Control type="password" placeholder="Nuova Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="News">
          <Form.Check type="switch" id="switchNews" label="Elimina My News"/>
        </Form.Group>

        <hr className="hr-card"></hr>
        <Form.Group className="mb-3 mt-3" controlId="ConfermaPassword">
          <Form.Label>Password corrente</Form.Label>
          <Form.Control type="password" placeholder="Password corrente" onChange={handleButton}></Form.Control>
          <Form.Text className="text-danger">
            Per confermare le modifiche, inserisci la password corrente.
          </Form.Text>
        </Form.Group>

        <Container>
          <Row>
            <Col>
              <Button className='form-button-profile' disabled={buttonState} onClick={() => handleModal(0)}>
                Conferma
              </Button>
            </Col>
            <Col></Col>
            <Col>
              <Button className='form-button' disabled={buttonState} onClick={() => handleModal(1)}>
                Elimina
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>

      <Modal centered show={smShow} onHide={() => setSmShow(false)} >
        <Modal.Header id='ModalHeader' className='footerProfile' closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Modifica Profilo</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalProfile text-center'>{typeChange}</Modal.Body>
        <Modal.Footer className='modalProfile footerProfile'>
          <Button className='form-button-profile'>Conferma</Button>
          <Button className='form-button' onClick={() => setSmShow(false)}>Cancella</Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
}

export default ProfileSettings;
