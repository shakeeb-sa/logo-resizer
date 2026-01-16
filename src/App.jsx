import React, { useState, useEffect } from 'react';
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
  const [notification, setNotification] = useState('');

  // Helper to show temporary messages
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2000);
  };

  // Handle Global Paste
  useEffect(() => {
    const handlePaste = (e) => {
      // Prevent pasting if typing in an input field
      if (e.target.tagName === 'INPUT') return;

      if (images.length >= 10) {
        showNotification('⚠️ Max 10 images reached');
        return;
      }
      
      const items = e.clipboardData.items;
      let foundImage = false;
      
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            setImages(prev => [...prev, event.target.result]);
            showNotification('✅ Image added!');
          };
          reader.readAsDataURL(blob);
          foundImage = true;
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
      showNotification('🎉 Download started!');
    });
  };

  return (
    <div className="page-layout">
      
      {/* 1. TOP NAVIGATION */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="brand">
            <div className="brand-icon">⚡</div>
            <span>LogoFixer</span>
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="github-btn">
            ★ Star on GitHub
          </a>
        </div>
      </nav>

      {/* 2. MAIN WORKSPACE */}
      <main className="workspace">
        
        {/* Toast Notification */}
        <div className={`notification ${notification ? 'show' : ''}`}>
          {notification}
        </div>

        {/* The Main Card Tool */}
        <div className="main-card">
          <header className="card-header">
            <div className="logo-badge">LS</div>
            <div>
              <h1>Logo Standardizer</h1>
              <p>Paste screenshots (Ctrl+V) to pad & resize</p>
            </div>
          </header>

          <div className="controls-grid">
            <div className="input-wrapper">
              <label>Width</label>
              <input 
                type="number" 
                value={config.width} 
                onChange={(e) => setConfig({...config, width: e.target.value})} 
              />
              <span>px</span>
            </div>
            <div className="input-wrapper">
              <label>Height</label>
              <input 
                type="number" 
                value={config.height} 
                onChange={(e) => setConfig({...config, height: e.target.value})} 
              />
              <span>px</span>
            </div>
            <div className="input-wrapper">
              <label>Background</label>
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
          </div>

          <div className="preview-container">
            {images.length === 0 ? (
                <div className="empty-state">
                    <div className="dashed-box">
                        <span className="icon">📋</span>
                        <h3>Ready for Clipboard</h3>
                        <p>Press <strong>Ctrl+V</strong> anywhere to paste logos</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid-header">
                        <span>Preview ({images.length}/10)</span>
                        <button className="clear-link" onClick={() => setImages([])}>Clear All</button>
                    </div>
                    <div className="image-grid">
                        {images.map((img, idx) => (
                            <div key={idx} className="image-card">
                                <img src={img} alt="logo preview" />
                                <button onClick={() => removeImage(idx)} className="delete-btn" title="Remove">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
          </div>

          <div className="card-footer">
            <button 
                className="action-btn" 
                disabled={images.length === 0 || isProcessing}
                onClick={handleDownload}
            >
                {isProcessing ? 'Processing Bundle...' : 'Download ZIP Bundle'}
            </button>
          </div>
        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <p>© 2024 LogoFixer Tool. All processing happens in your browser.</p>
        </div>
      </footer>

    </div>
  );
}

export default App;