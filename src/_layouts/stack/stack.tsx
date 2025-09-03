import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'
import HomeScreen from '@/screens/stack/home/home'
import SignInScreen from '@/screens/stack/sign-in/sign-in'
import SignUpScreen from '@/screens/stack/sign-up/sign-up'
import ForgotPasswordScreen from '@/screens/stack/forgot-password/forgot-password'
import VerifyCode from '@/screens/stack/verify-code/verify-code'
import DrawerLayout, { DrawerParamList } from '@/_layouts/drawer/drawer'
import { StackHeader } from './stack-header'

import { useSelector } from 'react-redux'
import type { RootState } from '@/libs/redux/store'

export type StackParamList = {
	home: undefined
	signIn: undefined
	signUp: undefined
	forgotPassword: undefined
	verifyCode: undefined
	drawer: NavigatorScreenParams<DrawerParamList>
}

const Stack = createStackNavigator<StackParamList>()

export default function StackLayout() {
	const { token, expiry } = useSelector((state: RootState) => state.authSignIn)
	const now = Math.floor(Date.now() / 1000)
	const route = !token || !expiry || expiry >= now.toString() ? 'signIn' : 'drawer'
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={route}>
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
			<Stack.Screen
				name="verifyCode"
				component={VerifyCode}
				options={{
					headerShown: true,
					title: 'New Account',
					header: StackHeader,
				}}
			/>
		</Stack.Navigator>
	)
}
