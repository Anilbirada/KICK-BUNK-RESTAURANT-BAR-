/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          deepBlack: '#050505',
          richBlack: '#0B0B0B',
          card: '#0F1115',
          cardBorder: '#1F242D',
          metallicGold: '#D4A017',
          champagneGold: '#F5D77A',
          darkGold: '#8C641A',
          warmIvory: '#F4EFE5',
          softWhite: '#FFFFFF',
          muted: '#B8B1A5',
        },
        brand: {
          dark: '#050505',
          darker: '#0B0B0B',
          card: '#0F1115',
          cardHover: '#151922',
          cardBorder: '#1F242D',
          cardBorderHover: '#D4A017',
          gold: '#D4A017',
          goldHover: '#F5D77A',
          goldLight: '#F5D77A',
          goldDark: '#8C641A',
          amber: '#E5A93C',
          green: '#2E6F40',
          greenHover: '#235932',
          ivory: '#F4EFE5',
          cream: '#F4EFE5',
          muted: '#B8B1A5',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gold-metallic': 'linear-gradient(135deg, #F5D77A 0%, #D4A017 50%, #8C641A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5D77A 0%, #D4A017 50%, #8C641A 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4A017 0%, #FAF8F5 50%, #D4A017 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #14171E 0%, #050505 70%, #000000 100%)',
        'luxury-card': 'linear-gradient(180deg, rgba(15, 17, 21, 0.85) 0%, rgba(5, 5, 5, 0.95) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 160, 23, 0.3)',
        'gold-glow-lg': '0 0 45px -5px rgba(212, 160, 23, 0.45)',
        'luxury-card': '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
};
