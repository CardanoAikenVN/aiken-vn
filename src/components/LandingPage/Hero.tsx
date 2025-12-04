import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Terminal, ToggleLeft, ToggleRight, Info } from 'lucide-react';
import { useTranslations } from './translations';

const Hero: React.FC = () => {
  const [showExplanation, setShowExplanation] = useState(false);
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);

  return (
    <section style={{ position: 'relative', paddingTop: '8rem', paddingBottom: '5rem', overflow: 'hidden' }}>
      {/* Background Gradients */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1000px',
        height: '500px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '5rem',
        right: 0,
        width: '500px',
        height: '500px',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '3rem',
        alignItems: 'center'
      }}
        className="hero-grid"
      >

        {/* Left Column: Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            background: 'rgba(139, 92, 246, 0.1)',
            color: '#8B5CF6',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '1.5rem'
          }}>
            <span style={{ position: 'relative', display: 'flex', height: '0.5rem', width: '0.5rem' }}>
              <span style={{
                position: 'absolute',
                display: 'inline-flex',
                height: '100%',
                width: '100%',
                borderRadius: '50%',
                background: '#8B5CF6',
                opacity: 0.75,
                animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
              }}></span>
              <span style={{
                position: 'relative',
                display: 'inline-flex',
                borderRadius: '50%',
                height: '0.5rem',
                width: '0.5rem',
                background: '#8B5CF6'
              }}></span>
            </span>
            {t.hero.badge}
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
            lineHeight: 1.1
          }}>
            Học Aiken bằng <br />
            <span className="gradient-text">Tiếng Việt.</span>
          </h1>

          <p style={{
            fontSize: '1.25rem',
            color: '#9ca3af',
            marginBottom: '2rem',
            maxWidth: '32rem',
            lineHeight: 1.75
          }}>
            Giáo trình tiếng Việt mã nguồn mở đầu tiên giúp lập trình viên làm chủ Aiken và smart contract trên Cardano. Nhanh. Rõ ràng. Miễn phí.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="hero-buttons">
            <Link to="/docs/moi-truong" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '1rem 2rem',
                background: 'white',
                color: 'black',
                borderRadius: '0.5rem',
                fontWeight: 700,
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 20px rgba(255,255,255,0.2)',
                transition: 'all 0.3s'
              }}>
                Bắt đầu học <ArrowRight size={20} />
              </button>
            </Link>
            <button style={{
              padding: '1rem 2rem',
              background: '#1E1E1E',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'white',
              borderRadius: '0.5rem',
              fontWeight: 600,
              fontSize: '1.125rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s'
            }}>
              <Download size={20} /> Tải PDF
            </button>
          </div>
        </motion.div>

        {/* Right Column: Code Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            borderRadius: '0.75rem',
            background: '#0d0d0d',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
          }}>

            {/* Window Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.05)',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.8)' }} />
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.8)' }} />
                <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.8)' }} />
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                fontFamily: 'monospace',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Terminal size={12} /> hello_world.ak
              </div>
            </div>

            {/* Code Body */}
            <div style={{
              padding: '1.5rem',
              fontFamily: 'monospace',
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              lineHeight: 1.75,
              overflowX: 'auto',
              position: 'relative',
              color: '#d1d5db'
            }}>
              {/* Syntax Highlighting Simulation */}
              <div>
                <span style={{ color: '#6b7280', fontStyle: 'italic' }}>// Một Validator Aiken đơn giản</span>
                <br />
                <br />
                <span style={{ color: '#c084fc' }}>validator</span> <span style={{ color: '#60a5fa' }}>hello_world</span> {'{'}
                <br />
                &nbsp;&nbsp;<span style={{ color: '#c084fc' }}>fn</span> <span style={{ color: '#facc15' }}>check</span><span style={{ color: '#9ca3af' }}>(_datum, _redeemer, _ctx)</span> {'{'}
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#8B5CF6' }}>true</span>
                <br />
                &nbsp;&nbsp;{'}'}
                <br />
                {'}'}
              </div>

              {/* Explanation Overlay */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      right: '1rem',
                      bottom: '1rem',
                      background: 'rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      backdropFilter: 'blur(12px)',
                      padding: '1rem',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <Info style={{ color: '#8B5CF6', flexShrink: 0, marginTop: '0.125rem' }} size={18} />
                      <div>
                        <h4 style={{ fontWeight: 600, color: '#8B5CF6', fontSize: '0.875rem', marginBottom: '0.25rem' }}>{t.hero.explanationTitle}</h4>
                        <p style={{ color: '#d1d5db', fontSize: '0.75rem' }}>
                          {t.hero.explanationText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Toggle */}
            <div style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.05)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Aiken v1.0.24</span>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#d1d5db',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
              >
                <span style={{ color: showExplanation ? '#8B5CF6' : '#9ca3af' }}>Xem giải thích tiếng Việt</span>
                {showExplanation ?
                  <ToggleRight style={{ color: '#8B5CF6' }} size={24} /> :
                  <ToggleLeft style={{ color: '#6b7280' }} size={24} />
                }
              </button>
            </div>
          </div>

          {/* Decorative Elements behind code */}
          <div style={{
            position: 'absolute',
            zIndex: -10,
            right: '-2.5rem',
            bottom: '-2.5rem',
            width: '6rem',
            height: '6rem',
            background: 'linear-gradient(to bottom right, #8B5CF6, transparent)',
            borderRadius: '50%',
            opacity: 0.2,
            filter: 'blur(3rem)'
          }} />
        </motion.div>

      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 640px) {
          .hero-buttons {
            flex-direction: row !important;
          }
        }
        @media (min-width: 768px) {
          section {
            padding-top: 12rem !important;
            padding-bottom: 8rem !important;
          }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
