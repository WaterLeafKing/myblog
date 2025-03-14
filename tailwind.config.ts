import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      '3xl': '1920px',
      '2xl': '1536px',
      xl: '1280px',
      lg: '1024px',
      md: '768px',
      sm: '640px',
      custom: '420px',
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
