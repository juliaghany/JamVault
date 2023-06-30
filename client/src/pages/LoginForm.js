import React, { useState } from 'react';
import '../index.css'

import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [login] = useMutation()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidty() === false) {
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
            <form noValidate validated={validated} onSubmit={handleFormSubmit} className='max-w-md mx-auto'>
                {showAlert && (
                    <div className='bg-red-500 text-white px-4 py-2 mb-4 rounded'>
                        Something went wrong with your login credentials!
                    </div>
                )}
                <div className='mb-4'>
                    <label className='block mb-1' htmlFor='email'>
                        Email Address
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={userFormData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-2 border rounded'
                    />
                    <div className='mb-4'>
                        {/* Show error message here */}
                    </div>
                </div>

                <div className='mb-4'>
                    <label className='block mb-1' htmlFor='password'>
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={userFormData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <div className='text-red-500 mt-1'>
                        {/* Show error message if password is invalid */}
                    </div>
                </div>

                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Login
                </button>
            </form>
        </>
    );
}

export default LoginForm;