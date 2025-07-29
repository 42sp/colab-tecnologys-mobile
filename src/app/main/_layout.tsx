import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer'

export default function Layout() {
	return (
		<GestureHandlerRootView>
			<Drawer
				screenOptions={{
					drawerPosition: 'right',
					drawerHideStatusBarOnOpen: true,
				}}
			>
				<Drawer.Screen
					name="home"
					options={{
						drawerLabel: 'Home',
					}}
				/>
				<Drawer.Screen
					name="profile"
					options={{
						drawerLabel: 'Profile',
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	)
}
