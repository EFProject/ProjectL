import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const url = 'http://localhost:5000/users/signup';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset any previous errors
    setErrors({});
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle HTTP errors (e.g., 400 Bad Request, 500 Internal Server Error)
        // You can parse the response and set appropriate error messages
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }
  
      // If the response is successful, display a success alert
      window.alert('Signup successful!');

      navigate('/login');
  
      // Reset the form fields
      setFormData({
        email: '',
        name: '',
        password: '',
      });
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Signup error:', error.message);
  
      // Set error messages based on the specific error received
      setErrors({
        serverError: error.message,
      });
  
      // Display an error alert
      window.alert('Something went wrong. Please try again later.');
    }
  };
  
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          isInvalid={!!errors.email} // Add Bootstrap 'is-invalid' class if there's an error
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter name"
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
}

export default SignupForm;
