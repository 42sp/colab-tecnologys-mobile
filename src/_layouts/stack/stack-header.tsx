import { StackHeaderProps } from '@react-navigation/stack'
import { getHeaderTitle } from '@react-navigation/elements'
import { Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'

export function StackHeader({ navigation, route, options }: StackHeaderProps) {
	const title = getHeaderTitle(options, route.name)
	return (
		<View className=" relative h-24 w-full " style={{ backgroundColor: 'transparent' }}>
			<LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={{ height: '100%' }}
			>
				<View className=" h-full w-full flex-row items-end p-4">
					<TouchableOpacity className="absolute left-0 p-4" onPress={() => navigation.goBack()}>
						<Feather name="chevron-left" size={24} color="#fff" />
					</TouchableOpacity>
					<Text className=" mx-auto font-inter-bold text-xl text-white">{title}</Text>
				</View>
			</LinearGradient>
		</View>
	)
}
