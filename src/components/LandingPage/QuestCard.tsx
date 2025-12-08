import React from 'react';
import { Quest } from '../types';
import { PixelButton } from './PixelComponents';
import { Check, Hammer, Coins, Gem, Wallet, FileCode, Anchor } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  // Helper to render title art based on section
  const renderTitleArt = () => {
    switch (quest.illustrationType) {
      case 'token': // Section 1: The Aiken Foundation
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-4xl md:text-6xl leading-tight text-[#B6F2B6] text-shadow-retro mb-4">AIKEN<br />FOUNDATION</div>
            <div className="absolute -bottom-4 right-0 flex gap-2">
              <div className="w-14 h-14 bg-[#B6F2B6] rounded-lg border-4 border-black pixel-shadow flex items-center justify-center text-black text-xl font-bold font-mono">{'{}'}</div>
              <div className="w-12 h-12 bg-white rounded-md border-4 border-black pixel-shadow flex items-center justify-center text-xs font-bold">CLI</div>
              <div className="w-14 h-14 bg-purple-400 rounded-md border-4 border-black pixel-shadow flex items-center justify-center text-white text-lg">λ</div>
            </div>
          </div>
        );
      case 'staking': // Section 2: Cardano Architecture
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-4xl md:text-6xl leading-tight text-[#C6A8FF] text-shadow-retro mb-4">CARDANO<br />ARCHITECTURE</div>
            <div className="absolute bottom-0 right-10 flex flex-col items-center">
              <div className="w-20 h-10 bg-[#C6A8FF] border-4 border-black mb-1 flex items-center justify-center text-xs font-bold">eUTxO</div>
              <div className="w-20 h-10 bg-blue-400 border-4 border-black mb-1 flex items-center justify-center text-xs font-bold">DATUM</div>
              <div className="w-20 h-10 bg-orange-400 border-4 border-black flex items-center justify-center text-xs font-bold">REDEEMER</div>
            </div>
          </div>
        );
      case 'vendor': // Section 3: Your First Validator
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-4xl md:text-6xl leading-tight text-[#FFD8A8] text-shadow-retro mb-4">FIRST<br />VALIDATOR</div>
            <div className="absolute -bottom-6 right-0 w-28 h-32 bg-gray-800 border-4 border-[#FFD8A8] rounded-lg flex flex-col items-center p-2">
              <div className="w-full h-4 bg-[#FFD8A8]/30 mb-1 rounded"></div>
              <div className="w-full h-4 bg-[#FFD8A8]/30 mb-1 rounded"></div>
              <div className="w-3/4 h-4 bg-[#FFD8A8]/30 rounded"></div>
              <div className="mt-auto text-[#B6F2B6] text-xs font-mono">✓ PASS</div>
            </div>
          </div>
        );
      case 'nft': // Section 4: Minting Tokens & NFTs
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-4xl md:text-6xl leading-tight text-[#FFF79A] text-shadow-retro mb-4">MINTING<br />TOKENS</div>
            <div className="absolute -bottom-4 right-0 flex gap-2">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-black pixel-shadow flex items-center justify-center text-black text-2xl">🪙</div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg border-4 border-black pixel-shadow flex items-center justify-center text-2xl">🎨</div>
            </div>
          </div>
        );
      case 'lending': // Section 5: The Escrow Contract
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-4xl md:text-6xl leading-tight text-[#B6F2B6] text-shadow-retro mb-4">ESCROW<br />CONTRACT</div>
            <div className="absolute bottom-0 right-10 flex items-end gap-2">
              <div className="w-12 h-16 bg-blue-500 border-4 border-black rounded-t-lg flex items-center justify-center text-white text-xs font-bold">BUY</div>
              <div className="w-14 h-20 bg-[#B6F2B6] border-4 border-black rounded-t-lg flex items-center justify-center text-black text-xs font-bold">🔒</div>
              <div className="w-12 h-16 bg-orange-500 border-4 border-black rounded-t-lg flex items-center justify-center text-white text-xs font-bold">SELL</div>
            </div>
          </div>
        );
      default:
        return <div className={`text-4xl md:text-5xl leading-tight ${quest.colorTheme} text-shadow-retro`} aria-hidden="true">{quest.title.toUpperCase()}</div>;
    }
  };

  const getIcon = () => {
    const iconProps = { className: "", "aria-hidden": "true" as const };
    switch (quest.illustrationType) {
      case 'token':
        iconProps.className = "text-[#B6F2B6]";
        return <Coins {...iconProps} />;
      case 'staking':
        iconProps.className = "text-[#C6A8FF]";
        return <Gem {...iconProps} />;
      case 'vendor':
        iconProps.className = "text-[#FFD8A8]";
        return <Hammer {...iconProps} />;
      case 'lending':
        iconProps.className = "text-[#FFF79A]";
        return <Anchor {...iconProps} />;
      case 'wallet':
        iconProps.className = "text-[#FFD8A8]";
        return <Wallet {...iconProps} />;
      case 'nft':
        iconProps.className = "text-[#B6F2B6]";
        return <FileCode {...iconProps} />;
      default: return <Check {...iconProps} />;
    }
  }

  return (
    <article className="relative py-16 md:py-24 group">
      {/* Timeline Node - positioned at left-1/3 to align with vertical line */}
      <div
        className="hidden md:flex absolute left-1/3 top-24 w-8 h-8 bg-[#066C78] border-4 border-white rounded-full z-20 items-center justify-center group-hover:scale-125 group-focus-within:scale-125 transition-transform -translate-x-1/2"
        aria-hidden="true"
        role="presentation"
      >
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>

      {/* Container for Left and Right sections */}
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        {/* Left: Content (takes 40% on desktop) */}
        <div className="w-full md:w-[40%] flex flex-col gap-6 items-start md:pr-12">
          <div>
            <span className="font-['Press_Start_2P'] text-xs opacity-90 mb-2 block" aria-label={`Section ${quest.number}`}>
              Section #{quest.number}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-['DM_Sans'] tracking-tight">
              {quest.title}
            </h3>
          </div>

          <p className="text-lg leading-relaxed opacity-90 font-light">
            {quest.description}
          </p>

          <a
            href={quest.link || `/docs/section-${quest.number}`}
            className="inline-block focus:outline-none focus:ring-4 focus:ring-[#B6F2B6] focus:ring-offset-2 focus:ring-offset-[#8f3aff] rounded-lg"
            aria-label={`Bắt đầu ${quest.title} - Section ${quest.number}`}
          >
            <PixelButton>
              <span className="flex items-center gap-2">
                {getIcon()}
                <span>BẮT ĐẦU SECTION {quest.number}</span>
              </span>
            </PixelButton>
          </a>
        </div>

        {/* Right: Illustration (takes 60% on desktop) */}
        <div className="w-full md:w-[60%] flex justify-center md:justify-start items-center relative min-h-[300px] md:pl-12">
          {/* Decorative Background Blob for Art */}
          <div className={`absolute w-64 h-64 rounded-full opacity-10 blur-3xl ${quest.colorTheme.replace('text-', 'bg-')}`} aria-hidden="true"></div>
          <div
            className="transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105 group-focus-within:-translate-y-2 group-focus-within:scale-105"
            role="img"
            aria-label={quest.imageAlt}
          >
            {renderTitleArt()}
          </div>
        </div>
      </div>
    </article>
  );
};

export default QuestCard;
