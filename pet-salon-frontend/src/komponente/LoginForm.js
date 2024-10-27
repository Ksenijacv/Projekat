import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken, setIsWorker }) => {
    const [email, setEmail] = useState('ananikolic@gmail.com');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            });

            const { access_token, token_type, is_worker } = response.data; 
            
            // Ispis celog response-a da vidimo šta vraća backend
            console.log('Response data:', response.data);
            
            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('token_type', token_type);
            sessionStorage.setItem('is_worker', is_worker);
            setToken(access_token);

            // Koristi jednostavan uslov za proveru is_worker vrednosti
            setIsWorker(!!is_worker);

            // Ispis u konzoli da li je korisnik "worker" ili ne
            console.log('Login successful');
            console.log(`Logged in as: ${email}`);
            console.log(`User type (is_worker): ${is_worker ? 'Worker' : 'Not a worker'}`);

            if (is_worker) {
                navigate('/admin/usluge');
            } else {
                navigate('/usluge');
            }

        } catch (error) {
            setError('Nisu dobri parametri za login.');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Lozinka:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;

