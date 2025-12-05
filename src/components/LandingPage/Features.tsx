import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import { BookOpen, Layers, Zap, Github } from 'lucide-react';
import { FeatureItem } from './types';
import { useTranslations } from './translations';

const Features: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);

  const features: FeatureItem[] = [
    {
      title: t.features.title1,
      description: t.features.description1,
      icon: Zap,
      badge: t.features.badge1
    },
    {
      title: t.features.title2,
      description: t.features.description2,
      icon: Layers,
    },
    {
      title: t.features.title3,
      description: t.features.description3,
      icon: BookOpen,
    },
    {
      title: t.features.title4,
      description: t.features.description4,
      icon: Github,
      badge: t.features.badge4
    }
  ];
  return (
    <section style={{
      padding: '8rem 0',
      background: 'transparent'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem'
        }} className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              style={{
                position: 'relative',
                background: '#13253A',
                padding: '0',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden'
              }}
              className="feature-card-wrapper"
            >

              <div style={{
                height: '100%',
                background: 'transparent',
                borderRadius: '6px',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '4rem',
                  opacity: 0.1,
                  transition: 'opacity 0.3s'
                }} className="feature-bg-icon">
                  <feature.icon size={80} />
                </div>

                <div style={{
                  marginBottom: '1rem',
                  display: 'inline-flex',
                  padding: '0.75rem',
                  borderRadius: '4px',
                  background: 'rgba(92, 225, 230, 0.1)',
                  color: '#5CE1E6',
                  transition: 'all 0.3s'
                }} className="feature-icon">
                  <feature.icon size={24} />
                </div>

                {feature.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: '#5CE1E6',
                    color: '#0F1B2A',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>
                    {feature.badge}
                  </span>
                )}

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>{feature.title}</h3>
                <p style={{
                  color: '#9ca3af',
                  fontSize: '0.875rem',
                  lineHeight: 1.75
                }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        .feature-card-wrapper:hover {
          border-color: #5CE1E6;
        }
        .feature-card-wrapper:hover .feature-icon {
          background: #5CE1E6;
          color: #0F1B2A;
        }
      `}</style>
    </section>
  );
};

export default Features;
