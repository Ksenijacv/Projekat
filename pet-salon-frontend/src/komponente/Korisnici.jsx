import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Korisnici.css'; // Uvoz CSS-a

const Korisnici = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // Korisnik za prikaz u modalu
    const [isModalOpen, setIsModalOpen] = useState(false); // Stanje za modal

    useEffect(() => {
        // Dohvatanje korisnika sa backend-a
        const fetchUsers = async () => {
            try {
                const token = sessionStorage.getItem('access_token'); // Dohvati token iz sessionStorage-a
                const response = await axios.get('http://127.0.0.1:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}` // Dodaj token u zaglavlje
                    }
                });
                setUsers(response.data.data); // Pretpostavljamo da je struktura data
            } catch (error) {
                console.error("Error fetching users:", error);
                alert("Failed to fetch users. Please make sure you are authenticated.");
            }
        };
        fetchUsers();
    }, []);

    // Funkcija za otvaranje modala sa detaljima korisnika
    const openModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    // Funkcija za zatvaranje modala
    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Funkcija za brisanje korisnika
    const deleteUser = async (id) => {
        try {
            const token = sessionStorage.getItem('access_token');
            await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(users.filter(user => user.id !== id));
            closeModal();
            alert("User deleted successfully.");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div className="korisnici-container">
            <h2>Korisnici</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ime</th>
                        <th>Email</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => openModal(user)}>Detalji</button>
                                <button onClick={() => deleteUser(user.id)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal za prikaz detalja korisnika */}
            {isModalOpen && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Detalji korisnika</h3>
                        <p><strong>ID:</strong> {selectedUser.id}</p>
                        <p><strong>Ime:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Uloga:</strong> {selectedUser.is_worker ? 'Radnik' : 'Korisnik'}</p>
                        <button onClick={() => deleteUser(selectedUser.id)}>Obriši korisnika</button>
                        <button onClick={closeModal}>Zatvori</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Korisnici;
