module.exports = function (api) {
	api.cache(true)

	return {
		presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
		plugins: [['react-native-reanimated/plugin'],
		['module:react-native-dotenv',
			{
				envName: 'APP_ENV',
				moduleName: '@env',
				path: '.env',
			}
		]]
	}
}
