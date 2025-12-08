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
    <section className="py-32 bg-transparent">
      <div className="max-w-content mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-retro-bg-card rounded-md border border-retro-border overflow-hidden hover:border-retro-color-cyan transition-colors"
            >
              <div className="h-full bg-transparent rounded-md p-8 relative z-10">
                <div className="absolute top-0 right-0 p-16 opacity-10 group-hover:opacity-20 transition-opacity">
                  <feature.icon size={80} />
                </div>

                <div className="mb-4 inline-flex p-3 rounded bg-retro-color-cyan/10 text-retro-color-cyan group-hover:bg-retro-color-cyan group-hover:text-retro-bg-primary transition-colors">
                  <feature.icon size={24} />
                </div>

                {feature.badge && (
                  <span className="absolute top-4 right-4 text-[0.625rem] font-bold uppercase tracking-wide bg-retro-color-cyan text-retro-bg-primary px-2 py-1 rounded">
                    {feature.badge}
                  </span>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-retro-text-muted text-sm leading-7">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
