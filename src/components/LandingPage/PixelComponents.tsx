import React from 'react';

export const Cloud: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute opacity-80 ${className}`} aria-hidden="true" role="presentation">
    <div className="bg-[#8FA3B2] w-24 h-8 relative pixel-shadow">
      <div className="absolute -top-6 left-4 w-12 h-6 bg-[#8FA3B2]"></div>
      <div className="absolute -top-4 left-10 w-10 h-10 bg-[#8FA3B2]"></div>
    </div>
  </div>
);

export const PixelButton: React.FC<{
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
}> = ({ children, primary = false, className = '' }) => {
  const bgClass = primary
    ? 'bg-transparent border-2 border-retro-color-cyan text-white hover:bg-retro-color-cyan hover:text-retro-bg-primary transition-colors rounded-md'
    : 'bg-retro-color-cyan border-2 border-retro-color-cyan text-retro-bg-primary hover:bg-transparent hover:text-retro-color-cyan transition-colors rounded-md';

  return (
    <button
      type="button"
      className={`inline-block px-6 py-3 font-bold font-sans text-xs sm:text-sm uppercase active:scale-95 focus:outline-none focus:ring-2 focus:ring-retro-color-cyan focus:ring-offset-2 focus:ring-offset-retro-bg-primary ${bgClass} ${className}`}
    >
      {children}
    </button>
  );
};
