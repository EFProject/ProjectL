import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const url = 'http://localhost:5000/users/login';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: value });

    if (type === 'checkbox') {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Reset any previous errors
    setErrors({});
  
    try {
      // Send the form data to the server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        const accessToken = responseData.access_token;
        sessionStorage.setItem("token", accessToken);
      } else {
        // Handle error
        console.error('Failed to fetch data from the server');
      }

  
      // If the response is successful, display a success alert
      window.alert('Welcome back Strunz!');
      navigate('/');
  
      // Reset the form fields
      setFormData({
        email: '',
        password: '',
        remember: false,
      });
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Login error:', error.message);
  
      // Set error messages based on the specific error received
      setErrors({
        serverError: error.message,
      });
  
      // Display an error alert
      window.alert('Login failed. Please try again later.');
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

      <Form.Group controlId="remember">
        <Form.Check
          type="checkbox"
          name="remember"
          label="Remember Me"
          checked={formData.remember}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  );
}

export default LoginForm;
