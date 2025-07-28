import { Stack } from 'expo-router'
import { Provider } from 'react-redux'
import store from 'redux/store'
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter'
import '@/global.css'

export default function Layout() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	})
	if (!fontsLoaded) return

	return (
		<Provider store={store}>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="home" options={{}} />
				<Stack.Screen name="sign-in" options={{}} />
			</Stack>
		</Provider>
	)
}
