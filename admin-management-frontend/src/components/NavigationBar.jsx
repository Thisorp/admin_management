// src/components/NavigationBar.jsx

import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"; // Đã thêm Nav vào import
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NavigationBar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
  
    const handleLogout = async () => {
      try {
        await axios.post('/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } catch (err) {
        console.log('Logout failed');
      }
      localStorage.removeItem('token');
      navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">Admin Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {token && (
                  <>
                    <Nav.Link as={Link} to="/users">Users</Nav.Link>
                    <Nav.Link as={Link} to="/add-user">Add User</Nav.Link>
                    <Nav.Link as={Link} to="/change-password">Change Password</Nav.Link>
                    <Nav.Link as={Link} to="/status">Status</Nav.Link> {/* Thêm dòng này */}
                  </>
                )}
              </Nav>
              <Nav>
                {!token ? (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </>
                ) : (
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavigationBar;
