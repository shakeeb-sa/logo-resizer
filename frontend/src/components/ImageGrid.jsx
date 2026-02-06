import React from 'react';
import ColorPopover from './ColorPopover';

const ImageGrid = ({ images, setImages }) => {
  
  const removeImage = (targetId) => {
    setImages(images.filter((img) => img.id !== targetId));
  };

  const updateImageColor = (targetId, newColor) => {
    setImages(images.map(img => 
      img.id === targetId ? { ...img, bgColor: newColor } : img
    ));
  };

  if (images.length === 0) {
    return (
      <div style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        border: '2px dashed var(--border)',
        borderRadius: 'var(--radius-lg)',
        margin: '2rem',
        backgroundColor: '#fff'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>Ready to Paste</h3>
        <p style={{ margin: 0 }}>
          Press <kbd style={{ 
            background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' 
          }}>Ctrl + V</kbd> anywhere on this page to add logos.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' 
      }}>
        <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>
          Queue ({images.length}/10)
        </span>
        <button 
          onClick={() => setImages([])}
          style={{ 
            background: 'none', border: 'none', color: 'var(--danger)', 
            fontSize: '0.9rem', cursor: 'pointer', fontWeight: '500' 
          }}
        >
          Clear All
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {images.map((img) => (
          <div key={img.id} style={{
            position: 'relative',
            aspectRatio: '1',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            backgroundColor: '#fff', // The grid cell itself is white
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {/* The Image Preview showing the chosen background */}
            <div style={{ 
              width: '100%', height: '100%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: img.bgColor,
              backgroundImage: img.bgColor === 'transparent' 
                ? 'conic-gradient(#eee 0 25%, transparent 0 50%, #eee 0 75%, transparent 0)' 
                : 'none',
              backgroundSize: '20px 20px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <img 
                src={img.src} 
                alt="preview" 
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
              />
            </div>

            {/* Remove Button (Top Right) */}
            <button
              onClick={() => removeImage(img.id)}
              title="Remove Image"
              style={{
                position: 'absolute', top: '-8px', right: '-8px',
                width: '24px', height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger)',
                color: 'white',
                border: '2px solid white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                zIndex: 10
              }}
            >
              ×
            </button>

            {/* Color Picker Trigger (Bottom Right) */}
            <div style={{ position: 'absolute', bottom: '-10px', right: '-6px', zIndex: 20 }}>
              <ColorPopover 
                currentColor={img.bgColor} 
                onChange={(newColor) => updateImageColor(img.id, newColor)} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;