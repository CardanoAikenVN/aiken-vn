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
  /* Pixel Button - Dark Theme: Transparent with Solid Border & Invert Hover */
  /* Updated for Ver 1.0: Arial Font, 4px-6px radius (rounded-md) */
  const bgClass = primary
    ? 'bg-transparent border-2 border-[#5CE1E6] text-white hover:bg-[#5CE1E6] hover:text-[#0F1B2A] transition-colors rounded-md'
    : 'bg-[#5CE1E6] border-2 border-[#5CE1E6] text-[#0F1B2A] hover:bg-transparent hover:text-[#5CE1E6] transition-colors rounded-md';

  return (
    <span
      className={`inline-block px-6 py-3 font-bold font-sans text-xs sm:text-sm uppercase active:scale-95 focus:outline-none ${bgClass} ${className}`}
      role="button"
      tabIndex={-1}
    >
      {children}
    </span>
  );
};

export const PixelIcon: React.FC<{ type: 'key' | 'book' | 'swords' }> = ({ type }) => {
  // Simple SVG approximations of pixel icons
  if (type === 'key') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M10 2H14V6H18V10H22V14H18V18H14V14H10V18H6V22H2V18H6V14H2V10H6V6H10V2ZM10 6H6V10H2V14H6V18H10V14H14V10H10V6Z" fill="#FFF79A" />
      </svg>
    );
  }
  return <div className="w-6 h-6 bg-white/20" aria-hidden="true"></div>;
};
