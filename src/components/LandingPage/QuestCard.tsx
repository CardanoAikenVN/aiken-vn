import React from 'react';
import { Quest } from '../types';
import { PixelButton } from './PixelComponents';
import { Check, Hammer, Coins, Gem, Wallet, FileCode, Anchor } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  // Helper to render title art based on type (simulated with CSS/Text)
  const renderTitleArt = () => {
    switch (quest.illustrationType) {
      case 'token':
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-5xl md:text-7xl leading-tight text-[#B6F2B6] text-shadow-retro mb-4">TOKEN<br />IZATION</div>
            <div className="absolute -bottom-4 right-0 flex gap-2">
              <div className="w-16 h-16 bg-yellow-400 rounded-full border-4 border-black pixel-shadow flex items-center justify-center text-black text-2xl font-bold">$</div>
              <div className="w-12 h-12 bg-white rounded-md border-4 border-black pixel-shadow"></div>
              <div className="w-14 h-14 bg-orange-300 rounded-md border-4 border-black pixel-shadow"></div>
            </div>
          </div>
        );
      case 'staking':
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-5xl md:text-7xl leading-tight text-[#C6A8FF] text-shadow-retro mb-4">STAKING<br />APP</div>
            <div className="absolute bottom-0 right-10 flex flex-col items-center">
              <div className="w-20 h-12 bg-yellow-400 border-4 border-black mb-1"></div>
              <div className="w-20 h-12 bg-yellow-400 border-4 border-black mb-1"></div>
              <div className="w-20 h-12 bg-yellow-400 border-4 border-black"></div>
            </div>
          </div>
        );
      case 'vendor':
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-5xl md:text-7xl leading-tight text-[#FFD8A8] text-shadow-retro mb-4">TOKEN<br />VENDOR</div>
            <div className="absolute -bottom-6 right-0 w-24 h-32 bg-gray-300 border-4 border-black flex flex-col items-center p-2">
              <div className="w-full h-16 bg-blue-300 border-2 border-black mb-2"></div>
              <div className="w-full h-4 bg-black/20"></div>
            </div>
          </div>
        );
      case 'lending':
        return (
          <div className="relative" aria-hidden="true">
            <div className="text-5xl md:text-7xl leading-tight text-[#FFF79A] text-shadow-retro mb-4">OVER<br />LENDING</div>
            <div className="absolute bottom-0 right-20 text-6xl" role="img" aria-label="Cá">🐠</div>
          </div>
        );
      default:
        return <div className={`text-5xl md:text-6xl leading-tight ${quest.colorTheme} text-shadow-retro`} aria-hidden="true">{quest.title.toUpperCase()}</div>;
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

  const getIconLabel = () => {
    switch (quest.illustrationType) {
      case 'token': return 'Token';
      case 'staking': return 'Staking';
      case 'vendor': return 'Vendor';
      case 'lending': return 'Lending';
      case 'wallet': return 'Ví';
      case 'nft': return 'NFT';
      default: return 'Challenge';
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
            <span className="font-['Press_Start_2P'] text-xs opacity-90 mb-2 block" aria-label={`Challenge số ${quest.number}`}>
              Challenge #{quest.number}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-['DM_Sans'] tracking-tight">
              {quest.title}
            </h3>
          </div>

          <p className="text-lg leading-relaxed opacity-90 font-light">
            {quest.description}
          </p>

          <a
            href={`#quest-${quest.id}`}
            className="inline-block focus:outline-none focus:ring-4 focus:ring-[#B6F2B6] focus:ring-offset-2 focus:ring-offset-[#8f3aff] rounded-lg"
            aria-label={`Bắt đầu ${quest.title} - Challenge ${quest.number}`}
          >
            <PixelButton>
              <span className="flex items-center gap-2">
                {getIcon()}
                <span>BẮT ĐẦU {getIconLabel().toUpperCase()}</span>
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
