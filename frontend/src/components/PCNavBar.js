import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import '../styles/PCNavBar.css';

  
const PCNavBar = () => {
  return (
    <Navbar className='bg-pokered'  expand="lg">
      <Navbar.Brand className='mx-2'  href="#home">PokeCards</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className='mx-2' href="#home">Home</Nav.Link>
          <Nav.Link className='mx-2' href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PCNavBar;
