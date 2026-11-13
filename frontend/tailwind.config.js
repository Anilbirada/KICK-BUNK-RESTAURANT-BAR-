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
        // Luxury European Light Theme Colors
        ivory: '#F7F3EB',
        cream: '#EFE7DA',
        charcoal: '#25231F',
        warmgrey: '#777064',
        antiqueGold: '#B58A45',
        champagneGold: '#DCC18B',
        emeraldDeep: '#254C3C',
        burgundyDeep: '#482A32',

        luxury: {
          ivory: '#F7F3EB',
          cream: '#EFE7DA',
          white: '#FFFFFF',
          antiqueGold: '#B58A45',
          champagneGold: '#DCC18B',
          charcoal: '#25231F',
          warmgrey: '#777064',
          emerald: '#254C3C',
          burgundy: '#482A32',
          deepBlack: '#0E0D0C',
        },
        brand: {
          ivory: '#F7F3EB',
          cream: '#EFE7DA',
          gold: '#B58A45',
          goldLight: '#DCC18B',
          charcoal: '#25231F',
          warmgrey: '#777064',
          emerald: '#254C3C',
          burgundy: '#482A32',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        cinzel: ['Cinzel', 'Georgia', 'serif'],
      },
      boxShadow: {
        'luxury-soft': '0 4px 20px -2px rgba(37, 35, 31, 0.05), 0 2px 6px -1px rgba(37, 35, 31, 0.03)',
        'luxury-card': '0 12px 32px -4px rgba(37, 35, 31, 0.08), 0 4px 12px -2px rgba(37, 35, 31, 0.04)',
        'luxury-elevated': '0 24px 48px -12px rgba(37, 35, 31, 0.12), 0 8px 16px -4px rgba(37, 35, 31, 0.06)',
        'gold-glow': '0 0 20px -3px rgba(181, 138, 69, 0.35)',
        'burgundy-glow': '0 15px 35px -5px rgba(72, 42, 50, 0.35)',
        'emerald-glow': '0 15px 35px -5px rgba(37, 76, 60, 0.35)',
      },
    },
  },
  plugins: [],
};
