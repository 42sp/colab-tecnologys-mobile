import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter_400Regular'],
				'inter-medium': ['Inter_500Medium'],
				'inter-bold': ['Inter_700Bold'],
			},
		},
	},
	plugins: [],
}
