/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/Roboto/**/*.{woff,woff2,ttf}"
  ],
  theme: {
    extend: {
      colors: {
        'amarilloroto': '#FEFCF0',
        'azulpei':'#80A7E0',
        'background-main': '#A9C8F722'
      },
      fontFamily: {
        'regular': ['regular'],
        'thin': ['thin']
      }
  }
  },
  plugins: [],
}
