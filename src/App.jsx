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
  const [images, setImages] = useState([]);
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

  // --- Logic 1: Paste Handler ---
  useEffect(() => {
    const handlePaste = (e) => {
      // Ignore if user is typing in inputs
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
            setImages(prev => [...prev, event.target.result]);
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
  }, [images]);

  // --- Logic 2: Download Handler ---
  const handleDownload = async () => {
    if (images.length === 0) return;
    
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

          // Smart "Contain" Resize Logic
          const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
          const w = img.width * scale;
          const h = img.height * scale;
          const x = (canvas.width - w) / 2;
          const y = (canvas.height - h) / 2;

          ctx.drawImage(img, x, y, w, h);

          canvas.toBlob((blob) => {
            zip.file(`logo-fixed-${index + 1}.png`, blob);
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
          
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '600px' }}>
            <h1 style={{ 
              fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem',
              background: 'linear-gradient(to right, var(--text-main), var(--primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Standardize Your Logos
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Paste screenshots or raw logos directly from your clipboard. We'll center, pad, and resize them to your exact specifications.
            </p>
          </div>

          {/* Main Card */}
          <div style={{
            width: '100%',
            maxWidth: '650px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border)'
          }}>
            
            <Controls config={config} setConfig={setConfig} />
            
            <ImageGrid images={images} setImages={setImages} />
            
            {/* Action Bar */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: '#fff',
              borderTop: '1px solid var(--border)'
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