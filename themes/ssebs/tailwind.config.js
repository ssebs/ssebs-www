/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,html,css,md}",
  ],
  theme: {
    fontFamily: {
      'sans': ["Ubuntu", "Sans-serif"]
    },
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
        "secondary": {
          DEFAULT: "#024b8a",
        },
        "tertiary": {
          DEFAULT: "#2e6ae8", '50': '#eff6ff',
          '100': '#dceafd',
          '200': '#c0dcfd',
          '300': '#95c6fb',
          '400': '#63a6f7',
          '500': '#3e85f3',
          '600': '#2e6ae8',
          '700': '#2052d5',
          '800': '#2142ac',
          '900': '#203c88',
          '950': '#182753',
        },
        "quaternary": {
          DEFAULT: "#2ecce8", '50': '#edfdfe',
          '100': '#d1f8fc',
          '200': '#a8f0f9',
          '300': '#6ce2f4',
          '400': '#2ecce8',
          '500': '#0daecd',
          '600': '#0d8bad',
          '700': '#12708c',
          '800': '#185a72',
          '900': '#184c61',
          '950': '#0a3142',
        },
        "quinary": {
          DEFAULT: "#33ffe7", '50': '#eefffc',
          '100': '#c5fff7',
          '200': '#8bfff2',
          '300': '#33ffe7',
          '400': '#14eddb',
          '500': '#00d1c1',
          '600': '#00a8a0',
          '700': '#008580',
          '800': '#056a67',
          '900': '#0a5755',
          '950': '#003435',
        },
        "white": "#fff",
        "white-dim": "#eee"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

