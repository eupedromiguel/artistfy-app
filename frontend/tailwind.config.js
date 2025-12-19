/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          violet: '#A327F5',
          black: '#191414',
          white: '#FFFFFF',
          gray: '#282828'
        }
      },
      fontFamily: {
        'jetbrains': ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};
