import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pocetna.css'; 

const Pocetna = () => {
    const [dogImages, setDogImages] = useState([]);

    useEffect(() => {
        const fetchDogImages = async () => {
            try {
                const response = await axios.get('https://dog.ceo/api/breeds/image/random/14'); 
                setDogImages(response.data.message);
            } catch (error) {
                console.error('Greska u vracanju slika:', error);
            }
        };
        fetchDogImages();
    }, []);

    return (
        <div className='home-stranica'>
        <div className="home">
            <h1>Dobrodošli u naš pet salon!</h1>
            <p>Naša strast je briga o vašim ljubimcima. Sa našim iskusnim osobljem i 
                prijateljskim okruženjem, vaši ljubimci će uživati u najboljoj mogućoj nezi.</p>
            <div className="dog-images-container">
                {dogImages.map((dogImage, index) => (
                    <img key={index} src={dogImage} alt={`Random Dog ${index + 1}`} className="dog-image" />
                ))}
            </div>
        </div>
        </div>
    );
};

export default Pocetna;