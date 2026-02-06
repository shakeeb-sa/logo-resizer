import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaBriefcase, FaArrowUp, FaReact, FaNodeJs } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';
import { Zap } from 'lucide-react'; // ADDED THIS LINE


const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', marginBottom: '60px' }}>
          
          {/* Column 1: Brand & Stack */}
          <div style={{ gridColumn: 'span 1.2' }}>
            <h3 style={{ fontWeight: '800', color: 'var(--text-main)', marginBottom: '15px', fontSize: '1.5rem' }}>Logo<span style={{ color: 'var(--primary)' }}>Fixer</span></h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '25px', maxWidth: '320px' }}>
              The professional environment for brand asset standardization. Built for speed, privacy, and team scalability.
            </p>
            <div style={{ display: 'flex', gap: '15px', color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Built with:</span>
                <div style={{ display: 'flex', gap: '12px', opacity: 0.6 }}>
                   <SiMongodb size={18} title="MongoDB" />
                   <SiExpress size={18} title="Express.js" />
                   <FaReact size={18} title="React" />
                   <FaNodeJs size={18} title="Node.js" />
                </div>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.95rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li style={{ cursor: 'pointer' }}>Logo Resizer</li>
              <li style={{ cursor: 'pointer' }}>Batch Processor</li>
              <li style={{ cursor: 'pointer' }}>Dimension Presets</li>
              <li style={{ cursor: 'pointer' }}>Brand Kits <span style={{ fontSize: '0.65rem', background: '#fef3c7', color: '#d97706', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>BETA</span></li>
            </ul>
          </div>

          {/* Column 3: Connect (Your Real Links) */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-main)', textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '1px' }}>Developer</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', transition: 'color 0.2s' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaLinkedin color="#0077b5" size={16} />
                </div>
                LinkedIn
              </a>
              <a href="https://github.com/shakeeb-sa" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaGithub color="#333" size={16} />
                </div>
                GitHub
              </a>
              <a href="https://shakeeb-sa.github.io/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaBriefcase color="var(--primary)" size={16} />
                </div>
                Portfolio
              </a>
              <a href="mailto:your-email@example.com" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FaEnvelope color="#e62b1e" size={16} />
                </div>
                Email Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Zap size={14} color="var(--primary)" />
             <span>© {year} LogoFixer PRO. Built by <b>Shakeeb Ahmed</b>.</span>
          </div>
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
            style={{ background: 'transparent', border: '1px solid #e2e8f0', color: 'var(--text-muted)', padding: '10px 20px', borderRadius: '50px', fontWeight: '600' }}
          >
            <FaArrowUp style={{ marginRight: '8px' }} /> Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;