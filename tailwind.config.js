/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                'cloud-slow': 'float 20s infinite linear',
                'cloud-medium': 'float 15s infinite linear',
                'cloud-fast': 'float 10s infinite linear',
                'float': 'floating 3s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%': { transform: 'translateX(100vw)' },
                    '100%': { transform: 'translateX(-100%)' },
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
                    'color-cyan': '#5CE1E6',
                    'color-cyan-dark': '#2BBAC0',
                    'color-cyan-light': '#A3DCE2',
                    'color-floor': '#1A2738',
                    'text-heading': '#FFFFFF',
                    'text-body': '#DDE6ED',
                }
            }
        },
    },
    plugins: [],
    darkMode: ['class', '[data-theme="dark"]'],
    corePlugins: {
        preflight: false, // Important for Docusaurus to avoid CSS conflicts
    },
    blocklist: ['container'], // prevent tailwind container class from clashing with docusaurus
};
