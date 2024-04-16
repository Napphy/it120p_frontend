import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate('/');
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users');
        setUsers(response.data);
    }

    return (
        <div>
            <Navbar />
            <section className="hero is-fullheight-with-navbar is-primary">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Welcome to Mapua Marketplace
                        </h1>
                        {name && (
                            <h2 className="subtitle">
                                Welcome back, {name}!
                            </h2>
                        )}
                        {!name && (
                            <h2 className="subtitle">
                                Welcome to our marketplace!
                            </h2>
                        )}
                    </div>
                </div>
            </section>
            {/* Add more sections or components as needed */}
        </div>
    );
}

export default Homepage;
