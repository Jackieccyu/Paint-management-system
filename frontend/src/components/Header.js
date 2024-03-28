import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [selectedUser, setSelectedUser] = useState("Staff Portal"); // Step 1: add status

  const brandStyle = {
    marginLeft: '1rem',
    color: '#ffffff'
  };

  const navDropdownStyle = {
    marginRight: 'auto',
    marginLeft: '1rem',
    color: '#ffffff'
  };

  const navbarStyle = {
    backgroundColor: '#343a40'
  };

  return (
    <Navbar style={navbarStyle} expand="lg" variant="dark">
      <Navbar.Brand as={NavLink} to="/" style={brandStyle}>
        A Paint Company Stock Status
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title={selectedUser} id="basic-nav-dropdown" style={navDropdownStyle}>
            <NavDropdown.Item as={NavLink} to="/user/john" onClick={() => setSelectedUser("John")}>John</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/user/jane" onClick={() => setSelectedUser("Jane")}>Jane</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/user/painter" onClick={() => setSelectedUser("Painter")}>Painter</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/user/adam" onClick={() => setSelectedUser("Adam")}>Adam</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;