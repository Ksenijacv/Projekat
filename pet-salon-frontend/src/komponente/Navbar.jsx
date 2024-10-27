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
            sessionStorage.clear();

            // Resetujemo state
            setToken(null);
            setIsWorker(false);

            console.log(`Logout successful. User has been logged out.`);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                
                {/* Zajedničke stranice dostupne svim korisnicima */}
                <li>
                    <Link to="/">Početna</Link>
                </li>

                {/* Stranice dostupne samo kada korisnik NIJE prijavljen */}
                {!token && (
                    <>
                        <li>
                            <Link to="/o-nama">O nama</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}

                {/* Stranice dostupne samo prijavljenim korisnicima */}
                {token && (
                    <>
                        <li>
                            <Link to="/usluge">Usluge</Link>
                        </li>
                        
                        {/* Prikaz stranica prema ulozi korisnika */}
                        {isWorker ? (
                            <li>
                                <Link to="/korisnici">Korisnici</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/musterije">Naše mušterije</Link>
                            </li>
                        )}

                        {/* Logout dugme za prijavljene korisnike */}
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
