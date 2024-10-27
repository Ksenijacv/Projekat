import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ token, setToken, isWorker, setIsWorker }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = sessionStorage.getItem('access_token');
            const tokenType = sessionStorage.getItem('token_type');
    
            await axios.post('http://127.0.0.1:8000/api/logout', {}, {
                headers: {
                    'Authorization': `${tokenType} ${token}`
                }
            });
    
            // Brišemo podatke iz sessionStorage
            sessionStorage.removeItem('access_token');
            sessionStorage.removeItem('token_type');
            sessionStorage.removeItem('is_worker');
            sessionStorage.removeItem('user_email');
    
            // Resetujemo state
            setToken(null);
            setIsWorker(false);
    
            // Prikazujemo poruku u konzoli 
            console.log(`Logout successful. User has been logged out.`);
    
            // Preusmeravamo na početnu stranicu
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">Početna</Link>
                </li>
                <li>
                    <Link to="/o-nama">O nama</Link>
                </li>
                <li>
                    <Link to="/musterije">Naše mušterije</Link>
                </li>
                {token ? (
                    <>
                        <li>
                            <Link to="/usluge">Usluge</Link>
                        </li>
                        {isWorker && (
                            <>
                                <li>
                                    <Link to="/admin/usluge">Admin Usluge</Link>
                                </li>
                                <li>
                                    <Link to="/admin/musterije">Admin Mušterije</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
