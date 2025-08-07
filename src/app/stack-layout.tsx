import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeTest'
import SettingsScreen from './SettingsTest'

export type StackParamList = {
	home: undefined
	settings: undefined
}

const Stack = createStackNavigator<StackParamList>()

export default function StackLayout() {
	return (
		<Stack.Navigator
			initialRouteName="home"
			screenOptions={{
				headerStyle: {
					backgroundColor: '#f4511e',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Stack.Screen name="home" component={HomeScreen} options={{ title: 'Home' }} />
			<Stack.Screen name="settings" component={SettingsScreen} options={{ title: 'Settigns' }} />
			{/* <Stack.Screen
					name="main"
					component={MainNavigator}
					options={{
						title: 'Menu',
						headerShown: true, // Mostra o header do Stack acima do Drawer
					}}
				/> */}
		</Stack.Navigator>
	)
}
