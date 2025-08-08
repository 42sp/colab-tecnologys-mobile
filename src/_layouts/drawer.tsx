import { Text, View, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { CustomDrawerContent } from '@/components/custom-drawer-content'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '@/screens/drawer/profile/profile'
import SecuritySettingsScreen from '@/screens/drawer/security-settings/security-settings'
import EditProfileScreen from '@/screens/drawer/edit-profile/edit-profile'
import HomeScreen from '@/screens/drawer/home/home'
import RegisterServiceScreen from '@/screens/drawer/register-service/register-service'
import { getHeaderTitle } from '@react-navigation/elements'

export type DrawerParamList = {
	home: undefined
	profile: undefined
	security: undefined
	editProfile: undefined
	registerService: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export default function DrawerLayout() {
	return (
		<Drawer.Navigator
			initialRouteName="home"
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: true,
				drawerPosition: 'right',
				header: ({ navigation, route, options }) => {
					const title = getHeaderTitle(options, route.name)
					return (
						<View className=" relative h-24 w-full " style={{ backgroundColor: 'transparent' }}>
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
									<Text className=" font-inter-bold text-xl text-white">{title}</Text>
									<TouchableOpacity className="" onPress={() => navigation.openDrawer()}>
										<Feather name="menu" size={24} color="#fff" />
									</TouchableOpacity>
								</View>
							</LinearGradient>
						</View>
					)
				},
			}}
		>
			<Drawer.Screen
				name="home"
				component={HomeScreen}
				options={{
					drawerLabel: 'Home',
					title: 'Home',
					drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
				}}
			/>
			<Drawer.Screen
				name="profile"
				component={ProfileScreen}
				options={{
					drawerLabel: 'Profile',
					title: 'Profile',
					drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
				}}
			/>
			<Drawer.Screen
				name="editProfile"
				component={EditProfileScreen}
				options={{
					drawerLabel: 'Edit Profile',
					title: 'Edit Profile',
					drawerIcon: ({ color, size }) => <Feather name="edit" color={color} size={size} />,
				}}
			/>
			<Drawer.Screen
				name="security"
				component={SecuritySettingsScreen}
				options={{
					drawerLabel: 'Safety',
					title: 'Safety',
					drawerIcon: ({ color, size }) => <Feather name="shield" color={color} size={size} />,
				}}
			/>
			<Drawer.Screen
				name="registerService"
				component={RegisterServiceScreen}
				options={{
					drawerLabel: 'Register Service',
					title: 'Register Service',
					drawerIcon: ({ color, size }) => <Feather name="file-minus" color={color} size={size} />,
				}}
			/>
		</Drawer.Navigator>
	)
}
