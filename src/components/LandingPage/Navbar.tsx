import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { Menu, X, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Giáo trình', href: '#curriculum' },
    { label: 'Tài liệu', href: '/docs/' },
    { label: 'Cộng đồng', href: '#community' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-retro-border bg-retro-bg-dark/80 backdrop-blur-md py-3'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="max-w-content mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="img/logo.jpeg"
            alt="Vietnamese Aiken Logo"
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-xl font-bold tracking-tight">Aiken VN</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-retro-text-muted hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-retro-text-muted border border-retro-border px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors"
          >
            <Github size={14} />
            <span>1.2k</span>
          </a>
          <Link to="/docs/nen-tang-aiken" className="no-underline">
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold shadow-glow hover:bg-gray-200 transition-colors">
              Bắt đầu học
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="block md:hidden text-gray-300 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#121212] border-b border-retro-border overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 font-medium hover:text-white transition-colors no-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-t border-retro-border my-2" />
              <a
                href="#"
                className="flex items-center gap-2 text-retro-text-muted no-underline"
              >
                <Github size={16} /> GitHub Repo
              </a>
              <Link to="/docs/nen-tang-aiken" className="no-underline w-full">
                <button className="bg-accent-purple w-full py-3 rounded-lg text-white font-semibold mt-2">
                  Bắt đầu học
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
