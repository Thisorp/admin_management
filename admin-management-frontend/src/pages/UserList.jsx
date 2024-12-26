// src/pages/UserList.jsx

import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const response = await axios.get('/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUsers(response.data);
      } catch(err){
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    try{
      await axios.delete(`/api/users/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch(err){
      setError('Failed to delete user');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Status</th>
            <th>Time Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.status}</td>
              <td>{new Date(user.timeReg).toLocaleString()}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;
