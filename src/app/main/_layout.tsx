import { Drawer } from 'expo-router/drawer'
import { useRouter } from 'expo-router'
import { TouchableOpacity, Platform, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomDrawerContent } from '@/components/custom-drawer-content/custom-drawer-content'

import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter'
import '@/global.css'

const NATIVE_HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24
const HEADER_HEIGHT = NATIVE_HEADER_HEIGHT + STATUS_BAR_HEIGHT

export default function DrawerLayout() {
	const router = useRouter()

	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	})
	if (!fontsLoaded) return null

	return (
		<GestureHandlerRootView>
			<Drawer
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
					drawerStyle:{
						width: '80%'
					},
					drawerActiveTintColor: '#000',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()} style={{ paddingLeft: 35 }}>
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
					options={{
						drawerLabel: 'Home',
						title: 'Home',
						drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
					}}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						drawerLabel: 'Profile',
						title: 'Profile',
						drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
					}}
				/>
				<Drawer.Screen
					name="edit-profile"
					options={{
						drawerLabel: 'Edit Profile',
						title: 'Edit Profile',
						drawerIcon: ({ color, size }) => <Feather name="edit" color={color} size={size} />,
					}}
				/>
				<Drawer.Screen
					name="security-settings"
					options={{
						drawerLabel: 'Safety',
						title: 'Safety',
						drawerIcon: ({ color, size }) => <Feather name="shield" color={color} size={size} />,
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	)
}
