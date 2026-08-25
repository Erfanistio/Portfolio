/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['VT323', 'monospace'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        portfolioBlack: '#000000',
        cardBlack: '#171717',
      },
      boxShadow: {
        glass: '0 20px 50px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};
