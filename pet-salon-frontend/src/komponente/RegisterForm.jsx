import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false); // State za prikaz modala
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://127.0.0.1:8000/api/register', {
                name,
                email,
                password
            });

            // Ako je registracija uspešna, prikaži modal i resetuj grešku
            setShowModal(true);
            setError('');
        } catch (error) {
            setError('Neuspešna registracija. Proverite podatke i pokušajte ponovo.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login'); // Preusmeravanje na login stranicu nakon zatvaranja modala
    };

    return (
        <div className="login-form">
            <h2>Registracija</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Ime:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Registracija</button>
            </form>

            {/* Modal za prikaz uspešne registracije */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Registracija uspešna!</h3>
                        <p>Možete se sada prijaviti.</p>
                        <button onClick={handleCloseModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
