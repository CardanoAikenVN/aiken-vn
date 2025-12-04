import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { Menu, X, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Giáo trình', href: '#curriculum' },
    { label: 'Tài liệu', href: '/docs/' },
    { label: 'Cộng đồng', href: '#community' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      transition: 'all 0.3s',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
      background: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(12px)' : 'none',
      padding: isScrolled ? '0.75rem 0' : '1.25rem 0'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer'
        }}>
          <img
            src="img/logo.jpeg"
            alt="Vietnamese Aiken Logo"
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '0.25rem',
              objectFit: 'cover'
            }}
          />
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '-0.025em'
          }}>Aiken VN</span>
        </div>

        {/* Desktop Nav */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '2rem'
        }} className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#9ca3af',
                textDecoration: 'none',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '1rem'
        }} className="desktop-actions">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              color: '#9ca3af',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Github size={14} />
            <span>1.2k</span>
          </a>
          <Link to="/docs/moi-truong" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'white',
              color: 'black',
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(255,255,255,0.2)',
              transition: 'background 0.3s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e5e5e5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              Bắt đầu học
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          style={{
            display: 'block',
            color: '#d1d5db',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: '#121212',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              overflow: 'hidden'
            }}
            className="mobile-menu"
          >
            <div style={{
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: '#d1d5db',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#d1d5db'}
                >
                  {link.label}
                </a>
              ))}
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.5rem 0' }} />
              <a
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#9ca3af',
                  textDecoration: 'none'
                }}
              >
                <Github size={16} /> GitHub Repo
              </a>
              <Link to="/docs/moi-truong" style={{ textDecoration: 'none', width: '100%' }}>
                <button style={{
                  background: '#8B5CF6',
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: 600,
                  marginTop: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Bắt đầu học
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav,
          .desktop-actions {
            display: flex !important;
          }
          .mobile-toggle,
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
