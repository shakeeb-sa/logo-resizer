import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { LayoutGrid, Save, Check, Upload } from 'lucide-react'; // ADDED Upload here

const STANDARD_PRESETS = [
  { name: 'Favicon', w: 32, h: 32 },
  { name: 'Avatar', w: 400, h: 400 },
  { name: 'OG Link', w: 1200, h: 630 },
  { name: 'HD Square', w: 1080, h: 1080 },
];

const Controls = ({ config, setConfig, onApplyColorToAll, onUpload }) => {

  const { user, updateBrandKit } = useAuth();

  const handlePresetClick = (w, h) => {
    setConfig(prev => ({ ...prev, width: w, height: h }));
  };

  const saveCurrentAsPreset = async () => {
    const name = prompt("Name this size preset (e.g., My Website Logo):");
    if (!name) return;

    const newPreset = { name, width: parseInt(config.width), height: parseInt(config.height) };
    const currentPresets = user?.customPresets || [];
    
    await updateBrandKit({ 
        customPresets: [...currentPresets, newPreset] 
    });
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border)',
    fontSize: '0.95rem', outline: 'none', backgroundColor: '#fff'
  };

  const labelStyle = {
    display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)',
    marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
      
      {/* 1. PRESETS ROW */}
      <div style={{ padding: '1.25rem 1.5rem 0', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        
        {/* Manual Upload Trigger */}
        <label style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', 
          fontSize: '0.8rem', borderRadius: '8px', background: 'var(--primary)', 
          color: 'white', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: '0 4px 10px rgba(79, 70, 229, 0.2)' 
        }}>
          <Upload size={14} /> Upload Images
          <input type="file" multiple accept="image/*" onChange={onUpload} style={{ display: 'none' }} />
        </label>

        <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 8px' }}></div>

        {STANDARD_PRESETS.map(p => (
          <button
            key={p.name}
            onClick={() => handlePresetClick(p.w, p.h)}
            style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', background: '#fff', border: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-main)' }}
          >
            {p.name}
          </button>
        ))}
        
        {/* User's Custom MongoDB Presets */}
        {user?.customPresets?.map((p, i) => (
           <button
             key={i}
             onClick={() => handlePresetClick(p.width, p.height)}
             style={{ padding: '6px 12px', fontSize: '0.75rem', borderRadius: '6px', background: '#f0ebff', border: '1px solid #7b68ee33', fontWeight: '700', color: 'var(--primary)' }}
           >
             {p.name}
           </button>
        ))}
      </div>

      {/* 2. INPUT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', padding: '1.5rem' }}>
        <div>
          <label style={labelStyle}>Width</label>
          <input type="number" value={config.width} onChange={(e) => setConfig({...config, width: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Height</label>
          <input type="number" value={config.height} onChange={(e) => setConfig({...config, height: e.target.value})} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Save Current</label>
          <button 
            onClick={saveCurrentAsPreset}
            style={{ ...inputStyle, background: 'white', color: 'var(--primary)', fontWeight: '700', display: 'flex', justifyContent: 'center', gap: '8px', borderStyle: 'dashed' }}
          >
            <Save size={16} /> Save Size
          </button>
        </div>
        <div>
          <label style={labelStyle}>Apply Color</label>
          <div style={{ display: 'flex', gap: '8px' }}>
             <select value={config.bgColor} onChange={(e) => setConfig({...config, bgColor: e.target.value})} style={{ ...inputStyle, flex: 1, cursor: 'pointer' }}>
                <option value="#ffffff">White</option>
                <option value="#000000">Black</option>
                <option value="transparent">Transparent</option>
             </select>
             <button onClick={onApplyColorToAll} style={{ background: 'var(--primary)', color: 'white', borderRadius: '8px', width: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={20} />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;