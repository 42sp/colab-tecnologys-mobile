import { DrawerContentScrollView } from '@react-navigation/drawer'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { type Route } from '@react-navigation/native'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export function CustomDrawerContent(props: any) {
	const { state } = props
	const { drawer } = useNavigate()

	return (
		<DrawerContentScrollView
			{...props}
			contentContainerStyle={{ paddingTop: 0, paddingEnd: 0, paddingStart: 0 }}
		>
			<View className="h-24">
				<LinearGradient
					colors={['#B73131', '#EAA233']}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={{ height: '100%' }}
				/>

				<View className="items-center">
					<View className="relative -mt-6 size-36 rounded-full border border-neutral-100 bg-white p-1">
						<Image
							source={{ uri: 'https://randomuser.me/portraits/men/1.jpg' }}
							className=" h-full w-full rounded-full"
							resizeMode="cover"
						/>
					</View>
					<Text className="pt-6 text-lg font-medium">Ricardo Oliveira</Text>
					<Text className="text-x mb-8 text-gray-500">ricardo.oliveira@construtech.com</Text>
				</View>

				{state.routes.map((route: Route<string>, index: number) => {
					const isActive = index === state.index

					const label = props.descriptors[route.key]?.options?.title ?? route.name

					const icon = props.descriptors[route.key]?.options?.drawerIcon?.({
						focused: isActive,
						size: 22,
						color: isActive ? '#000' : '#4B5563',
					})

					return (
						<View key={route.key} className="flex-row items-center">
							{isActive && (
								<LinearGradient
									colors={['#B73131', '#EAA233']}
									start={{ x: 0, y: 0 }}
									end={{ x: 0, y: 1 }}
									className="h-full w-1.5 rounded-r-xl"
								/>
							)}

							<TouchableOpacity
								onPress={() => props.navigation.navigate(route.name)}
								className="flex-1 flex-row items-center px-5 py-4"
							>
								{icon}
								<Text
									className={`ml-3 text-base font-medium ${
										isActive ? 'text-black' : 'text-gray-500'
									}`}
								>
									{label}
								</Text>
							</TouchableOpacity>
						</View>
					)
				})}

				<TouchableOpacity className="mt-8 flex-row gap-3 px-5 py-4" onPress={() => drawer('home')}>
					<Feather name="log-out" color="#6b7280" size={22} />
					<Text className="text-lg font-medium text-gray-500">Sair</Text>
				</TouchableOpacity>
			</View>
		</DrawerContentScrollView>
	)
}
