import React from 'react';
import Hero from './Hero';
import QuestTimeline from './QuestTimeline';
import OnboardingTrain from './OnboardingTrain';
import Footer from './Footer';
import Starfield from './Starfield';
import { QUESTS } from './constants';

const LandingPage: React.FC = () => {
  return (
    <div lang="vi" className="landing-page-wrapper min-h-screen flex flex-col font-sans selection:bg-[#B6F2B6] selection:text-[#8f3aff]">
      <Starfield />
      {/* Skip Navigation Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-[#8f3aff] focus:px-6 focus:py-3 focus:rounded-md focus:font-bold focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#B6F2B6]"
      >
        Bỏ qua điều hướng
      </a>

      {/* Navigation Header */}
      <nav className="w-full absolute top-0 left-0 p-4 flex justify-between items-center z-50" aria-label="Điều hướng chính">
        <a
          href="/"
          className="text-white font-['Press_Start_2P'] text-xs md:text-sm hover:text-[#B6F2B6] transition-colors focus:outline-none focus:ring-4 focus:ring-[#B6F2B6] focus:ring-offset-2 focus:ring-offset-[#8f3aff] rounded-sm px-2 py-1"
          aria-label="Trang chủ Aiken VN"
        >
          AIKEN VN
        </a>
        <a
          href="/docs/nen-tang-aiken"
          className="border-2 border-white text-white px-4 md:px-6 py-2 rounded-full hover:bg-white hover:text-[#8f3aff] transition-all font-bold text-xs md:text-sm hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#B6F2B6] focus:ring-offset-2 focus:ring-offset-[#8f3aff]"
          aria-label="Xem tài liệu học tập"
        >
          Tài Liệu
        </a>
      </nav>

      <Hero />

      <main id="main-content" className="flex-grow">
        {/* Learning Path Sections */}
        <section aria-labelledby="learning-path-heading">
          <h2 id="learning-path-heading" className="sr-only">Lộ trình học Aiken</h2>
          <QuestTimeline quests={QUESTS} />
        </section>

        {/* Interlude - Train animation */}
        <OnboardingTrain />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
