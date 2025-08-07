import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import store from '@/libs/redux/store'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import StackLayout from './_layouts/stack'
import { registerRootComponent } from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter'
import '@/global.css'

enableScreens()

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
				<SafeAreaProvider>
					<GestureHandlerRootView>
						<StackLayout />
					</GestureHandlerRootView>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	)
}

registerRootComponent(App)
