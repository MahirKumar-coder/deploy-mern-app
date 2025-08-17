import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
    const [loggedInUser, setLoggedInUser] =  useState('');
    const [products, setProducts] =  useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedTnUser'));
    }, [])

    

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedTnUser');
        handleSuccess("Logged out successfully");
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try{
            const url = "https://deploy-mern-app-api-lilac.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('jwtToken')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        }catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, []);

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
        <div>
            {
                products && products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available</p>
                )
            }
        </div>
      <ToastContainer />
    </div>
  )
}

export default Home
