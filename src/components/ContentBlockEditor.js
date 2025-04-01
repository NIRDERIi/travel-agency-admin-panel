import React, { useState } from 'react';

function ContentBlockEditor({ block, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(true);

  const handleChange = (field, value) => {
    onUpdate({ ...block, [field]: value });
  };

  return (
    <div className={`block-card futuristic-card ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="block-header" onClick={() => setExpanded(!expanded)}>
        <h4>{block.type.toUpperCase()}</h4>
        <button type="button" onClick={onRemove} className="remove-button">🗑</button>
      </div>

      {expanded && (
        <>
          {block.type === 'hotel' && (
            <>
              <input placeholder="שם מלון" value={block.name || ''} onChange={e => handleChange('name', e.target.value)} />
              <input placeholder="צ'ק אין" value={block.checkIn || ''} onChange={e => handleChange('checkIn', e.target.value)} />
              <input placeholder="צ'ק אאוט" value={block.checkOut || ''} onChange={e => handleChange('checkOut', e.target.value)} />
              <input placeholder="כמות לילות" value={block.nights || ''} onChange={e => handleChange('nights', e.target.value)} />
              <input placeholder="דירוג" value={block.rating || ''} onChange={e => handleChange('rating', e.target.value)} />
            </>
          )}

          {block.type === 'flight' && (
            <>
              <input placeholder="מאיפה?" value={block.from || ''} onChange={e => handleChange('from', e.target.value)} />
              <input placeholder="לאן?" value={block.to || ''} onChange={e => handleChange('to', e.target.value)} />
              <input placeholder="תאריך" value={block.date || ''} onChange={e => handleChange('date', e.target.value)} />
            </>
          )}

          {block.type === 'transfer' && (
            <>
              <input placeholder="פרטים" value={block.details || ''} onChange={e => handleChange('details', e.target.value)} />
              <input placeholder="תאריך" value={block.date || ''} onChange={e => handleChange('date', e.target.value)} />
            </>
          )}

          {block.type === 'note' && (
            <textarea placeholder="הערות" value={block.text || ''} onChange={e => handleChange('text', e.target.value)} />
          )}
        </>
      )}
    </div>
  );
}

export default ContentBlockEditor;
