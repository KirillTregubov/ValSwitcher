const plugin = require("tailwindcss/plugin");

module.exports = {
	mode: 'jit',
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
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
				valbeige: '#ece8e1'
			},
			fontFamily: {
				'sans': 'Inter var',
				'valorant': 'Valorant'
			},
			minHeight: {
				'1/2': '50vh'
			},
			transformOrigin: {
				"0": "0%"
			},
			zIndex: {
				"-1": "-1"
			}
		},
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
		// 			'scrollbar-color': 'scrollbar-thumb-zinc-600 var(--scrollbar-track)',
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
