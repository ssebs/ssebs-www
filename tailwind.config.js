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

