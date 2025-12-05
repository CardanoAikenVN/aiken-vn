import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CurriculumNode } from './types';
import { useTranslations } from './translations';

const Curriculum: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);

  const steps: CurriculumNode[] = [
    { id: '01', title: t.curriculum.step1Title, description: t.curriculum.step1Description },
    { id: '02', title: t.curriculum.step2Title, description: t.curriculum.step2Description },
    { id: '03', title: t.curriculum.step3Title, description: t.curriculum.step3Description },
    { id: '04', title: t.curriculum.step4Title, description: t.curriculum.step4Description },
    { id: '05', title: t.curriculum.step5Title, description: t.curriculum.step5Description },
  ];

  return (
    <section id="curriculum" style={{
      padding: '8rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      background: 'var(--bg-secondary)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: 'clamp(1.875rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>{t.curriculum.sectionTitle}</h2>
          <p style={{ color: '#9ca3af' }}>{t.curriculum.sectionDescription}</p>
        </div>

        {/* Desktop Flow */}
        <div style={{
          position: 'relative',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2.5rem'
        }} className="curriculum-desktop">
          {/* Connector Line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '2px', // Vertical line for desktop flow usually requires width not height if horizontal... wait, this is horizontal.
            height: '2px',
            background: '#5CE1E6',
            zIndex: -10,
            transform: 'translateY(-50%)'
          }}></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              style={{
                position: 'relative',
                cursor: 'pointer'
              }}
              onHoverStart={() => setActiveStep(step.id)}
              onHoverEnd={() => setActiveStep(null)}
              whileHover={{ y: -5 }}
            >
              {/* Node Circle */}
              <div style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '4px',
                border: activeStep === step.id ? '2px solid #5CE1E6' : '2px solid #1A2738',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem',
                background: '#0a0a0a',
                zIndex: 10,
                transition: 'all 0.3s',
                color: activeStep === step.id ? '#1E2A3A' : '#1E2A3A',
                backgroundColor: activeStep === step.id ? '#5CE1E6' : '#13253A'
              }}>
                {step.id}
              </div>

              {/* Label */}
              <div style={{
                position: 'absolute',
                top: '4rem',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '8rem'
              }}>
                <h4 style={{
                  fontWeight: 600,
                  transition: 'color 0.3s',
                  color: activeStep === step.id ? 'white' : '#6b7280'
                }}>{step.title}</h4>
              </div>

              {/* Tooltip Popup */}
              <AnimatePresence>
                {activeStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '1rem',
                      width: '12rem',
                      background: '#1E1E1E',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                      textAlign: 'center',
                      zIndex: 20
                    }}
                  >
                    <p style={{ fontSize: '0.75rem', color: '#d1d5db' }}>{step.description}</p>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%) translateY(50%) rotate(45deg)',
                      width: '0.75rem',
                      height: '0.75rem',
                      background: '#1E1E1E',
                      borderRight: '1px solid rgba(255,255,255,0.1)',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile Flow (Vertical) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          position: 'relative',
          paddingLeft: '1.5rem',
          borderLeft: '2px solid #1f2937',
          marginLeft: '1rem'
        }} className="curriculum-mobile">
          {steps.map((step) => (
            <div key={step.id} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-1.8125rem',
                top: 0,
                width: '2rem',
                height: '2rem',
                borderRadius: '4px',
                border: '2px solid #5CE1E6',
                background: '#13253A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                color: '#5CE1E6'
              }}>
                {step.id}
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.25rem'
                }}>{step.title}</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.875rem'
                }}>{step.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .curriculum-desktop {
            display: flex !important;
          }
          .curriculum-mobile {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Curriculum;
