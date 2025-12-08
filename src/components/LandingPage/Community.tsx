import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useTranslations } from './translations';

const Community: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);

  const stats = [
    { value: t.community.stat1Value, label: t.community.stat1Label },
    { value: t.community.stat2Value, label: t.community.stat2Label },
    { value: t.community.stat3Value, label: t.community.stat3Label },
  ];

  return (
    <section id="community" className="py-20 border-t border-retro-border">
      <div className="max-w-content mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">{t.community.sectionTitle}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 ${index === 1 ? 'md:border-x md:border-retro-border' : ''}`}
            >
              <h3 className="text-5xl font-bold mb-2 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
                {stat.value}
              </h3>
              <p className="text-retro-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="inline-block bg-retro-bg-tile rounded-2xl p-8 border border-retro-border">
          <p className="text-gray-300 mb-6 font-medium">{t.community.trustedBy}</p>
          <div className="flex justify-center items-center -ml-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://picsum.photos/40/40?random=${i}`}
                alt={`Contributor ${i}`}
                className="w-10 h-10 rounded-full border-2 border-retro-bg-tile -ml-2 first:ml-0"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-retro-bg-tile bg-gray-700 flex items-center justify-center text-xs text-white -ml-2">
              +40
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
