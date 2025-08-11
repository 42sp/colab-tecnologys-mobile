import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'
import HomeScreen from '@/screens/stack/home/home'
import SignInScreen from '@/screens/stack/sign-in/sign-in'
import SignUpScreen from '@/screens/stack/sign-up/sign-up'
import ForgotPasswordScreen from '@/screens/stack/forgot-password/forgot-password'
import DrawerLayout, { DrawerParamList } from '@/_layouts/drawer/drawer'
import { StackHeader } from './stack-header'

export type StackParamList = {
	home: undefined
	signIn: undefined
	signUp: undefined
	forgotPassword: undefined
	drawer: NavigatorScreenParams<DrawerParamList>
}

const Stack = createStackNavigator<StackParamList>()

export default function StackLayout() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="home" component={HomeScreen} options={{}} />
			<Stack.Screen name="signIn" component={SignInScreen} options={{}} />
			<Stack.Screen
				name="signUp"
				component={SignUpScreen}
				options={{
					headerShown: true,
					title: 'New Account',
					header: StackHeader,
				}}
			/>
			<Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} options={{}} />
			<Stack.Screen name="drawer" component={DrawerLayout} options={{}} />
		</Stack.Navigator>
	)
}
