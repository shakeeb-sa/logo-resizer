import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Component Imports
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import ImageGrid from './components/ImageGrid';
import Toast from './components/Toast';

function App() {
  // --- State ---
  // Image structure: { id: number, src: string (base64), bgColor: string }
  const [images, setImages] = useState([]);
  
  // Config determines default settings for NEW images
  const [config, setConfig] = useState({
    width: 500,
    height: 500,
    bgColor: '#ffffff'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState('');

  // --- Helpers ---
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 2500);
  };

  // Function passed to controls to sync settings
  const handleApplyColorToAll = () => {
    if (images.length === 0) return;
    setImages(prev => prev.map(img => ({ ...img, bgColor: config.bgColor })));
    showNotification(`Applied ${config.bgColor} to all images`);
  };

  // --- Logic 1: Paste Handler ---
  useEffect(() => {
    const handlePaste = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      if (images.length >= 10) {
        showNotification('⚠️ Max limit of 10 images reached');
        return;
      }
      
      const items = e.clipboardData.items;
      let foundImage = false;
      
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          const reader = new FileReader();
          reader.onload = (event) => {
            // NEW: Create an object with ID and inherit current Default BG
            const newImage = {
              id: Date.now() + Math.random(),
              src: event.target.result,
              bgColor: config.bgColor 
            };
            setImages(prev => [...prev, newImage]);
            showNotification('✅ Image added to queue!');
          };
          reader.readAsDataURL(blob);
          foundImage = true;
        }
      }
      if (!foundImage) showNotification('ℹ️ No image found in clipboard');
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [images, config.bgColor]); // Added config.bgColor dependency so pasted image gets current default

  // --- Logic 2: Download Handler ---
  const handleDownload = async () => {
    if (images.length === 0) return;
    
    setIsProcessing(true);
    const zip = new JSZip();

    const processImage = (imageObj, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imageObj.src;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = parseInt(config.width);
          canvas.height = parseInt(config.height);
          const ctx = canvas.getContext('2d');

          // NEW: Use the specific image's background color
          if (imageObj.bgColor !== 'transparent') {
            ctx.fillStyle = imageObj.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          // Smart "Contain" Resize Logic
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

    try {
      await Promise.all(images.map((img, i) => processImage(img, i)));
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'logofixer-bundle.zip');
      showNotification('🎉 Download started!');
    } catch (error) {
      console.error(error);
      showNotification('❌ Error processing images');
    } finally {
      setIsProcessing(false);
    }
  };

  // --- Render ---
  return (
    <>
      <Header />
      <Toast message={notification} />

      <main style={{ flex: 1, padding: '3rem 0', backgroundColor: 'var(--bg-body)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem',
              color: 'var(--text-main)'
            }}>
              Standardize Your <span style={{ color: 'var(--primary)' }}>Logos</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Paste screenshots. Customize backgrounds per image. Download standardized sizes.
            </p>
          </div>

          <div style={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'visible', // Changed to visible for Popover to render outside
            border: '1px solid var(--border)'
          }}>
            
            <Controls 
              config={config} 
              setConfig={setConfig} 
              onApplyColorToAll={handleApplyColorToAll}
            />
            
            <ImageGrid images={images} setImages={setImages} />
            
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#fff',
              borderTop: '1px solid var(--border)',
              borderRadius: '0 0 var(--radius-lg) var(--radius-lg)'
            }}>
              <button 
                className="btn btn-primary"
                style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
                disabled={images.length === 0 || isProcessing}
                onClick={handleDownload}
              >
                {isProcessing ? 'Processing Bundle...' : `Download ${images.length > 0 ? images.length + ' ' : ''}Logos as ZIP`}
              </button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;