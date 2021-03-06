// BRING IN REACT, USESTATE, LINK MODULES
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// BRING IN REACT-BOOTSTRAP FOR APP RENDERING AND STYLING
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// BRING IN LOGIN AND SIGNUP COMPONENTS FOR RENDERING MODALE
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
// BRING IN USEQUERY TO GET USER'S INFO IN DATABASE
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

// FOR STATIC PUBLIC DIRECTORY HREFS
const {PUBLIC_URL} = process.env

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // QUERY TO GET USER'S INFO IN DATABASE
  const { loading, data } = useQuery(QUERY_ME);
  // SET USER'S DATA TO VARIABLE, IF FOUND
  const userData = data?.me || {};

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // NAVBAR COMPONENT TO RENDER
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <img src={`${PUBLIC_URL}/favicon-nobg.png`} id="site-logo"></img>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See {userData.username}'s Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
