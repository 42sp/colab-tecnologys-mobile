/* eslint-env node */
const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')

module.exports = defineConfig([
	eslintPluginPrettierRecommended,
	expoConfig,
	{
		ignores: ['dist/*'],
	},
	{
		rules: {
			'react/display-name': 'off',
		},
	},
])
