/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F3E8',
          light: '#FBF9F3',
          dark: '#EBE5D3',
        },
        clay: {
          green: {
            DEFAULT: '#4A5D3A',
            light: '#6B7F4E',
            dark: '#38462C',
          },
          brown: {
            DEFAULT: '#6B5544',
            light: '#866B57',
            dark: '#4F3E32',
          },
        },
        gold: {
          DEFAULT: '#B08D57',
          light: '#C7A774',
          dark: '#937443',
        },
        natural: {
          text: '#2E2A22',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
