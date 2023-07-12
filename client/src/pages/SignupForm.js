import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

const styles = {
  background: {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    borderRadius: '4px',
  }
}

const Signup = ({ handlePageChange }) => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
console.log("hello")
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '50px'}}>
      <Form onSubmit={(event)=> { handleSubmit(event) }} style={styles.background}>
        {data ? (
          <p>
            Success! You may now head{' '}
            <a href="/">back to the homepage.</a>
          </p>
        ) : (
          <>
              {error && <Alert variant="danger">Username or email address already in use. Please try again.</Alert>}
            <h2 className="text-center mb-4">Sign Up</h2>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formState.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button
                disabled={!(formState.username && formState.email && formState.password)}
                type="submit"
                  variant="dark"
                  style={{ marginTop: '10px' }}
              >
                Submit
              </Button>
              <p className="mt-3">
                Already have an account?{' '}
                <button
                  className="btn btn-link"
                  onClick={() => handlePageChange('Login')}
                >
                  Log In
                </button>
              </p>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};

export default Signup;
