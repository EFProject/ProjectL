import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Store/appContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import MyModal from './MyModal';

function ProfileSettings() {
  const [buttonState, setButtonState] = useState(true)
  const [isModifyButton, setIsModifyButton] = useState(true)
  const [showConfermButton, setShowConfermButton] = useState(true)
  const [deleteMyNewsTickets, setDeleteMyNewsTickets] = useState(false)
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
    setDeleteMyNewsTickets(!deleteMyNewsTickets)
  })

  const handleModal = ((type) => {
    if (type === 0) {
      setTypeChange('Would you like to confirm profile changes?')
      setIsModifyButton(true)
      setShowConfermButton(true)
    } else {
      setTypeChange('Do you confirm that you want to delete the profile?')
      setIsModifyButton(false)
      setShowConfermButton(true)
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
      !deleteMyNewsTickets
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
        actions.logout();
        navigate('/login');
      } else if (response.status === 404) {
        setIsModifyButton(false);
        setShowConfermButton(false)
        setFormData({
          ...formData,
          email: '',
          name: '',
          password: '',
          oldPassword: '',
        });
        setButtonState(true);
        response.json().then((data) => {
          setTypeChange(data.message);
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
        setIsModifyButton(false);
        setShowConfermButton(false)
        setFormData({
          ...formData,
          email: '',
          name: '',
          password: '',
          oldPassword: '',
        });
        setButtonState(true);
        response.json().then((data) => {
          setTypeChange(data.message)
        });
      }
      return response.json()
    }) 
    .then((data) => {
      if(!deleteMyNewsTickets){
        setTypeChange(data.message)
        setShowConfermButton(false)
        window.location.reload();
      } else {
        const deleteNewsApiUrl = 'http://localhost:5000/news/' + sessionStorage.getItem('user_id') + '/all';
        const resultNews = fetch(deleteNewsApiUrl, { method: 'DELETE'})
        .then(response => {
          if (response.status === 404){
            setIsModifyButton(false);
            setShowConfermButton(false)
            setFormData({
              ...formData,
              email: '',
              name: '',
              password: '',
              oldPassword: '',
            });
            setButtonState(true);
          }
          return data
        })
        .then((data) => {
          const deleteTicketsApiUrl = 'http://localhost:5002/tickets/' + sessionStorage.getItem('user_id') + '/all';
          const resultTickets = fetch(deleteTicketsApiUrl, { method: 'DELETE'})
          .then(response => {
            if (response.status === 404){
              setIsModifyButton(false);
              setShowConfermButton(false)
              setFormData({
                ...formData,
                email: '',
                name: '',
                password: '',
                oldPassword: '',
              });
              setButtonState(true);
            }
            response.json().then(() => {
              setTypeChange(data.message)
              setShowConfermButton(false)
              window.location.reload();
            });
          })
        })
      }
    })
    .catch(err => {
      console.error('Request failed', err)
    })
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="NomeUtente">
          <Form.Label>User Name</Form.Label>
          <Form.Control value={formData.name} name="name" onChange={handleChange} className="w-80" type="text" placeholder="New Nome" isInvalid={!!errors.name}></Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control value={formData.email} name="email" onChange={handleChange} type="email" placeholder="New Email" isInvalid={!!errors.email} /> 
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="NuovaPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control value={formData.password} name="password" onChange={handleChange} type="password" placeholder="New Password" isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="News">
          <Form.Check onChange={handleSwitch} value={deleteMyNewsTickets} type="switch" id="switchNews" label="Delete My News and My Tickets"/>
        </Form.Group>

        <hr className="hr-card"></hr>
        <Form.Group className="mb-3 mt-3" controlId="ConfermaPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control value={formData.oldPassword} name="oldPassword" onChange={handleChange} type="password" placeholder="Current Password" onInput={handleButton}></Form.Control>
          <Form.Text className="text-danger">
            To confirm changes, enter the current password.
          </Form.Text>
        </Form.Group>

        <Container>
          <Row>
            <Col>
              <Button className='form-button-profile' disabled={buttonState} onClick={() => handleModal(0)}>
                Confirm
              </Button>
            </Col>
            <Col></Col>
            <Col>
              <Button className='form-button' disabled={buttonState} onClick={() => handleModal(1)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>

        {smShow ? ((isModifyButton && showConfermButton)||(!isModifyButton && showConfermButton)) ? 
        <MyModal setShowModal={setSmShow} text={typeChange} title={"Edit Profile"} showConfirmButton={true} confirmFunction={handleSubmit}></MyModal>
        : <MyModal setShowModal={setSmShow} text={typeChange} title={"Edit Profile"} confirmFunction={handleSubmit}></MyModal> : <></>}
  
      </div>
  );
}

export default ProfileSettings;
