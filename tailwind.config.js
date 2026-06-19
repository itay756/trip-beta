/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo', 'Assistant', 'system-ui', 'sans-serif'],
        display: ['Assistant', 'Heebo', 'system-ui', 'sans-serif'],
      },
      colors: {
        forest: {
          50: '#f1f8f2',
          100: '#dcefdd',
          200: '#bbdfbe',
          300: '#8fc795',
          400: '#5da866',
          500: '#3d8a47',
          600: '#2d6e37',
          700: '#26572e',
          800: '#214628',
          900: '#1c3a23',
        },
        sand: {
          50: '#faf7f0',
          100: '#f2ebda',
          200: '#e6d6b5',
          300: '#d6bb86',
          400: '#c89e5e',
        },
      },
      boxShadow: {
        card: '0 4px 20px -4px rgba(28, 58, 35, 0.18)',
      },
    },
  },
  plugins: [],
}
