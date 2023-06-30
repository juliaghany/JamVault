// not yet finished 
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import '../index.css'

import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations'

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [login] = useMutation(LOGIN_USER)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefaut();
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
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="max-w-md mx-auto">
                {showAlert && (
                    <div className="bg-red-500 text-white px-4 py-2 mb-4 rounded">
                        Something went wrong with your login credentials!
                    </div>
                )}

                <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={userFormData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <Form.Control.Feedback type="invalid">Email is required!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={userFormData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <Form.Control.Feedback type="invalid">Password is required!</Form.Control.Feedback>
                </Form.Group>

                <Button
                    disabled={!(userFormData.email && userFormData.password)}
                    type="submit"
                    variant="success"
                >
                    Login
                </Button>
            </Form>
        </>
    );
}

export default LoginForm;