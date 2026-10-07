/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/*.js'],
  theme: {
    extend: {
      colors: {
        bg: '#08070f',
        surface: '#100e1b',
        surface2: '#171427',
        card: '#14111f',
        line: '#24203a',
        ink: '#f1eefc',
        dim: '#a19bc2',
        mute: '#8a84ab',
        violet: { 200: '#ddd3ff', 300: '#c7b6ff', 400: '#a585ff', 500: '#8a63ff', 600: '#7341f0' },
        fuchsia: { 400: '#d27bff', 500: '#c668ff' },
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.045em' },
    },
  },
};
