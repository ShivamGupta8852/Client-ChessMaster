/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary: {
          light: '#2C3E50',
          dark: '#ECF0F1',
        },
        secondary: {
          light: '#E67E22',
          dark: '#D35400',
        },
        background: {
          light: '#FFFFFF',
          dark: '#34495E',
        },
        text: {
          light: '#2C3E50',
          dark: '#ECF0F1',
        },
        button: {
          light: '#2980B9',
          dark: '#3498DB',
        },
      },
      scrollbar: {
        width: '12px',
        height: '8px',
        thumbColor: 'black',
        trackColor: 'red-900',
      },
    },
  },
  darkMode: 'selector',
  variants: {
    scrollbar: ['rounded'],
    extend: {
      mixBlendMode: ['responsive'],
    },
  },
  plugins: [],
}

