import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import Signup from './Signup';

function Login({ setIsAuthenticated }) {

    const [loginInfo, setLoginInfo] = useState({
        
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));
        console.log(name, value);
        
    };
     // Log the updated state
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Form submitted with data:", loginInfo);
        const { email, password } = loginInfo;
        if(!email || !password) {
            return handleError("Please fill all the fields");
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            console.log(result);
            if(success){
                handleSuccess(message);
                localStorage.setItem('jwtToken', jwtToken);
                localStorage.setItem('loggedTnUser', name);
                setIsAuthenticated(true);
                setTimeout(() => {
                    navigate('/home');
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
            <h1> Login Page</h1>
            <form onSubmit={handleLogin}>
                
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        autoFocus
                        placeholder='Enter your email...'
                        value={loginInfo.email} // Bind the input value to state
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
                        value={loginInfo.password} // Bind the input value to state
                        
                    />
                </div>
                <button type='submit'>Login</button>
                <span>Don't have an account?
                    <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login