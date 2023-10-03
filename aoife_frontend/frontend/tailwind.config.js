/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'open-menu': {
          '0%': {transform: 'translateX(100%)' },
          '100%': {transform: 'translateX(0)' },
        },
        'close-menu': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'show-item': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'hide-item': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',
        'close-menu': 'close-menu 0.5s ease-in-out 1s backwards',
        'show-item': 'show-item 0.5s ease-in-out 1s forwards',
        'hide-item': 'hide-item 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
