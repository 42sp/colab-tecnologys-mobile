import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import store from '@/libs/redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import StackLayout from './_layouts/stack/stack'
import { registerRootComponent } from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useSelector } from 'react-redux'
import type { RootState } from '@/libs/redux/store'

import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter'
import '@/global.css'
import DrawerLayout from './_layouts/drawer/drawer'

enableScreens()

function AppContent() {
	const { token, expiry } = useSelector((state: RootState) => state.authSignIn)
	const now = Math.floor(Date.now() / 1000)
	if (token && expiry && expiry < now.toString()) return <DrawerLayout />

	return token ? <DrawerLayout /> : <StackLayout />
}

export default function App() {
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	})
	if (!fontsLoaded) return

	return (
		<Provider store={store}>
			<NavigationContainer>
				<GestureHandlerRootView>
					<SafeAreaProvider className="m-0 p-0">
						<AppContent />
					</SafeAreaProvider>
				</GestureHandlerRootView>
			</NavigationContainer>
		</Provider>
	)
}

registerRootComponent(App)
