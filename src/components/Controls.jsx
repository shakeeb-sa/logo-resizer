import React from 'react';

const Controls = ({ config, setConfig, onApplyColorToAll }) => {
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
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

      {/* Default Background Selector */}
      <div>
        <label style={labelStyle}>Default Background</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select 
            value={config.bgColor}
            onChange={(e) => handleChange('bgColor', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', flex: 1 }}
          >
            <option value="#ffffff">White</option>
            <option value="#000000">Black</option>
            <option value="transparent">Transparent</option>
            <option value="#f1f5f9">Slate 100</option>
          </select>
          
          <button
            onClick={onApplyColorToAll}
            title="Apply this color to all current images"
            style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              width: '42px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;