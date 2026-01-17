import React from 'react';

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '90px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'var(--text-main)',
      color: 'white',
      padding: '10px 24px',
      borderRadius: '30px',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 100,
      fontWeight: '500',
      animation: 'slideIn 0.3s ease-out forwards',
      display: 'flex', alignItems: 'center', gap: '8px'
    }}>
      {message}
    </div>
  );
};

export default Toast;