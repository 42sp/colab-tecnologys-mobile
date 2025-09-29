const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const config = getDefaultConfig(__dirname)
const path = require('path')

config.resolver.alias = {
	'@/': path.resolve(__dirname, './src/'),
	'@/components': path.resolve(__dirname, 'src/components'),
}

// config.watchFolders = [path.resolve(__dirname, './src')]

module.exports = withNativeWind(config, { input: './src/global.css' })
