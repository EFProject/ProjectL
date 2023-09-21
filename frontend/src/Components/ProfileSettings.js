import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Store/appContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function ProfileSettings() {
  const [buttonState, setButtonState] = useState(true)
  const [isModifyButton, setIsModifyButton] = useState(true)
  const [deleteMyNews, setDeleteMyNews] = useState(false)
  const [smShow, setSmShow] = useState(false);
  const [typeChange, setTypeChange] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    oldPassword: '',
  });
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const handleButton = ((event)=> {
    if (event.target.value.length > 0) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  })

  const handleSwitch = (()=> {
    setDeleteMyNews(!deleteMyNews)
  })

  const handleModal = ((type) => {
    if (type === 0) {
      setTypeChange('Desideri confermare le modifiche al profilo?')
      setIsModifyButton(true)
    } else {
      setTypeChange('Confermi di voler cancellare il profilo?')
      setIsModifyButton(false)
    }
    setSmShow(true)
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const isFormValid = () => {
    // Check if all fields are provided
    if (
      formData.email.trim() === '' &&
      formData.name.trim() === '' &&
      formData.password.trim() === '' &&
      !deleteMyNews
    ) {
      setErrors({
        email: !formData.email ? 'You must fill at least one field' : '',
        name: !formData.name ? 'You must fill at least one field' : '',
        password: !formData.password ? 'You must fill at least one field' : '',
      });
      return false;
    } 

    if(formData.email.trim() !== '' && !isValidEmail(formData.email)) {
      setErrors({
        ...errors,
        email: 'Insert a correct email',
      });
      return false;
    }
    
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (formData.password.trim() !== '' && !passwordRegex.test(formData.password)) {
      setErrors({
        ...errors,
        password:
          'Insert a strong password',
      });
      return false;
    }

    setErrors({});
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isModifyButton){

      const url = 'http://localhost:5001/users/' + sessionStorage.getItem('user_id');
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        response.json().then((data) => {
          window.alert(data.message); 
        });
        actions.logout();
        navigate('/login');
      } else if (response.status === 404) {
        setSmShow(false);
        response.json().then((data) => {
          window.alert(data.message); 
        });
        return;
      }
    }

    if (!isFormValid()) {
      setSmShow(false);
      return;
    }


    const url = 'http://localhost:5001/users/' + sessionStorage.getItem('user_id') + '/edit';
    const result = fetch(url, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(formData) })
    .then(response => {
      if (response.status === 404){
        // Reset the form fields
        setSmShow(false);
        setIsModifyButton(false);
        setFormData({
          ...formData,
          email: '',
          name: '',
          password: '',
          oldPassword: '',
        });
        response.json().then((data) => {
          window.alert(data.message); // Assuming the error message is in the 'message' field
          throw new Error(data.message);
        });
      }
      return response.json()
    }) 
    .then((data) => {
      console.log("prova")
      if(!deleteMyNews){
        setSmShow(false);
        window.location.reload();
        window.alert(data.message);
      } else {
        console.log("Entro")
        const deleteNewsApiUrl = 'http://localhost:5000/news/' + sessionStorage.getItem('user_id') + '/all';
        const resultNews = fetch(deleteNewsApiUrl, { method: 'DELETE'})
        .then(response => {
          if (response.status === 404){
            setSmShow(false);
            setIsModifyButton(false);
            setFormData({
              ...formData,
              email: '',
              name: '',
              password: '',
              oldPassword: '',
            });
          }
          console.log("QUI")
          response.json().then(() => {
            setSmShow(false);
            window.location.reload();
            window.alert(data.message);
          });
        })
      }
    })
    .catch(err => {
      console.error('Request failed', err)
    })




    // try {
    //   const url = 'http://localhost:5001/users/' + sessionStorage.getItem('user_id') + '/edit';
    //   const response = await fetch(url, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.status === 200) {
    //     response.json().then((data) => {
    //       window.alert(data.message); 
    //     });
    //     setSmShow(false);
    //     window.location.reload();
    //   } else if (response.status === 404) {
    //     response.json().then((data) => {
    //       window.alert(data.message); // Assuming the error message is in the 'message' field
    //     });
    //     // Reset the form fields
    //     setSmShow(false);
    //     setFormData({
    //       ...formData,
    //       email: '',
    //       name: '',
    //       password: '',
    //       oldPassword: '',
    //     });
    //   }
    // } catch (error) {
    //   // Handle errors (e.g., network issues, server errors)
    //   console.error('Profile update error:', error.message);

    //   // Set error messages based on the specific error received
    //   setErrors({
    //     serverError: error.message,
    //   });

    //   // Display an error alert
    //   window.alert('Something went wrong. Please try again.');
    // }

  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NomeUtente">
          <Form.Label>Nome utente</Form.Label>
          <Form.Control value={formData.name} name="name" onChange={handleChange} className="w-80" type="text" placeholder="Nuovo Nome" isInvalid={!!errors.name}></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={formData.email} name="email" onChange={handleChange} type="email" placeholder="Nuova Email" isInvalid={!!errors.email} /> 
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="NuovaPassword">
          <Form.Label>Nuova Password</Form.Label>
          <Form.Control value={formData.password} name="password" onChange={handleChange} type="password" placeholder="Nuova Password" isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="News">
          <Form.Check onChange={handleSwitch} value={deleteMyNews} type="switch" id="switchNews" label="Elimina My News"/>
        </Form.Group>

        <hr className="hr-card"></hr>
        <Form.Group className="mb-3 mt-3" controlId="ConfermaPassword">
          <Form.Label>Password corrente</Form.Label>
          <Form.Control value={formData.oldPassword} name="oldPassword" onChange={handleChange} type="password" placeholder="Password corrente" onInput={handleButton}></Form.Control>
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
        <Form onSubmit={handleSubmit}>
          <Modal.Header id='ModalHeader' className='footerProfile' closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Modifica Profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalProfile text-center'>{typeChange}</Modal.Body>
          <Modal.Footer className='modalProfile footerProfile'>
          {isModifyButton ? (
            <Button name='Modifica' type='submit' className='form-button-profile'>Conferma</Button>
          ) : (
            <Button name='Elimina' type='submit' className='form-button-profile'>Conferma</Button>
          )}
            <Button className='form-button' onClick={() => setSmShow(false)}>Cancella</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>

  );
}

export default ProfileSettings;
