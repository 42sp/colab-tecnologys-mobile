import { Stack, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
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
<GestureHandlerRootView style={{ flex: 1 }}>
		<Stack
			screenOptions={{
				headerShown: false,
				
			}}
		>
			<Stack.Screen name="home" options={{}} />
			<Stack.Screen name="sign-in" options={{}} />
			<Stack.Screen name="sign-up" options={{headerShown: true, headerTitleStyle: { }, headerTintColor: '#fff', headerTitleAlign: 'center', title: 'New Account', headerLeft: () => (
				<TouchableOpacity onPress={() => router.back()}>
				<Feather name="chevron-left" size={24} color={'#fff'}/>
				</TouchableOpacity>
			), headerBackground: () => (
				<SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: 'transparent' }}>
				<LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{x:0, y:0.5}}
				end={{x:1, y: 0.5}}
				style={{flex: 1}}
				></LinearGradient>
				</SafeAreaView>
			)}} />
		</Stack>
		   </GestureHandlerRootView>
	)
}
