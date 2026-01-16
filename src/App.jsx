import React, { useState, useEffect, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [config, setConfig] = useState({
    width: 500,
    height: 500,
    bgColor: '#ffffff'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle Global Paste
  useEffect(() => {
    const handlePaste = (e) => {
      if (images.length >= 10) return;
      const items = e.clipboardData.items;
      
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            setImages(prev => [...prev, event.target.result]);
          };
          reader.readAsDataURL(blob);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [images]);

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    const zip = new JSZip();

    const processImage = (src, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = parseInt(config.width);
          canvas.height = parseInt(config.height);
          const ctx = canvas.getContext('2d');

          // Fill Background
          if (config.bgColor !== 'transparent') {
            ctx.fillStyle = config.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          // Calculate "Contain" Aspect Ratio
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;

          ctx.drawImage(img, x, y, w, h);

          canvas.toBlob((blob) => {
            zip.file(`logo-${index + 1}.png`, blob);
            resolve();
          });
        };
      });
    };

    await Promise.all(images.map((img, i) => processImage(img, i)));
    
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'processed-logos.zip');
      setIsProcessing(false);
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Logo Standardizer</h1>
        <p>Paste screenshots (Ctrl+V) directly to this page.</p>
      </header>

      <div className="main-content">
        <div className="controls-panel">
          <div className="input-group">
            <label>Width (px)</label>
            <input 
              type="number" 
              value={config.width} 
              onChange={(e) => setConfig({...config, width: e.target.value})} 
            />
          </div>
          <div className="input-group">
            <label>Height (px)</label>
            <input 
              type="number" 
              value={config.height} 
              onChange={(e) => setConfig({...config, height: e.target.value})} 
            />
          </div>
          <div className="input-group">
            <label>Padding Color</label>
            <select 
              value={config.bgColor}
              onChange={(e) => setConfig({...config, bgColor: e.target.value})}
            >
              <option value="#ffffff">White</option>
              <option value="#000000">Black</option>
              <option value="transparent">Transparent</option>
              <option value="#808080">Gray</option>
            </select>
          </div>
          
          <div className="status-badge">
            {images.length} / 10 Images
          </div>
        </div>

        <div className="preview-area">
          {images.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>Ready to Paste</h3>
              <p>Press Ctrl+V anywhere to add your logo screenshots.</p>
            </div>
          ) : (
            <div className="grid">
              {images.map((img, idx) => (
                <div key={idx} className="card">
                  <img src={img} alt="preview" />
                  <button onClick={() => removeImage(idx)} className="remove-btn">×</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button 
          className="download-btn" 
          disabled={images.length === 0 || isProcessing}
          onClick={handleDownload}
        >
          {isProcessing ? 'Zipping...' : 'Download ZIP Bundle'}
        </button>
      </div>
    </div>
  );
}

export default App;