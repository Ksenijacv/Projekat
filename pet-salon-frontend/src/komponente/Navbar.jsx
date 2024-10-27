import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">Početna</Link>
                </li>
                <li>
                    <Link to="/usluge">Usluge</Link>
                </li>
                <li>
                    <Link to="/o-nama">O nama</Link>
                </li>
                <li>
                    <Link to="/musterije">Nase musterije</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;