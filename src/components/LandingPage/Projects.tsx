import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Coins, ShieldCheck, Scale, ArrowUpRight } from 'lucide-react';
import { useTranslations } from './translations';

const Projects: React.FC = () => {
  const { i18n } = useDocusaurusContext();
  const t = useTranslations(i18n.currentLocale);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{t.projects.sectionTitle}</h2>
            <p className="text-retro-text-muted">{t.projects.sectionDescription}</p>
          </div>
          <a
            href="#"
            className="text-accent-purple hover:text-white flex items-center gap-1 transition-colors"
          >
            {t.projects.viewGithub} <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Project 1: Large Tile */}
          <div className="group md:col-span-2 bg-retro-bg-tile border border-retro-border rounded-2xl p-8 relative overflow-hidden hover:border-accent-purple/50 transition-colors">
            <div className="absolute top-0 right-0 p-32 bg-accent-purple/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-accent-purple/10 transition-colors" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-accent-purple-light">
                  <Coins size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.projects.project1Title}</h3>
                <p className="text-retro-text-muted max-w-lg">{t.projects.project1Description}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-retro-text-subtle">#minting</span>
                <span className="text-xs font-mono bg-white/5 px-2 py-1 rounded text-retro-text-subtle">#policy_id</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group bg-retro-bg-tile border border-retro-border rounded-2xl p-8 relative hover:border-accent-blue/50 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-accent-blue-light">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.projects.project2Title}</h3>
            <p className="text-sm text-retro-text-muted">{t.projects.project2Description}</p>
          </div>

          {/* Project 3 */}
          <div className="group bg-retro-bg-tile border border-retro-border rounded-2xl p-8 relative hover:border-accent-green/50 transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4 text-accent-green-light">
              <Scale size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t.projects.project3Title}</h3>
            <p className="text-sm text-retro-text-muted">{t.projects.project3Description}</p>
          </div>

          {/* Project 4: CTA Tile */}
          <div className="md:col-span-2 bg-gradient-to-r from-accent-purple to-accent-blue rounded-2xl p-[1px] relative">
            <div className="bg-retro-bg-dark h-full w-full rounded-[calc(1rem-1px)] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white">{t.projects.ctaTitle}</h3>
                <p className="text-retro-text-muted">{t.projects.ctaDescription}</p>
              </div>
              <button className="bg-white text-black px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                {t.projects.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
