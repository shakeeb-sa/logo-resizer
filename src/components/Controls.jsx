import React from 'react';

const Controls = ({ config, setConfig }) => {
  const handleChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    backgroundColor: '#fff'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    marginBottom: '6px'
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '1.5rem',
      padding: '1.5rem',
      backgroundColor: '#f8fafc',
      borderBottom: '1px solid var(--border)'
    }}>
      {/* Width Input */}
      <div>
        <label style={labelStyle}>Target Width</label>
        <div style={{ position: 'relative' }}>
          <input 
            type="number" 
            value={config.width}
            onChange={(e) => handleChange('width', e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '12px', top: '10px', color: '#94a3b8', fontSize: '0.8rem' }}>px</span>
        </div>
      </div>

      {/* Height Input */}
      <div>
        <label style={labelStyle}>Target Height</label>
        <div style={{ position: 'relative' }}>
          <input 
            type="number" 
            value={config.height}
            onChange={(e) => handleChange('height', e.target.value)}
            style={inputStyle}
          />
          <span style={{ position: 'absolute', right: '12px', top: '10px', color: '#94a3b8', fontSize: '0.8rem' }}>px</span>
        </div>
      </div>

      {/* Background Selector */}
      <div>
        <label style={labelStyle}>Background</label>
        <select 
          value={config.bgColor}
          onChange={(e) => handleChange('bgColor', e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer' }}
        >
          <option value="#ffffff">White</option>
          <option value="#000000">Black</option>
          <option value="transparent">Transparent</option>
          <option value="#e2e8f0">Light Gray</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;