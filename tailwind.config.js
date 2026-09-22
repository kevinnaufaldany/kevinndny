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
          primary: '#222222',   // From Aeonik palette
          secondary: '#7B7B7B', // From Aeonik palette
          tertiary: '#F8F8F8',  // From Aeonik palette
          dark: '#111111',
          card: '#18181B',
          cardDark: '#1E1E1E',
          accent: '#10B981',    // Green indicator
          muted: '#7B7B7B',
          border: '#E4E4E7',
          surface: '#F8F8F8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tightest: '-0.06em',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 12px 30px -10px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
