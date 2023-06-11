/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxs: '320px',
      xs: '475px',
      sm: '575px',
      md: '768px',
      lg: '1024px',
      '2xl': '1600px',
      '3xl': '1920px',
    },
    fontSize: {
      xxs: '0.625rem',
      xs: '0.725rem',
      ...defaultTheme.fontSize,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'night-shadz': '#bb3855',
        affair: '#854288',
        plum: '#943e7f',
        rouge: '#1b1b1b',
        cosmic: '#6b366a',
        valencia: '#d6343b',
        'brick-red': '#d43444',
        'vin-rouge': '#9a385f',
        'night-shade': '#a43a5e',
        'royal-purple': '#7148B5ff',
        'medium-purple': '#7A54C8',
        'light-purple': '#8667E7',
        'blue-purple': '#715DD3',
      },
    },
  },
  plugins: [],
};
