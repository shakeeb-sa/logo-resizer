import React from 'react';

const Header = () => {
  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border)',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #818cf8 100%)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 'bold', fontSize: '20px'
          }}>
            ⚡
          </div>
          <span style={{ fontWeight: '700', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
            Logo<span style={{ color: 'var(--primary)' }}>Fixer</span>
          </span>
        </div>

        {/* Right Side */}
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noreferrer"
          style={{
            textDecoration: 'none',
            color: 'var(--text-muted)',
            fontWeight: '500',
            fontSize: '0.9rem',
            display: 'flex', alignItems: 'center', gap: '6px'
          }}
        >
          <span>View on GitHub</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;