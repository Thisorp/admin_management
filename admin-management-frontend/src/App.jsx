// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';
import ChangePassword from './pages/ChangePassword';
import Status from './pages/Status'; // Nếu bạn đã tạo trang Status

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={
            <PrivateRoute>
              <Status />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          } />
          <Route path="/add-user" element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          } />
          <Route path="/change-password" element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
