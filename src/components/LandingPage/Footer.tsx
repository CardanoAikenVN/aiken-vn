import React from 'react';
import { PixelButton } from './PixelComponents';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0F1B2A] text-white pt-20 border-t border-[#1A2738]" role="contentinfo">

      {/* Dashed line connector from top */}
      <div className="container mx-auto relative h-10 mb-10 hidden md:block" aria-hidden="true">
        <div className="absolute left-[calc(1rem+43px)] -top-24 h-24 w-1 border-l-4 border-dashed border-[#AEC6CF]"></div>
        <div className="absolute left-[calc(1rem+40px)] bottom-0 w-4 h-4 border-4 border-white bg-[#5CE1E6]"></div>
        <div className="absolute left-[calc(1rem+42px)] bottom-2 w-[50%] h-1 border-t-4 border-dashed border-[#AEC6CF]"></div>
        <div className="absolute left-[50%] top-2 w-4 h-4 border-4 border-white bg-[#5CE1E6]"></div>
        <div className="absolute left-[calc(50%+2px)] top-4 h-10 w-1 border-l-4 border-dashed border-[#AEC6CF]"></div>
      </div>


      <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 pb-32">
        {/* Aiken Learning Path */}
        <section className="flex flex-col items-start gap-6 relative p-8 bg-[#13253A] border-2 border-white/10 hover:border-white/30 transition-all rounded-md">
          <h3 className="text-2xl font-bold">Lộ Trình Học Aiken</h3>
          <p className="opacity-90 text-sm leading-relaxed">
            Khám phá các bài học từ cơ bản đến nâng cao về ngôn ngữ smart contract Aiken trên Cardano.
          </p>
          <a
            href="/docs/moi-truong"
            className="inline-block focus:outline-none focus:ring-4 focus:ring-[#5CE1E6] focus:ring-offset-2 focus:ring-offset-[#243447] mt-4"
            aria-label="Bắt đầu học Aiken"
          >
            <PixelButton>BẮT ĐẦU</PixelButton>
          </a>

          {/* Visual Placeholder for Tree */}
          <div className="absolute right-4 top-4 opacity-30" aria-hidden="true">
            <div className="flex flex-col items-center">
              <div className="w-2 h-8 bg-[#5CE1E6]"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 border-2 border-[#5CE1E6]"></div>
                <div className="w-8 h-8 border-2 border-[#5CE1E6]"></div>
              </div>
              <div className="w-1 h-8 bg-[#5CE1E6]"></div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section className="flex flex-col items-start gap-6 relative p-8 bg-[#13253A] border-2 border-white/10 hover:border-white/30 transition-all rounded-md">
          <h3 className="text-2xl font-bold">Cộng Đồng</h3>
          <p className="opacity-90 text-sm leading-relaxed">
            Tham gia cộng đồng Cardano Việt Nam để học hỏi, chia sẻ kinh nghiệm và xây dựng dự án cùng nhau.
          </p>
          <a
            href="https://t.me/CardanoVietnamOfficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block focus:outline-none focus:ring-4 focus:ring-[#5CE1E6] focus:ring-offset-2 focus:ring-offset-[#243447] mt-4"
            aria-label="Tham gia cộng đồng Cardano Việt Nam trên Telegram - Mở trong tab mới"
          >
            <PixelButton>THAM GIA</PixelButton>
          </a>

          {/* Visual Placeholder for Community */}
          <div className="absolute right-8 top-8 opacity-30" aria-hidden="true">
            <div className="flex gap-1">
              <div className="w-4 h-4 bg-[#C6A8FF] rounded-full"></div>
              <div className="w-4 h-4 bg-[#FFD8A8] rounded-full"></div>
            </div>
            <div className="flex gap-1 mt-1 justify-center">
              <div className="w-4 h-4 bg-[#B6F2B6] rounded-full"></div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <nav className="bg-[#0F1B2A] py-4 text-center text-xs font-medium font-sans flex flex-wrap justify-center gap-4 md:gap-6 px-4" aria-label="Liên kết footer">
        <a
          href="https://aiken-lang.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white opacity-90 hover:opacity-100 underline decoration-dashed focus:outline-none focus:ring-2 focus:ring-[#5CE1E6] focus:ring-offset-2 focus:ring-offset-[#1E2A3A] px-1"
          aria-label="Aiken Official - Mở trong tab mới"
        >
          Aiken Official
        </a>
        <span className="hidden md:inline opacity-70" aria-hidden="true">·</span>
        <a
          href="https://github.com/cardano-foundation"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white opacity-90 hover:opacity-100 underline decoration-dashed focus:outline-none focus:ring-2 focus:ring-[#5CE1E6] focus:ring-offset-2 focus:ring-offset-[#1E2A3A] px-1"
          aria-label="Cardano Foundation trên GitHub - Mở trong tab mới"
        >
          Cardano Foundation
        </a>
        <span className="hidden md:inline opacity-70" aria-hidden="true">·</span>
        <span className="opacity-90">Xây dựng bởi <span className="font-bold text-[#5CE1E6]">Cộng Đồng Cardano VN</span></span>
      </nav>

      {/* Accessibility: Removed non-functional toggle switch */}
      {/* If this needs to be functional, implement proper button with role="switch" and aria-checked */}
    </footer>
  );
};

export default Footer;
