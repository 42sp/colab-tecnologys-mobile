import { LinearGradient } from 'expo-linear-gradient'
import { Text, TouchableOpacity, View, StatusBar } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { getHeaderTitle } from '@react-navigation/elements'
import { DrawerHeaderProps } from '@react-navigation/drawer'

export function DrawerHeader({ navigation, options, route }: DrawerHeaderProps) {
	const title = getHeaderTitle(options, route.name)

	return (
		<View className="h-24 w-full" style={{ backgroundColor: 'transparent' }}>
			<StatusBar barStyle={'light-content'} />
			<LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={{ height: '100%' }}
			>
				<View className=" h-full w-full flex-row items-end justify-between p-4">
					<TouchableOpacity className="" onPress={() => navigation.goBack()}>
						<Feather name="chevron-left" size={24} color="#fff" />
					</TouchableOpacity>
					<Text className="font-inter-bold text-xl text-white">{title}</Text>
					<TouchableOpacity className="" onPress={() => navigation.openDrawer()}>
						<Feather name="menu" size={24} color="#fff" />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	)
}
