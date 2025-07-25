import { Stack } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
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

		<Stack
			screenOptions={{
				headerShown: false,
				
			}}
		>
			<Stack.Screen name="home" options={{}} />
			<Stack.Screen name="sign-in" options={{}} />
			<Stack.Screen name="sign-up" options={{headerShown: true, headerTintColor: '#fff', headerTitleAlign: 'center', title: 'Nova Conta', headerLeft: () => (
				<Feather name="chevron-left" size={24} color={'#fff'}/>
			), headerBackground: () => (
				<LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{x:0, y:0.5}}
				end={{x:1, y: 0.5}}
				style={{flex: 1}}
				></LinearGradient>
			)}} />
		</Stack>
	)
}
