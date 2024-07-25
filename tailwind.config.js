/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          DEFAULT: "#41afff",
          '50': '#eff7ff',
          '100': '#dfeeff',
          '200': '#b8dfff',
          '300': '#78c6ff',
          '400': '#41afff',
          '500': '#068df1',
          '600': '#006fce',
          '700': '#0058a7',
          '800': '#024b8a',
          '900': '#083f72',
          '950': '#06274b',
        },
        "secondary": "#333fff",
        "tertiary": "#2e6ae8",
        "quaternary": "#2ecce8",
        "quinary": "#33ffe7",
        "white": "#fff",
        "white-dim": "#eee"
      },
    },
  },
  plugins: [],
}

