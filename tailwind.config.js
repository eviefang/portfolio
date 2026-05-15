/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        albert: ['"Albert Sans"', 'system-ui', 'sans-serif'],
        rounded: ['"M PLUS Rounded 1c"', '"Albert Sans"', 'sans-serif'],
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: {
          red: '#E0221E',
          orange: '#FF7F27',
          blue: '#00A2E8',
          cyan: '#4ECDC4',
          purple: '#AA88EE',
          yellow: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
};
