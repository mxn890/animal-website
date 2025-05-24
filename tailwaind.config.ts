import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        petgreen: {
          600: '#4CAF50',
          700: '#388E3C',
        },
      },
    },
  },
  plugins: [],
};

export default config;
