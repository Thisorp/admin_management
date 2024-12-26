// src/pages/AddUser.jsx

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post('/api/users', {
        username,
        password
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('User added successfully');
      setError('');
      setUsername('');
      setPassword('');
      navigate('/users');
    } catch(err){
      setError(err.response.data);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Add User</h2>
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
          Add User
        </Button>
      </Form>
    </div>
  );
}

export default AddUser;
