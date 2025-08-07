import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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
			<GestureHandlerRootView >
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
									<Feather name="chevron-left" size={24} color={'#fff'} className="p-5" />
								</TouchableOpacity>
							),
							headerBackground: () => (
								<SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }} edges={['top']}>
									<LinearGradient
										colors={['#B73131', '#EAA233']}
										start={{ x: 0, y: 0.5 }}
										end={{ x: 1, y: 0.5 }}
										style={{ height: '100%' }}
									></LinearGradient>
								</SafeAreaView>
							),
						}}
					/>
					<Stack.Screen name="main" options={{}} />
					<Stack.Screen name="forgot-password" options={{}} />
					<Stack.Screen name="test-list" options={{}} />
				</Stack>
			</GestureHandlerRootView>
		</Provider>
	)
}
