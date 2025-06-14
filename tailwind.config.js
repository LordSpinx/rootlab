/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        card: '#161b22',
        accent: '#58a6ff',
        danger: '#ff6b6b',
        success: '#4ade80',
      },
    },
  },
  plugins: [],
};