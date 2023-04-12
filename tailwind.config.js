/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      orange: '#fa6',
      'orange-light': '#fb8',
      brown: '#231205',
      'brown-lighter': '#3a1d09',
      white: '#fff',
      black: '#000'
    },
    fontFamily: {
      sans: ['Source Sans Pro', 'sans-serif'],
      serif: ['Caudex', 'serif'],
      hand: ['Tillana', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
};

