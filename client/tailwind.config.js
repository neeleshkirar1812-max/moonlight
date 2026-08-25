/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0B0B0B',
          50: '#2A2A2A',
          100: '#222222',
          200: '#1A1A1A',
          300: '#151515',
          400: '#121212',
          500: '#0E0E0E',
          600: '#0B0B0B',
          700: '#080808',
          800: '#050505',
          900: '#000000',
        },
        gold: {
          50: '#FDFBF7',
          100: '#FBF5E6',
          200: '#F5E6BE',
          300: '#EBD28B',
          400: '#E6CA65',
          500: '#D4AF37', // Primary Luxury Gold
          600: '#B89225',
          700: '#997D21',
          800: '#735D16',
          900: '#4D3E0C',
        },
        champagne: '#F5E6BE',
        slate: {
          muted: '#8E8E93',
          border: '#262626',
          card: '#141414',
          cardHover: '#1C1C1E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5E6BE 50%, #B89225 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
        'dark-gradient': 'linear-gradient(180deg, rgba(11,11,11,0) 0%, rgba(11,11,11,0.95) 100%)',
        'radial-gold': 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'gold-subtle': '0 4px 20px -2px rgba(212, 175, 55, 0.15)',
        'luxury-card': '0 10px 30px -5px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
