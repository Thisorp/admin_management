// src/pages/Register.jsx

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Register button clicked');
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      console.log('Sending POST request to /api/auth/register');
      const response = await axios.post('/api/auth/register', {
        username,
        password
      });
      console.log('Response received:', response.data);

      setSuccess('User registered successfully');
      setError('');
      setUsername('');
      setPassword('');
      navigate('/login');
    } catch (err) {
      console.error('Error during registration:', err);
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error('Error response data:', err.response.data);
        setError(err.response.data.message || 'Registration failed');
      } else if (err.request) {
        // No response received from server
        console.error('No response received:', err.request);
        setError('No response from server. Please try again later.');
      } else {
        // Error setting up the request
        console.error('Error setting up request:', err.message);
        setError('Error setting up request.');
      }
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
