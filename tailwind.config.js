export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'indian-saffron': '#FF9933',
        'indian-green': '#138808',
        'indian-blue': '#000080',
        'focus-primary': '#4A4A4A',
        'focus-secondary': '#6A6A6A',
        'focus-accent': '#FF6B6B',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'indian-elegant': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'indian-soft': '12px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}