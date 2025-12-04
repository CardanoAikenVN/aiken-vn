import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useTranslations } from './translations';

const Community: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);
  return (
    <section id="community" style={{
      padding: '5rem 0',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 700,
          marginBottom: '3rem'
        }}>{t.community.sectionTitle}</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '2rem',
          marginBottom: '4rem'
        }} className="community-stats">
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  background: 'linear-gradient(to bottom, white, #4b5563)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  marginBottom: '0.5rem'
                }}>{t.community.stat1Value}</h3>
                <p style={{ color: '#9ca3af' }}>{t.community.stat1Label}</p>
            </div>
            <div style={{
              padding: '1.5rem',
              borderLeft: 'none',
              borderRight: 'none'
            }} className="stat-middle">
                 <h3 style={{
                   fontSize: '3rem',
                   fontWeight: 700,
                   background: 'linear-gradient(to bottom, white, #4b5563)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   backgroundClip: 'text',
                   marginBottom: '0.5rem'
                 }}>{t.community.stat2Value}</h3>
                <p style={{ color: '#9ca3af' }}>{t.community.stat2Label}</p>
            </div>
            <div style={{ padding: '1.5rem' }}>
                 <h3 style={{
                   fontSize: '3rem',
                   fontWeight: 700,
                   background: 'linear-gradient(to bottom, white, #4b5563)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                   backgroundClip: 'text',
                   marginBottom: '0.5rem'
                 }}>{t.community.stat3Value}</h3>
                <p style={{ color: '#9ca3af' }}>{t.community.stat3Label}</p>
            </div>
        </div>

        <div style={{
          background: '#1E1E1E',
          borderRadius: '1rem',
          padding: '2rem',
          display: 'inline-block',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
            <p style={{
              color: '#d1d5db',
              marginBottom: '1.5rem',
              fontWeight: 500
            }}>{t.community.trustedBy}</p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '-0.75rem'
            }}>
                {[1,2,3,4,5].map((i) => (
                    <img
                        key={i}
                        src={`https://picsum.photos/40/40?random=${i}`}
                        alt="Contributor"
                        style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          borderRadius: '50%',
                          border: '2px solid #1E1E1E'
                        }}
                    />
                ))}
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  border: '2px solid #1E1E1E',
                  background: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'white'
                }}>
                    +40
                </div>
            </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .community-stats {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .stat-middle {
            border-left: 1px solid rgba(255,255,255,0.05) !important;
            border-right: 1px solid rgba(255,255,255,0.05) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Community;
