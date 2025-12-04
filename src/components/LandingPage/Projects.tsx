import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Coins, ShieldCheck, Scale, ArrowUpRight } from 'lucide-react';
import { useTranslations } from './translations';

const Projects: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);
  return (
    <section style={{
      padding: '6rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        <div style={{
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '1rem'
        }} className="projects-header">
            <div>
                <h2 style={{
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>{t.projects.sectionTitle}</h2>
                <p style={{ color: '#9ca3af' }}>{t.projects.sectionDescription}</p>
            </div>
            <a href="#" style={{
              color: '#8B5CF6',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#8B5CF6'}
            >
                {t.projects.viewGithub} <ArrowUpRight size={16}/>
            </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          gridAutoRows: '250px'
        }} className="projects-grid">
            {/* Project 1: Large Tile */}
            <div style={{
              background: '#151515',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s'
            }}
            className="project-card project-1"
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '8rem',
                  background: 'rgba(139, 92, 246, 0.05)',
                  filter: 'blur(80px)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                  transition: 'background 0.3s'
                }} className="project-glow"></div>
                <div style={{
                  position: 'relative',
                  zIndex: 10,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{
                          width: '3rem',
                          height: '3rem',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '1rem',
                          color: '#c084fc'
                        }}>
                            <Coins size={24} />
                        </div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: 'white',
                          marginBottom: '0.5rem'
                        }}>{t.projects.project1Title}</h3>
                        <p style={{
                          color: '#9ca3af',
                          maxWidth: '32rem'
                        }}>{t.projects.project1Description}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          background: 'rgba(255,255,255,0.05)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          color: '#6b7280'
                        }}>#minting</span>
                        <span style={{
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          background: 'rgba(255,255,255,0.05)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          color: '#6b7280'
                        }}>#policy_id</span>
                    </div>
                </div>
            </div>

            {/* Project 2 */}
            <div style={{
              background: '#151515',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '1rem',
              padding: '2rem',
              position: 'relative',
              transition: 'border-color 0.3s'
            }}
            className="project-card"
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
            >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: '#60a5fa'
                }}>
                    <ShieldCheck size={24} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>{t.projects.project2Title}</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af'
                }}>{t.projects.project2Description}</p>
            </div>

             {/* Project 3 */}
             <div style={{
               background: '#151515',
               border: '1px solid rgba(255,255,255,0.05)',
               borderRadius: '1rem',
               padding: '2rem',
               position: 'relative',
               transition: 'border-color 0.3s'
             }}
             className="project-card"
             onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'}
             onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
             >
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: '#34d399'
                }}>
                    <Scale size={24} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: '0.5rem'
                }}>{t.projects.project3Title}</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#9ca3af'
                }}>{t.projects.project3Description}</p>
            </div>

             {/* Project 4: CTA Tile */}
             <div style={{
               background: 'linear-gradient(to right, #8B5CF6, #3B82F6)',
               borderRadius: '1rem',
               padding: '1px',
               position: 'relative'
             }} className="project-cta">
                <div style={{
                  background: '#0a0a0a',
                  height: '100%',
                  width: '100%',
                  borderRadius: 'calc(1rem - 1px)',
                  padding: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  gap: '1rem'
                }} className="cta-content">
                    <div>
                        <h3 style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: 'white'
                        }}>{t.projects.ctaTitle}</h3>
                        <p style={{ color: '#9ca3af' }}>{t.projects.ctaDescription}</p>
                    </div>
                    <button style={{
                      background: 'white',
                      color: 'black',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        {t.projects.ctaButton}
                    </button>
                </div>
             </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .projects-header {
            flex-direction: row !important;
            align-items: flex-end !important;
          }
          .projects-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .project-1 {
            grid-column: span 2 !important;
          }
          .project-cta {
            grid-column: span 2 !important;
          }
          .cta-content {
            flex-direction: row !important;
          }
        }
        .project-card:hover .project-glow {
          background: rgba(139, 92, 246, 0.1) !important;
        }
      `}</style>
    </section>
  );
};

export default Projects;
