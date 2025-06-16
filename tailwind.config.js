/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
      colors: {
        'bio-green': '#a4be88',
        'bio-dark': '#2f3a29',
        'bio-light': '#e9e7e3',
        'bio-cream': '#f4f1ee',
      }
    },
  },
  plugins: [],
}