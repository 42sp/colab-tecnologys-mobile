import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from '@/libs/redux/store'
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_700Bold,
} from '@expo-google-fonts/inter'
import '@/global.css'

export default function Layout() {
	const router = useRouter()
	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Inter_700Bold,
	})
	if (!fontsLoaded) return

	return (
		<Provider store={store}>
			<GestureHandlerRootView>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="home" options={{}} />
					<Stack.Screen name="sign-in" options={{}} />
					<Stack.Screen
						name="sign-up"
						options={{
							headerShown: true,
							headerTintColor: '#fff',
							headerTitleAlign: 'center',
							title: 'New Account',

							headerLeft: () => (
								<TouchableOpacity onPress={() => router.back()}>
									<Feather name="chevron-left" size={24} color={'#fff'} className="m-2" />
								</TouchableOpacity>
							),
							headerBackground: () => (
								<View className="flex-1 bg-transparent">
									<LinearGradient
										colors={['#B73131', '#EAA233']}
										start={{ x: 0, y: 0.5 }}
										end={{ x: 1, y: 0.5 }}
										style={{ height: '100%' }}
									></LinearGradient>
								</View>
							),
						}}
					/>
					<Stack.Screen name="main" options={{}} />
					<Stack.Screen name="forgot-password" options={{}} />
				</Stack>
			</GestureHandlerRootView>
		</Provider>
	)
}
