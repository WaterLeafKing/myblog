import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '780px',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
