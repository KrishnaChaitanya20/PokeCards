import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
// import {Link} from 'react-router-dom';
import '../styles/PCNavBar.css';
import { Link } from 'react-router-dom';

  
const PCNavBar = () => {
  return (
    <Navbar className='bg-pokered'  expand="lg">
      <Navbar.Brand className='mx-2'  href="/">PokeCards</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className='mx-2' href="/">Home</Nav.Link>
          <Nav.Link className='mx-2' href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PCNavBar;
