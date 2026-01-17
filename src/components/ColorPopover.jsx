import React, { useState, useRef, useEffect } from 'react';

const PRESETS = [
  { color: '#ffffff', label: 'White' },
  { color: '#000000', label: 'Black' },
  { color: 'transparent', label: 'Transparent' },
  { color: '#f1f5f9', label: 'Slate 100' },
  { color: '#cbd5e1', label: 'Slate 300' },
  { color: '#475569', label: 'Slate 600' },
  { color: '#ef4444', label: 'Red' },
  { color: '#3b82f6', label: 'Blue' },
];

const ColorPopover = ({ currentColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={popoverRef}>
      {/* Trigger Button (Color Swatch) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Change Background Color"
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          background: currentColor === 'transparent' 
            ? 'conic-gradient(#ccc 0 25%, #fff 0 50%, #ccc 0 75%, #fff 0)' // Checkerboard pattern
            : currentColor,
          cursor: 'pointer',
          padding: 0
        }}
      />

      {/* Popover Menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '120%', // Above the button
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0',
          padding: '12px',
          width: '200px',
          zIndex: 50,
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '8px', color: '#64748b' }}>
            Background Color
          </div>
          
          {/* Presets Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => { onChange(p.color); setIsOpen(false); }}
                title={p.label}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: currentColor === p.color ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                  background: p.color === 'transparent' 
                    ? 'conic-gradient(#ccc 0 25%, #fff 0 50%, #ccc 0 75%, #fff 0)' 
                    : p.color,
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>

          {/* Custom Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #e2e8f0', paddingTop: '8px' }}>
            <label style={{ fontSize: '0.75rem', color: '#64748b' }}>Custom:</label>
            <input 
              type="color" 
              value={currentColor === 'transparent' ? '#ffffff' : currentColor}
              onChange={(e) => onChange(e.target.value)}
              style={{ flex: 1, height: '30px', border: 'none', cursor: 'pointer', background: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPopover;