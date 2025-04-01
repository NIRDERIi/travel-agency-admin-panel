import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OfferList() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://travel-backend-server.onrender.com/api/offers")
      .then(res => setOffers(res.data))
      .catch(err => console.error("Error loading offers:", err));
  }, []);

  const handleDelete = async (slug) => {
    const confirm = window.confirm("האם אתה בטוח שתרצה למחוק הצעה זו?");
    if (!confirm) return;

    try {
      await axios.delete(`https://travel-backend-server.onrender.com/api/offers/${slug}`);
      setOffers(offers.filter(offer => offer.slug !== slug));
    } catch (err) {
      alert("לא יכל למחוק הצעה");
      console.error(err);
    }
  };

  const copyLink = (slug) => {
    const fullLink = `https://travel-client-site.vercel.app/offer/${slug}`;
    navigator.clipboard.writeText(fullLink)
      .then(() => alert("📋 הקישור הועתק!"))
      .catch(() => alert("שגיאה בהעתקת הקישור"));
  };

  return (
    <div>
      <h2>📄 כל ההצעות</h2>
      <div className="offers-grid">
        {offers.map(offer => (
          <div key={offer.slug} className="offer-card">
            <h3>{offer.title}</h3>
            <p>
              <strong>Slug:</strong> {offer.slug}
              <button onClick={() => copyLink(offer.slug)} style={{ marginLeft: '10px' }}>📋 העתק קישור</button>
            </p>
            <button onClick={() => navigate(`/edit/${offer.slug}`)}>✏️ ערוך</button>
            <button onClick={() => handleDelete(offer.slug)}>🗑 מחק</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferList;
