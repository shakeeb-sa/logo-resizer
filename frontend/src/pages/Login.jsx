import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', formData);
      setToken(data.token);
      setUser(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', border: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)', color: 'white', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontWeight: 'bold', fontSize: '24px' }}>⚡</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em' }}>Welcome back</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginTop: '4px' }}>Sign in to access your brand workspace</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  required 
                  placeholder="name@company.com"
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Password</label>
            <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>
          </div>
          <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: '10px', background: '#4f46e5', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1rem', transition: 'all 0.2s' }}>
            Sign In <ArrowRight size={18} />
          </button>
        </form>
        <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ color: '#4f46e5', fontWeight: '700', textDecoration: 'none' }}>Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;