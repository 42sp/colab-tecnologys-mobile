import { LinearGradient } from 'expo-linear-gradient'
import { Text, TouchableOpacity, View, StatusBar, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { getHeaderTitle } from '@react-navigation/elements'
import { DrawerHeaderProps } from '@react-navigation/drawer'

export function DrawerHeader({ navigation, options, route }: DrawerHeaderProps) {
	const title = getHeaderTitle(options, route.name)
	const hideBackButton = route.name === 'home' || route.name === 'sidebar'
	const paddingSize = Platform.OS === 'ios' ? 'p-2' : 'p-4'

	return (
		<View className="h-24 w-full" style={{ backgroundColor: 'transparent' }}>
			<StatusBar barStyle={'light-content'} />
			<LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={{ height: '100%' }}
			>
				<View className={`h-full w-full flex-row items-end justify-between ${paddingSize}`}>
					{!hideBackButton ? (
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Feather name="chevron-left" size={24} color="#fff" />
						</TouchableOpacity>
					) : (
						<View className="w-6" />
					)}
					<Text className="font-inter-bold text-xl text-white">{title}</Text>
					<TouchableOpacity className="" onPress={() => navigation.openDrawer()}>
						<Feather name="menu" size={24} color="#fff" hitslop={{ size: 10 }} />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	)
}
