import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#05050A',
          950: '#030305',
          900: '#0A0A12',
          800: '#12121C',
          700: '#1C1C29',
          600: '#2A2A3B',
        },
        mist: '#F2F3F8',
        violet: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
        },
        azure: '#3B82F6',
        magenta: '#D946EF',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5D06F',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'aurora-gradient':
          'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #D946EF 100%)',
        'aurora-gradient-soft':
          'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.12) 50%, rgba(217,70,239,0.1) 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B8860B 0%, #D4AF37 45%, #F5D06F 100%)',
        'radial-fade': 'radial-gradient(circle at center, rgba(139,92,246,0.18) 0%, transparent 70%)',
        'grid-lines':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
