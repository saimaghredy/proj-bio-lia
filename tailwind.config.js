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
        // Earthy Greens
        'sage': {
          50: '#f6f8f4',
          100: '#e9f0e3',
          200: '#d4e2c8',
          300: '#b5cfa1',
          400: '#94b876',
          500: '#7a9f56',
          600: '#5f7d42',
          700: '#4c6236',
          800: '#3f4f2e',
          900: '#364329',
        },
        // Warm Earth Tones
        'earth': {
          50: '#faf9f7',
          100: '#f2f0eb',
          200: '#e8e4db',
          300: '#d9d2c4',
          400: '#c7bba8',
          500: '#b5a48e',
          600: '#a08d75',
          700: '#8b7862',
          800: '#726354',
          900: '#5d5147',
        },
        // Forest Greens
        'forest': {
          50: '#f4f6f4',
          100: '#e5ebe5',
          200: '#ccd6cc',
          300: '#a8baa8',
          400: '#7d967d',
          500: '#5f7a5f',
          600: '#4a614a',
          700: '#3d4f3d',
          800: '#334133',
          900: '#2a362a',
        },
        // Olive Tones
        'olive': {
          50: '#f7f8f4',
          100: '#edf0e6',
          200: '#dce2ce',
          300: '#c4cfab',
          400: '#a8b883',
          500: '#8fa162',
          600: '#738349',
          700: '#5a663c',
          800: '#4a5433',
          900: '#3f472d',
        },
        // Clay/Terracotta accents
        'clay': {
          50: '#faf7f5',
          100: '#f3ede8',
          200: '#e8ddd4',
          300: '#d7c5b5',
          400: '#c4a690',
          500: '#b08b6f',
          600: '#9d7559',
          700: '#83614a',
          800: '#6b5040',
          900: '#574237',
        }
      }
    },
  },
  plugins: [],
}