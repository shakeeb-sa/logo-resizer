import React from 'react';

const ImageGrid = ({ images, setImages }) => {
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
        gap: '1rem' 
      }}>
        {images.map((img, idx) => (
          <div key={idx} style={{
            position: 'relative',
            aspectRatio: '1',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            backgroundColor: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <img 
              src={img} 
              alt="preview" 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
            />
            <button
              onClick={() => removeImage(idx)}
              style={{
                position: 'absolute', top: '-8px', right: '-8px',
                width: '24px', height: '24px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger)',
                color: 'white',
                border: '2px solid white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;