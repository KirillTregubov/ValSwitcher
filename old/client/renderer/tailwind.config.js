module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        valred: '#ff4654',
        valpink: '#FF858F',
        valblack: {
          darker: '#060A0E',
          olddark: '#0C141C',
          dark: '#070c10',
          DEFAULT: '#0f1822',
          light: '#172434',
          lighter: '#1f3145'
        },
        valgrey: '#8b978f',
        valbeige: '#ece8e1',
        valgrey: '#8a968f',

      },
      fontFamily: {
        'sans': 'Inter var',
        'valorant': 'Valorant'
      },
      minHeight: {
        '1/2': '50vh'
      },
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
