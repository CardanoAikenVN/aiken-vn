/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'cloud-slow': 'cloud-move 60s linear infinite',
                'cloud-medium': 'cloud-move 40s linear infinite',
                'cloud-fast': 'cloud-move 25s linear infinite',
                'float': 'floating 4s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                'cloud-move': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100vw)' },
                },
                floating: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '.5' },
                }
            },
            colors: {
                primary: {
                    DEFAULT: '#8f3aff',
                    glow: '#b366ff',
                },
                retro: {
                    'bg-primary': '#0F1B2A',
                    'bg-secondary': '#112030',
                    'bg-card': '#13253A',
                    'bg-dark': '#0a0a0a',
                    'bg-tile': '#151515',
                    'color-cyan': '#5CE1E6',
                    'color-cyan-dark': '#2BBAC0',
                    'color-cyan-light': '#A3DCE2',
                    'color-floor': '#1A2738',
                    'text-heading': '#FFFFFF',
                    'text-body': '#DDE6ED',
                    'text-muted': '#9ca3af',
                    'text-subtle': '#6b7280',
                    'border': 'rgba(255,255,255,0.1)',
                    'border-hover': 'rgba(255,255,255,0.2)',
                },
                accent: {
                    purple: '#8B5CF6',
                    'purple-light': '#c084fc',
                    blue: '#3B82F6',
                    'blue-light': '#60a5fa',
                    green: '#10B981',
                    'green-light': '#34d399',
                }
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '128': '32rem',
            },
            maxWidth: {
                'content': '1280px',
            },
            boxShadow: {
                'glow': '0 0 15px rgba(255,255,255,0.2)',
                'card': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }
        },
    },
    plugins: [],
    darkMode: ['class', '[data-theme="dark"]'],
    corePlugins: {
        preflight: false,
    },
    blocklist: ['container'],
};
