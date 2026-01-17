import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem 0',
      backgroundColor: 'white',
      marginTop: 'auto' // Pushes footer to bottom
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          © {new Date().getFullYear()} LogoFixer Tool. Processing happens entirely in your browser.
        </p>
      </div>
    </footer>
  );
};

export default Footer;