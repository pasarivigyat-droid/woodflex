import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', '"Playfair Display"', 'serif'],
        sans: ['var(--font-sans)', '"Inter"', 'sans-serif'],
      },
      colors: {
        wood: {
          50: '#F9F8F6',
          100: '#F2EFE9',
          200: '#E6E0D4',
          300: '#D1C6B3',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#5C5046',
          800: '#4A4036',
          900: '#2D2A26',
        },
        ink: '#1a1a1a',
        stone: '#e8e6e1',
        gold: '#d4af37',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
