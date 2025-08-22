import { Feather } from '@expo/vector-icons'
import { CustomDrawerContent } from '@/_layouts/drawer/drawer-sidebar-content'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '@/screens/drawer/profile/profile'
import SecuritySettingsScreen from '@/screens/drawer/security-settings/security-settings'
import EditProfileScreen from '@/screens/drawer/edit-profile/edit-profile'
import HomeScreen from '@/screens/drawer/home/home'
import RegisterServiceScreen from '@/screens/drawer/register-service/register-service'
import { DrawerHeader } from './drawer-header'

import { useSelector } from 'react-redux'
import type { RootState } from '@/libs/redux/store'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export type DrawerParamList = {
	home: undefined
	profile: undefined
	security: undefined
	editProfile: undefined
	registerService: undefined
	homeManager: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export default function DrawerLayout() {
	const { token } = useSelector((state: RootState) => state.auth)
	const { stack } = useNavigate()
	if (token) {
		return (
			<Drawer.Navigator
				initialRouteName="home"
				drawerContent={(props) => <CustomDrawerContent {...props} />}
				screenOptions={{
					headerShown: true,
					drawerPosition: 'right',
					header: DrawerHeader,
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
						drawerIcon: ({ color, size }) => (
							<Feather name="file-minus" color={color} size={size} />
						),
					}}
				/>
			</Drawer.Navigator>
		)
	}
	return stack('signIn')
}
