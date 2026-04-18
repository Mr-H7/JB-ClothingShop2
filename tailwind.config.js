/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A84C',
          50:  '#FAF5E4',
          100: '#F5EBCA',
          200: '#EDD795',
          300: '#E6C860',
          400: '#D4AF37',
          500: '#C9A84C',
          600: '#B8960C',
          700: '#8C7209',
          800: '#5E4D06',
          900: '#302703',
        },
        luxury: {
          black:  '#0a0a0a',
          dark:   '#111111',
          card:   '#161616',
          border: '#2a2a2a',
          muted:  '#3a3a3a',
          text:   '#9a9a9a',
        },
      },
      fontFamily: {
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['Inter', 'Helvetica', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultra:  '0.35em',
      },
      animation: {
        shimmer:  'shimmer 3s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.9s ease-out both',
        pulse:    'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-400% 0' },
          '100%': { backgroundPosition: '400% 0' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)',
        'gold-shimmer':  'linear-gradient(90deg, #B8960C 0%, #E8D5A3 25%, #D4AF37 50%, #E8D5A3 75%, #B8960C 100%)',
        'luxury-radial': 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
        'card-gradient': 'linear-gradient(145deg, #161616 0%, #111111 100%)',
      },
    },
  },
  plugins: [],
}
