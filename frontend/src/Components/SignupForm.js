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
    repeatPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const url = 'http://localhost:5001/users/signup';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error message for the field being changed
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const isFormValid = () => {
    // Check if all fields are provided
    if (
      formData.email.trim() === '' ||
      formData.name.trim() === '' ||
      formData.password.trim() === '' ||
      formData.repeatPassword.trim() === ''
    ) {
      setErrors({
        email: !formData.email ? 'Email is required' : '',
        name: !formData.name ? 'Name is required' : '',
        password: !formData.password ? 'Password is required' : '',
        repeatPassword: !formData.repeatPassword ? 'Repeat Password is required' : '',
      });
      return false;
    }

    // Check if password and repeatPassword match
    if (formData.password !== formData.repeatPassword) {
      setErrors({
        ...errors,
        repeatPassword: 'Not match with password',
      });
      return false;
    }

    // Check password complexity
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrors({
        ...errors,
        password:
          'Password must be at least 8 and maximum 30 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      });
      return false;
    }

    // Reset any previous errors
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        // If the response is successful, display a success alert
        window.alert('Signup successful!');

        navigate('/login');

        // Reset the form fields
        setFormData({
          email: '',
          name: '',
          password: '',
          repeatPassword: '',
        });
      } else if (response.status === 400) {
        window.alert('Email already used, use another one!');
        // Reset the form fields
        setFormData({
          ...formData,
          email: '',
          password: '',
          repeatPassword: '',
        });
      }
    } catch (error) {
      // Handle errors (e.g., network issues, server errors)
      console.error('Signup error:', error.message);

      // Set error messages based on the specific error received
      setErrors({
        serverError: error.message,
      });

      // Display an error alert
      window.alert('Something went wrong. Please try again.');
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
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="mt-2">
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
      </div>

      <div className="mt-2">
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              isInvalid={!!errors.password}
            />
            <Button
              className={showPassword ? 'form-button' : 'outline-form-button'}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </div>
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </Form.Group>
      </div>

      <div className="mt-2">
        <Form.Group controlId="repeatPassword">
          <Form.Label>Repeat Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat Password"
              isInvalid={!!errors.repeatPassword}
            />
            <Button
              className={showPassword ? 'form-button' : 'outline-form-button'}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </div>
          {errors.repeatPassword && (
            <div className="text-danger">{errors.repeatPassword}</div>
          )}
        </Form.Group>
      </div>

      <div className="mt-3">
        <Button className='form-button' type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
}

export default SignupForm;
