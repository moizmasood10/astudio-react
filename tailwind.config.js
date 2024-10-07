/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#322625',
        grey: '#ebebeb',
        blue: '#c0e3e5',
        // yellow: '#fdc936',
      },
      fontFamily: {
        regular: ['NeutraRegular', 'sans-serif'],
        light: ['NeutraLight', 'sans-serif'],
        bold: ['NeutraBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

