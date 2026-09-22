/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#111111',
          card: '#18181B',
          accent: '#10B981',
          muted: '#71717A',
          border: '#E4E4E7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
      }
    },
  },
  plugins: [],
}
