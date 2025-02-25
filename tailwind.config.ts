import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: '1024px',
      md: '768px',
      sm: '640px',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
