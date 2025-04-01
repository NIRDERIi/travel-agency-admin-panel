import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = "https://travel-backend-server.onrender.com";

function OfferList() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE}/api/offers`)
      .then(res => setOffers(res.data))
      .catch(err => console.error("Error loading offers:", err));
  }, []);

  const handleDelete = async (slug) => {
    const confirm = window.confirm("האם אתה בטוח שתרצה למחוק הצעה זו?");
    if (!confirm) return;

    try {
      await axios.delete(`${API_BASE}/api/offers/${slug}`);
      setOffers(offers.filter(offer => offer.slug !== slug));
    } catch (err) {
      alert("לא יכל למחוק הצעה");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>📄 כל ההצעות</h2>
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.slug} className="offer-card">
            <h3>{offer.title}</h3>
            <p><strong>Slug:</strong> {offer.slug}</p>
            <button onClick={() => navigate(`/edit/${offer.slug}`)}>✏️ ערוך</button>
            <button onClick={() => handleDelete(offer.slug)}>🗑 מחק</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferList;
