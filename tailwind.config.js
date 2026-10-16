/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101B2D',
          50: '#E8EAEF',
          100: '#C5CAD4',
          200: '#9BA3B4',
          300: '#707C94',
          400: '#566173',
          500: '#3D4654',
          600: '#2D3441',
          700: '#1F242F',
          800: '#101B2D',
          900: '#0A111F',
        },
        gold: {
          DEFAULT: '#C6A875',
          50: '#FAF6EF',
          100: '#F2E9D8',
          200: '#E6D4B3',
          300: '#D9BE8E',
          400: '#C6A875',
          500: '#B8965E',
          600: '#A07E4A',
          700: '#83643B',
          800: '#664E2E',
          900: '#4A3922',
        },
        offwhite: '#F7F6F2',
        border: '#EAE7E0',
        slate: '#667085',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
