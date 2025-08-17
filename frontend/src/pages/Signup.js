import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Login from './Login';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(name, value);
        // console.log("Current State:", { ...signupInfo, [name]: value });// For full object log
    };
     // Log the updated state
    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", signupInfo);
        const { name, email, password } = signupInfo;
        if(!name || !email || !password) {
            return handleError("Please fill all the fields");
        }
        try {
            const url = "https://deploy-mern-app-api-lilac.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            console.log(result);
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
        // Here you would typically send the loginInfo to your backend API
    };

    return (
        <div className='container'>
            <h1> Signup Page</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name} // Bind the input value to state
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        autoFocus
                        placeholder='Enter your email...'
                        value={signupInfo.email} // Bind the input value to state
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        autoFocus
                        placeholder='Enter your password...'
                        value={signupInfo.password} // Bind the input value to state
                    />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account ?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup
