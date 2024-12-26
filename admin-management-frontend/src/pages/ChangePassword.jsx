// src/pages/ChangePassword.jsx

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.put('/api/users/change-password', {
        oldPassword,
        newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setSuccess('Password changed successfully');
      setError('');
      setOldPassword('');
      setNewPassword('');
      navigate('/');
    } catch(err){
      setError(err.response.data);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="oldPassword" className="mb-3">
          <Form.Label>Old Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter old password" 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required />
        </Form.Group>

        <Form.Group controlId="newPassword" className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter new password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Change Password
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassword;
