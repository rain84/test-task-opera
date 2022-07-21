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
      ...require('tailwindcss/colors'),
      primary: '#00D2DF',
      bluegray: 'rgb(206 238 251 / 15%)',
      elevation: '#c4c4c4',
      selected: 'rgba(0, 210, 223, 0.15)',
      green: '#00DF81',
      red: '#FF6174',
      white: '#fff',
      'medium-emphasis': 'rgba(0, 0, 0, 0.6)',
      'high-emphasis': '#000',
      'low-emphasis': 'rgba(0, 0, 0, 0.4)',
    },
    plugins: [
      require('@tailwindcss/typography'),
      // ...
    ],
  },
}
