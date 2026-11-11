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
          dark: '#121417',
          card: '#1A1D23',
          cardBorder: '#282C34',
          gold: '#D4AF37',
          goldHover: '#C59B27',
          amber: '#E5A93C',
          green: '#2E6F40',
          greenHover: '#235932',
          ivory: '#FBF9F5',
          cream: '#F3EFE6',
          muted: '#8E95A2',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
