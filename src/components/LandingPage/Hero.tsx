import React from 'react';
import { Cloud, PixelButton } from './PixelComponents';

const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-40"
      aria-labelledby="hero-heading"
    >
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      {/* Background Clouds */}
      <Cloud className="top-20 left-10 animate-cloud-slow delay-0 scale-75" aria-hidden="true" />
      <Cloud className="top-40 right-20 animate-cloud-medium delay-1000 scale-100" aria-hidden="true" />
      <Cloud className="top-10 left-1/2 animate-cloud-fast delay-500 scale-50 opacity-50" aria-hidden="true" />
      <Cloud className="bottom-40 left-20 animate-cloud-medium delay-2000 scale-90" aria-hidden="true" />
      <Cloud className="top-32 right-1/4 animate-cloud-slow delay-3000 scale-110" aria-hidden="true" />

      {/* Main Content */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-retro-text-body font-sans text-sm md:text-lg tracking-wide uppercase font-bold opacity-90 max-w-2xl">
            Chương trình học <span className="text-[#A3DCE2] border-b-2 border-[#5CE1E6]">Tiếng Việt</span> đầu tiên về Aiken - ngôn ngữ smart contract của Cardano
          </p>
        </div>

        <h1
          id="hero-heading"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-center leading-[1.2] text-shadow-retro text-white mt-4 mb-8 font-black tracking-widest font-sans"
        >
          <span className="block">VIETNAMESE</span>
          <span className="block text-[#5CE1E6]">AIKEN</span>
        </h1>

        <div className="relative group">
          {/* CSS-based Pixel Characters - Decorative */}
          <div
            className="absolute -left-28 md:-left-32 bottom-0 hidden md:block animate-bounce"
            style={{ animationDuration: '0.8s' }}
            aria-hidden="true"
            role="presentation"
          >
            <div className="w-12 h-16 relative pixel-character-left"></div>
          </div>
          <div
            className="absolute -right-28 md:-right-32 bottom-0 hidden md:block animate-bounce"
            style={{ animationDuration: '0.9s' }}
            aria-hidden="true"
            role="presentation"
          >
            <div className="w-12 h-16 relative pixel-character-right"></div>
          </div>

          <a
            href="/docs/moi-truong"
            className="inline-block focus:outline-none focus:ring-4 focus:ring-[#5CE1E6] focus:ring-offset-2 focus:ring-offset-[#0F1B2A] rounded-md"
            aria-label="Bắt đầu học Aiken ngay bây giờ"
          >
            <PixelButton primary className="text-sm md:text-lg lg:text-xl px-8 md:px-10 py-3 md:py-4 border-2 rounded hover:scale-105 transition-transform font-bold">
              Bắt Đầu Học
            </PixelButton>
          </a>
        </div>
      </div>

      {/* Ground/Platform decoration */}
      <div className="absolute bottom-0 w-full h-16 bg-[#1A2738] border-t-4 border-[#5CE1E6]" aria-hidden="true" role="presentation">
        {/* Grass tufts - Swapped to ground accents */}
        <div className="absolute -top-3 left-10 w-4 h-4 bg-[#5CE1E6] opacity-20" aria-hidden="true"></div>
        <div className="absolute -top-2 left-14 w-2 h-2 bg-[#5CE1E6] opacity-20" aria-hidden="true"></div>
        <div className="absolute -top-3 right-20 w-4 h-4 bg-[#5CE1E6] opacity-20" aria-hidden="true"></div>
        <div className="absolute -top-3 left-1/3 w-6 h-3 bg-[#5CE1E6] opacity-20" aria-hidden="true"></div>
        <div className="absolute -top-3 right-1/3 w-5 h-3 bg-[#5CE1E6] opacity-20" aria-hidden="true"></div>

        <div className="w-full h-full flex justify-around items-end opacity-20" aria-hidden="true">
          {/* Simple repeating pattern */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-[#0F1B2A] mx-2 mb-2" aria-hidden="true"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
