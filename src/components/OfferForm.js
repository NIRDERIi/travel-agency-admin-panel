import React, { useEffect, useState } from 'react';
import SectionEditor from './SectionEditor';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function OfferForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState('');
  const [urlSlug, setUrlSlug] = useState('');
  const [sections, setSections] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const state = location.state;

    if (slug) {
      axios.get(`https://travel-backend-server.onrender.com/api/offers/${slug}`)
        .then(res => {
          const offer = res.data;
          setTitle(offer.title);
          setUrlSlug(offer.slug);
          setSections(offer.data.sections || []);
          setIsEditing(true);
        })
        .catch(err => {
          console.error("Failed to load offer:", err);
          alert("Could not load offer.");
        });
    } else if (state?.cloneFrom) {
      const offer = state.cloneFrom;
      setTitle(offer.title + " (העתק)");
      setUrlSlug('');
      setSections(offer.data.sections || []);
      setIsEditing(false);
    } else {
      setTitle('');
      setUrlSlug('');
      setSections([]);
      setIsEditing(false);
    }
  }, [slug, location.state]);

  const addSection = () => {
    setSections([...sections, {
      id: uuidv4(),
      location: '',
      cover_image: '',
      content: []
    }]);
  };

  const updateSection = (id, updated) => {
    setSections(sections.map(sec => sec.id === id ? updated : sec));
  };

  const removeSection = (id) => {
    setSections(sections.filter(sec => sec.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = isEditing ? 'put' : 'post';
    const url = isEditing
      ? `https://travel-backend-server.onrender.com/api/offers/${slug}`
      : `https://travel-backend-server.onrender.com/api/offers`;

    try {
      await axios[method](url, {
        title,
        slug: urlSlug,
        data: { sections }
      });

      alert("✅ הצעה נשמרה!");
      navigate("/");
    } catch (err) {
      console.error("Error saving offer:", err);
      alert("❌ ההצעה לא הצליחה להישמר.");
    }
  };

  return (
    <div>
      <h2>{isEditing ? "✏️ ערוך הצעה" : "🆕 צור הצעה"}</h2>

      {isEditing && (
        <button
          type="button"
          style={{ marginBottom: '20px' }}
          onClick={() => navigate("/create", {
            state: {
              cloneFrom: {
                title,
                slug: urlSlug,
                data: { sections }
              }
            }
          })}
        >
          🌀 שכפל הצעה זו
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <input placeholder="כותרת" value={title} onChange={e => setTitle(e.target.value)} required />
        <input
          placeholder="שם קישור"
          value={urlSlug}
          onChange={e => setUrlSlug(e.target.value)}
          required
          disabled={isEditing}
        />

        <button type="button" onClick={addSection}>➕ הוסף מיקום</button>
        {sections.map((section) => (
          <SectionEditor
            key={section.id}
            section={section}
            onUpdate={(updated) => updateSection(section.id, updated)}
            onRemove={() => removeSection(section.id)}
          />
        ))}

        <button type="submit">💾 שמור הצעה</button>
      </form>
    </div>
  );
}

export default OfferForm;


