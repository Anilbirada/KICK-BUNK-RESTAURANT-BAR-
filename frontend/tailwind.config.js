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
        brand: {
          dark: '#08090C',
          darker: '#040507',
          card: '#0F1217',
          cardHover: '#151921',
          cardBorder: '#202530',
          cardBorderHover: '#D4AF37',
          gold: '#D4AF37',
          goldHover: '#DFBE50',
          goldLight: '#F3E5AB',
          goldDark: '#997B24',
          amber: '#E5A93C',
          green: '#2E6F40',
          greenHover: '#235932',
          ivory: '#FAF8F5',
          cream: '#F4EFE6',
          muted: '#8E95A2',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 50%, #AA7C11 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #D4AF37 0%, #FAF8F5 50%, #D4AF37 100%)',
        'dark-radial': 'radial-gradient(ellipse at top, #1A1F2B 0%, #08090C 70%, #040507 100%)',
        'luxury-card': 'linear-gradient(180deg, rgba(20, 24, 32, 0.75) 0%, rgba(10, 12, 16, 0.9) 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.25)',
        'gold-glow-lg': '0 0 45px -5px rgba(212, 175, 55, 0.35)',
        'luxury-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
