/** @type {import('tailwindcss').Config} */
import colors from './src/assets/styles/colors.ts';

export default {
  prefix: 'tw-',
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primary: colors.primary,
        primaryLight: colors.primaryLight,
        grey50: colors.grey50,
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('tailwindcss-animate')],
};
