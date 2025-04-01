import React, { useState } from 'react';
import ContentBlockEditor from './ContentBlockEditor';
import { v4 as uuidv4 } from 'uuid';
import { FaHotel, FaPlane, FaShuttleVan, FaStickyNote, FaTrashAlt } from 'react-icons/fa';

function SectionEditor({ section, onUpdate, onRemove }) {
  const [location, setLocation] = useState(section.location);
  const [coverImage, setCoverImage] = useState(section.cover_image);
  const [content, setContent] = useState(section.content);

  const updateBlock = (index, updatedBlock) => {
    const newContent = [...content];
    newContent[index] = updatedBlock;
    setContent(newContent);
    onUpdate({ ...section, location, cover_image: coverImage, content: newContent });
  };

  const removeBlock = (index) => {
    const newContent = content.filter((_, i) => i !== index);
    setContent(newContent);
    onUpdate({ ...section, location, cover_image: coverImage, content: newContent });
  };

  const addBlock = (type) => {
    const newBlock = { type, id: uuidv4() };
    const updated = [...content, newBlock];
    setContent(updated);
    onUpdate({ ...section, location, cover_image: coverImage, content: updated });
  };

  return (
    <div className="section futuristic-card">
      <div className="section-header">
        <div>
          <h3>{location || "New Location"}</h3>
          {coverImage && (
            <img src={coverImage} alt="Preview" style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }} />
          )}
        </div>
        <button type="button" onClick={onRemove} className="delete-section"><FaTrashAlt /></button>
      </div>

      <input placeholder="שם מיקום" value={location} onChange={e => {
        setLocation(e.target.value);
        onUpdate({ ...section, location: e.target.value, cover_image: coverImage, content });
      }} />

      <input placeholder="קישור תמונה" value={coverImage} onChange={e => {
        setCoverImage(e.target.value);
        onUpdate({ ...section, location, cover_image: e.target.value, content });
      }} />

      <div className="action-buttons">
        <button type="button" onClick={() => addBlock('hotel')}><FaHotel /> מלון</button>
        <button type="button" onClick={() => addBlock('flight')}><FaPlane /> טיסה</button>
        <button type="button" onClick={() => addBlock('transfer')}><FaShuttleVan /> העברה</button>
        <button type="button" onClick={() => addBlock('note')}><FaStickyNote /> הערה</button>
      </div>

      {content.map((block, index) => (
        <ContentBlockEditor
          key={block.id}
          block={block}
          onUpdate={(updated) => updateBlock(index, updated)}
          onRemove={() => removeBlock(index)}
        />
      ))}
    </div>
  );
}

export default SectionEditor;
