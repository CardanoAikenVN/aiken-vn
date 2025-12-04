import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Github, MessageCircle } from 'lucide-react';
import { useTranslations } from './translations';

const Footer: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '3rem 0'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem'
      }} className="footer-content">

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
           <div style={{
             width: '1.5rem',
             height: '1.5rem',
             borderRadius: '0.25rem',
             background: 'linear-gradient(to bottom right, #8B5CF6, #3B82F6)',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             fontWeight: 700,
             color: 'white',
             fontSize: '0.75rem'
           }}>
            A
          </div>
          <span style={{
            fontWeight: 700,
            color: '#e5e5e5'
          }}>Aiken VN</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1.5rem',
          fontSize: '0.875rem',
          color: '#6b7280',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
            <a href="#" style={{
              color: '#6b7280',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >{t.footer.documentation}</a>
            <a href="#" style={{
              color: '#6b7280',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >{t.footer.license}</a>
            <a href="#" style={{
              color: '#6b7280',
              textDecoration: 'none',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >{t.footer.privacy}</a>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{
              color: '#6b7280',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
                <Github size={20} />
            </a>
            <a href="#" style={{
              color: '#6b7280',
              transition: 'color 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
            >
                <MessageCircle size={20} />
            </a>
        </div>
      </div>
      <div style={{
        textAlign: 'center',
        marginTop: '2rem',
        fontSize: '0.75rem',
        color: '#374151'
      }}>
        &copy; {new Date().getFullYear()} {t.footer.copyright}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-content {
            flex-direction: row !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
