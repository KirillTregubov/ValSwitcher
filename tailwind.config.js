// const plugin = require("tailwindcss/plugin");
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        valred: {
          DEFAULT: '#FF4655',
          50: '#FFFEFE',
          100: '#FFE9EB',
          200: '#FFC0C5',
          300: '#FF98A0',
          400: '#FF6F7A',
          500: '#FF4655',
          // 600: '#FF0E21',
          // 600: '#FF293E',
          600: '#CF5965',
          // 700: '#AC000E',
          700: '#79000A',
          // 800: '#9D000D',
          800: '#500007',
          900: '#130002'
        },
        valpink: '#FF858F',
        valblack: {
          bg: '#060A0E',
          dark: '#0C141C',
          // dark: '#070c10',
          DEFAULT: '#0f1822',
          light: '#172434',
          lighter: '#1f3145'
        },
        valneutral: {
          DEFAULT: '#060A0E',
          50: '#EDF0F2',
          100: '#D4E0ED',
          200: '#B2C2D1',
          // 300: '#7EA3C8',
          // 400: '#5384B5',
          500: '#566676',
          600: '#121E2B',
          700: '#0C141C',
          800: '#060A0E',
          900: '#000000'
        },
        valgrey: '#8b978f',
        valbeige: '#ece8e1'
      },
      fontFamily: {
        sans: 'Inter var',
        valorant: 'Valorant'
      },
      maxWidth: {
        window: '55rem'
      },
      minHeight: {
        '1/2': '50vh'
      },
      transformOrigin: {
        0: '0%'
      },
      zIndex: {
        '-1': '-1'
      }
    }
  },
  plugins: [
    // plugin(function ({ addUtilities, matchUtilities, theme }) {
    // 	const scrollbarTrackColorValue = (value) => ({
    // 		'--scrollbar-track': value,
    // 		'&::-webkit-scrollbar-track': {
    // 			"background-color": value
    // 		}
    // 	})
    // 	const scrollbarTrackRoundedValue = (value) => ({
    // 		'&::-webkit-scrollbar-track': {
    // 			"border-radius": value
    // 		}
    // 	});
    // 	const scrollbarThumbColorValue = (value) => ({
    // 		'--scrollbar-thumb': value,
    // 		'&::-webkit-scrollbar-thumb': {
    // 			"background-color": value
    // 		}
    // 	});
    // 	const scrollbarThumbRoundedValue = (value) => ({
    // 		'&::-webkit-scrollbar-thumb': {
    // 			"border-radius": value
    // 		}
    // 	});
    // 	addUtilities({
    // 		'.scrollbar': {
    // 			'--scrollbar-thumb': '#cdcdcd',
    // 			'--scrollbar-track': '#f0f0f0',
    // 			'--scrollbar-width': '14px',
    // 			'--scrollbar-height': '14px',
    // 			'scrollbar-color': 'var(--scrollbar-thumb) var(--scrollbar-track)',
    // 			'&::-webkit-scrollbar': {
    // 				'width': 'var(--scrollbar-width)',
    // 				'height': 'var(--scrollbar-height)'
    // 			}
    // 		},
    // 		'.scrollbar:hover': {
    // 			'scrollbar-color': 'scrollbar-thumb-neutral-600 var(--scrollbar-track)',
    // 		},
    // 		'.scrollbar-thin': {
    // 			'--scrollbar-width': '8px',
    // 			'scrollbar-width': 'thin'
    // 		}
    // 	});
    // 	Object.entries(theme('colors')).forEach(([colorName, color]) => {
    // 		switch (typeof color) {
    // 			case 'object':
    // 				matchUtilities(
    // 					{
    // 						[`scrollbar-track-${colorName}`]: (value) => (scrollbarTrackColorValue(value)),
    // 						[`scrollbar-thumb-${colorName}`]: (value) => (scrollbarThumbColorValue(value))
    // 					},
    // 					{
    // 						values: color
    // 					}
    // 				)
    // 				break;
    // 			case 'function':
    // 				addUtilities({
    // 					[`.scrollbar-track-${colorName}`]: scrollbarTrackColorValue(color({})),
    // 					[`.scrollbar-thumb-${colorName}`]: scrollbarThumbColorValue(color({}))
    // 				})
    // 				break;
    // 			case 'string':
    // 				addUtilities({
    // 					[`.scrollbar-track-${colorName}`]: scrollbarTrackColorValue(color),
    // 					[`.scrollbar-thumb-${colorName}`]: scrollbarThumbColorValue(color)
    // 				})
    // 				break;
    // 		}
    // 	});
    // 	matchUtilities(
    // 		{
    // 			'scrollbar-track-rounded': (value) => (scrollbarTrackRoundedValue(value)),
    // 			'scrollbar-thumb-rounded': (value) => (scrollbarThumbRoundedValue(value))
    // 		},
    // 		{
    // 			values: theme('borderRadius')
    // 		}
    // 	)
    // })
  ]
}
