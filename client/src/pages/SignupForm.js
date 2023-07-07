// // SignupForm.js
// import React, { useState } from "react";
// import { Link } from 'react-router-dom'

// import { useMutation } from '@apollo/client'
// import { ADD_USER } from '../utils/mutations'

// import Auth from '../utils/auth'

// const Signup = () => {
//     const [formState, setFormState] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const [addUser, { error, data }] = useMutation(ADD_USER);

//     const handleChange = (event) => {
//         const { name, value } = event.target;

//         setFormState({
//             ...formState,
//             [name]: value
//         })
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault()
//         console.log(formState)

//         try {
//             const { data } = await addUser({
//                 variables: {...formState },
//             })

//             Auth.login(data.addUser.token);
//         } catch(err) {
//             console.log(err)
//         }
//     };
//     return (
//         <main className="flex-row justify-center mb-4">
//             <div className="col-12 col-lg-10">
//                 <div className="card">
//                     <h4 className="card-header bg-dark text-light p2">Sign up!</h4>
//                     <div className="card-body">
//             {data ? (
//               <p>
//                 Success! You may now head{' '}
//                 <Link to="/">back to the homepage.</Link>
//               </p>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <input
//                   className="form-input"
//                   placeholder="Your username"
//                   name="username"
//                   type="text"
//                   value={formState.username}
//                   onChange={handleChange}
//                 />
//                 <input
//                   className="form-input"
//                   placeholder="Your email"
//                   name="email"
//                   type="email"
//                   value={formState.email}
//                   onChange={handleChange}
//                 />
//                 <input
//                   className="form-input"
//                   placeholder="******"
//                   name="password"
//                   type="password"
//                   value={formState.password}
//                   onChange={handleChange}
//                 />
//                 <button
//                   className="btn btn-block btn-info"
//                   style={{ cursor: 'pointer' }}
//                   type="submit"
//                 >
//                   Submit
//                 </button>
//               </form>
//             )}

//             {error && (
//               <div className="my-3 p-3 bg-danger text-white">
//                 {error.message}
//               </div>
//             )}
//           </div>
//                 </div>
//             </div>

//         </main>
//     )   
// };

// export default Signup

import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom'



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
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit}>
        {data ? (
          <p>
            Success! You may now head{' '}
            <Link to="/">back to the homepage.</Link>
          </p>
        ) : (
          <>
            {error && <Alert variant="danger">{error.message}</Alert>}
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
                variant="primary"
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