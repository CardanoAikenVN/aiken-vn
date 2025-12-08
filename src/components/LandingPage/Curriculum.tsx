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
    <section id="curriculum" className="py-32 border-y border-retro-border bg-retro-bg-secondary">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.curriculum.sectionTitle}</h2>
          <p className="text-retro-text-muted">{t.curriculum.sectionDescription}</p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden md:flex relative items-center justify-between px-10">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-retro-color-cyan -z-10 -translate-y-1/2" />

          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="relative cursor-pointer"
              onHoverStart={() => setActiveStep(step.id)}
              onHoverEnd={() => setActiveStep(null)}
              whileHover={{ y: -5 }}
            >
              {/* Node Circle */}
              <div
                className={`w-12 h-12 rounded border-2 flex items-center justify-center font-bold text-sm z-10 transition-all ${
                  activeStep === step.id
                    ? 'border-retro-color-cyan bg-retro-color-cyan text-retro-bg-card'
                    : 'border-retro-color-floor bg-retro-bg-card text-retro-bg-card'
                }`}
                style={{ backgroundColor: activeStep === step.id ? '#5CE1E6' : '#13253A' }}
              >
                {step.id}
              </div>

              {/* Label */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center w-32">
                <h4
                  className={`font-semibold transition-colors ${
                    activeStep === step.id ? 'text-white' : 'text-retro-text-subtle'
                  }`}
                >
                  {step.title}
                </h4>
              </div>

              {/* Tooltip Popup */}
              <AnimatePresence>
                {activeStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 bg-retro-bg-tile border border-retro-border p-3 rounded-lg shadow-card text-center z-20"
                  >
                    <p className="text-xs text-gray-300">{step.description}</p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-retro-bg-tile border-r border-b border-retro-border" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile Flow (Vertical) */}
        <div className="flex md:hidden flex-col gap-8 relative pl-6 border-l-2 border-gray-800 ml-4">
          {steps.map((step) => (
            <div key={step.id} className="relative">
              <div className="absolute -left-[1.8125rem] top-0 w-8 h-8 rounded border-2 border-retro-color-cyan bg-retro-bg-card flex items-center justify-center text-xs text-retro-color-cyan">
                {step.id}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-retro-text-muted text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
