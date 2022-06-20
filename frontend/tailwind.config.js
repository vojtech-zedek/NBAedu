/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'img': "url('img/background.jpg')",
        'card-img': "url('img/card-background.jpg')"
      },
      colors: {
        'nba-blue': '#1D428A',
        'nba-blue-hover': '#2450A8'
      },
      fontFamily: {
        helvetica: ['Helvetica Black Condensed', 'sans-serif'],
        poppinsl: ['Poppins Light', 'sans-serif'],
        poppinsm: ['Poppins Medium', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
