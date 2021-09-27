// BRING IN REACT, USESTATE, AND REACT-BOOTSTRAP MODULES
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
// BRING IN MUTATINOS FOR LOGGING IN A USER
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
// BRING IN AUTHENTICATION SERVICES FUNCTIONS
import Auth from '../utils/auth';

const LoginForm = () => {
  // SET STATE FOR USER'S FORM DATA
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // SET STATE FOR FORM VALIDATION
  const [validated] = useState(false);
  // SET STATE FOR SHOWING ALERTS
  const [showAlert, setShowAlert] = useState(false);
  // USE MUTATION HOOK FOR LOGGING IN A USER AND GIVE THEM A TOKEN
  const [login, { error }] = useMutation(LOGIN_USER);
  // UPON FORM INPUT CHANGES, SET STATE FOR FORM DATA WITH INPUTS
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // USE LOGIN MUTATION TO LOG IN A USER WITH THE FORM INPUTS
      const { data } = await login({
        variables: {...userFormData},
      })
      // SET USER'S TOKEN TO LOCAL STORAGE
      Auth.login(data.login.token);
    
    } catch (error) {
      console.error(error);
      setShowAlert(true);
    }
    // RESET FORM TO EMPTY FORM
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  // LOGIN FORM COMPONENT
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </>
  );
};

export default LoginForm;
