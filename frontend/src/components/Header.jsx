import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { LogOut, User, Github, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout, token } = useAuth();

  return (
    <header style={{
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand / Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, var(--primary) 45%, #818cf8 100%)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
          }}>
            <Zap size={20} fill="white" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '1.25rem', letterSpacing: '-0.8px', color: 'var(--text-main)' }}>
            Logo<span style={{ color: 'var(--primary)' }}>Fixer</span>
          </span>
        </Link>

        {/* Dynamic Actions Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {token ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Profile Pill */}
              <div style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', 
                background: '#f1f5f9', padding: '5px 12px 5px 5px', 
                borderRadius: '50px', border: '1px solid #e2e8f0' 
              }}>
                <div style={{ 
                  width: '28px', height: '28px', background: 'var(--primary)', 
                  color: 'white', borderRadius: '50%', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center', 
                  fontSize: '0.75rem', fontWeight: 'bold' 
                }}>
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  {user?.username}
                </span>
              </div>

              {/* Logout */}
              <button 
                onClick={logout}
                style={{ 
                  background: 'none', border: 'none', color: 'var(--text-secondary)', 
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '0.85rem', fontWeight: '500'
                }}
              >
                <LogOut size={16} /> <span>Exit</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600' }}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none', padding: '8px 18px', fontSize: '0.85rem' }}>Join Free</Link>
            </div>
          )}

          <div style={{ width: '1px', height: '24px', background: '#e2e8f0' }}></div>

          <a href="https://github.com/shakeeb-sa" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
            <Github size={20} />
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;