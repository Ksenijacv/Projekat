import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Footer from './komponente/Footer';
import Navbar from './komponente/Navbar';
import Pocetna from './komponente/Pocetna';
import ONama from './komponente/ONama';
import Usluge from './komponente/Usluge';
import NaseMusterije from './komponente/NaseMusterije';
import LoginForm from './komponente/LoginForm';
import RegisterForm from './komponente/RegisterForm';
import Korisnici from './komponente/Korisnici'; // Nova komponenta za radnike, da menjaju korisnike

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('access_token'));
  const [isWorker, setIsWorker] = useState(sessionStorage.getItem('is_worker') === 'true');

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} isWorker={isWorker} setIsWorker={setIsWorker} />
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/o-nama" element={<ONama />} />
          <Route path="/login" element={<LoginForm setToken={setToken} setIsWorker={setIsWorker} />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Rute koje su dostupne samo kada je korisnik ulogovan */}
          {token && (
            <>
              <Route path="/usluge" element={<Usluge />} />
              {isWorker ? (
                <Route path="/korisnici" element={<Korisnici />} /> // Stranica za radnike
              ) : (
                <Route path="/musterije" element={<NaseMusterije />} /> // Stranica za obične korisnike
              )}
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;