/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        box: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        convenienceShadow:
          'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
      backgroundImage: {
        firstHeader: "url('/public/assets/header1.jpeg')",
        field: "url('/public/field.jpg')",
      },
      colors: {
        primary: {
          DEFAULT: '#F93939',
          50: '#FEEBEB',
          100: '#FED7D7',
          200: '#FDB0B0',
          300: '#FB8888',
          400: '#FA6161',
          500: '#F93939',
          600: '#F30707',
          700: '#BC0606',
          800: '#860404',
          900: '#4F0202',
          950: '#340202',
        },
        borderColor: '#8C8C8C',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
