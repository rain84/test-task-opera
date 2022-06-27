/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      primary: '#00D2DF',
      green: '#00DF81',
      red: '#FF6174',
      white: '#fff',
      elevation: '#c4c4c4',
      selected: 'rgba(0, 210, 223, 0.15)',
    },
    plugins: [],
  },
}
