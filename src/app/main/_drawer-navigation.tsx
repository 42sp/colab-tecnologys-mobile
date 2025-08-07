import { TouchableOpacity, Platform, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomDrawerContent } from '@/components/custom-drawer-content/custom-drawer-content'

import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from './profile'
import SecuritySettingsScreen from './security-settings'
import EditProfileScreen from './edit-profile'
import HomeScreen from './home'
import { useNavigation } from '@react-navigation/native'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

const NATIVE_HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24
const HEADER_HEIGHT = NATIVE_HEADER_HEIGHT + STATUS_BAR_HEIGHT

export type DrawerParamList = {
	home: undefined
	profile: undefined
	security: undefined
	editProfile: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export default function DrawerLayout() {
	const { navigation } = useNavigate()

	return (
		<Drawer.Navigator
			initialRouteName="home"
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: true,
				headerStyle: {
					height: HEADER_HEIGHT,
				},
				headerTintColor: '#fff',
				headerTitleAlign: 'center',
				drawerPosition: 'right',
				drawerHideStatusBarOnOpen: true,
				drawerStyle: {
					width: '80%',
				},
				drawerActiveTintColor: '#000',
				headerLeft: () => (
					<TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 35 }}>
						<Feather name="chevron-left" size={24} color="#fff" />
					</TouchableOpacity>
				),
				headerBackground: () => (
					<SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'transparent' }}>
						<LinearGradient
							colors={['#B73131', '#EAA233']}
							start={{ x: 0, y: 0.5 }}
							end={{ x: 1, y: 0.5 }}
							style={{ height: NATIVE_HEADER_HEIGHT }}
						></LinearGradient>
					</SafeAreaView>
				),
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
		</Drawer.Navigator>
	)
}
