// // not yet finished 
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';


const styles = {
    background: {
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '4px',
    },
    text: {
        color: 'white',
    },
}


const LoginForm = ({ handlePageChange }) => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [login] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });

            Auth.login(data.login.token);
        } catch (err) {
            console.log(err);
            setShowAlert(true);
        }

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });
        setValidated(true);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ marginTop: '50px' }}>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} style={styles.background}>
                {showAlert && <Alert variant="danger">Something went wrong with your login credentials!</Alert>}

                <h2 className="text-center mb-4">Login</h2>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userFormData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={userFormData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                </Form.Group>

                <div className="text-center">
                    <Button
                        disabled={!(userFormData.email && userFormData.password)}
                        type="submit"
                        variant="dark"
                        style={{ marginTop: '10px'}}
                    >
                        Login
                    </Button>
                    <p className='mt-3'>
                        Don't have an account?
                        <button
                            className='btn btn-link'
                            onClick={() => handlePageChange('Signup')}
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;