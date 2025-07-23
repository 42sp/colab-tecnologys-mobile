module.exports = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	arrowParens: 'always',
	semi: false,
	endOfLine: 'auto',
	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	tailwindAttributes: ['className'],
}
