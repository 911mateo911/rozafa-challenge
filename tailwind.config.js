/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-bg': 'linear-gradient(116.82deg, #FF71A2 0%, #FFC682 100%),linear-gradient(0deg, #FFFFFF, #FFFFFF)'
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      borderRadius: {
        'lg-xl': '10px'
      },
      colors: {
        'base-text': 'rgba(0, 0, 0, 0.60)',
        'input-bg': '#F8F5F5',
        'app-main': '#FF5B90'
      },
      boxShadow: {
        'input-focused': '0px 4px 4px 0px #00000040',
        'card': '0px 10px 10px 2px rgba(51, 51, 51, 0.10)'
      }
    },
  },
  plugins: [],
}

