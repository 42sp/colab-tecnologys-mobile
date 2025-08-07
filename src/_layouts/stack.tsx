import { createStackNavigator } from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigatorScreenParams } from '@react-navigation/native'
import HomeScreen from '@/screens/stack/home/home'
import SignInScreen from '@/screens/stack/sign-in/sign-in'
import SignUpScreen from '@/screens/stack/sign-up/sign-up'
import ForgotPasswordScreen from '@/screens/stack/forgot-password/forgot-password'
import DrawerLayout, { DrawerParamList } from '@/_layouts/drawer'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export type StackParamList = {
	home: undefined
	signIn: undefined
	signUp: undefined
	forgotPassword: undefined
	drawer: NavigatorScreenParams<DrawerParamList>
}

const Stack = createStackNavigator<StackParamList>()

export default function StackLayout() {
	const { navigation } = useNavigate()

	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="home" component={HomeScreen} options={{}} />
			<Stack.Screen name="signIn" component={SignInScreen} options={{}} />
			<Stack.Screen
				name="signUp"
				component={SignUpScreen}
				options={{
					headerShown: true,
					headerTintColor: '#fff',
					headerTitleAlign: 'center',
					title: 'New Account',
					headerLeft: () => (
						<TouchableOpacity onPress={() => navigation.goBack()}>
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
			<Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} options={{}} />
			<Stack.Screen name="drawer" component={DrawerLayout} options={{}} />
		</Stack.Navigator>
	)
}
