import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const ColorPopover = ({ currentColor, onChange }) => {
  const { user, updateBrandKit } = useAuth();
  
  // RESTORED: These are required for the menu to work
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  
  // Combine System Defaults with User's MongoDB favorite colors
  const systemDefaults = ['#ffffff', '#000000', 'transparent'];
  const userColors = user?.favoriteColors || [];
  const allPresets = [...new Set([...systemDefaults, ...userColors])];

  const handleAddCustomColor = (color) => {
    onChange(color);
    // If color isn't already saved, sync it to MongoDB
    if (!userColors.includes(color) && color !== 'transparent') {
        const newColors = [...userColors, color].slice(-8); // Keep last 8
        updateBrandKit({ favoriteColors: newColors });
    }
  };

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
            {allPresets.map((color) => (
  <button
    key={color}
    onClick={() => { onChange(color); setIsOpen(false); }}
    style={{
      width: '100%',
      aspectRatio: '1',
      borderRadius: '50%',
      border: currentColor === color ? '2px solid var(--primary)' : '1px solid #e2e8f0',
      background: color === 'transparent' 
        ? 'conic-gradient(#ccc 0 25%, #fff 0 50%, #ccc 0 75%, #fff 0)' 
        : color,
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
  onChange={(e) => handleAddCustomColor(e.target.value)} // Updated to use our save logic
  style={{ flex: 1, height: '30px', border: 'none', cursor: 'pointer', background: 'none' }}
/>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPopover;