import React from 'react';
import './styles.css';
import logoImage from './static/Main Logo@2x.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import './recruitment.css';

function NavBar() {
  return (
    <div id="nav">
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="https://monash-data-science-and-ai-platform.github.io/muei-data-repository/#/">
          <img
            alt="logo"
            src={logoImage}
            style={{verticalAlign: 'middle', height:'5em', paddingTop: '.5em'}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#/datasets">Datasets</Nav.Link>
            <Nav.Link href="#/projects">Projects</Nav.Link>
            <Nav.Link href="#/requestdata">Request new data collection</Nav.Link>
            <Nav.Link href="#/aboutus">About Us</Nav.Link>
            <Nav.Link href="#/contribute">Contribute a Dataset</Nav.Link>
            <Nav.Link href="#/faq">FAQ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
