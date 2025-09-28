import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'
import SignInScreen from '@/screens/stack/sign-in/sign-in'
import SignUpScreen from '@/screens/stack/sign-up/sign-up'
import ForgotPasswordScreen from '@/screens/stack/forgot-password/forgot-password'
import VerifyCode from '@/screens/stack/verify-code/verify-code'
import ResetPassword from '@/screens/stack/reset-password/reset-password'
import DrawerLayout, { DrawerParamList } from '@/_layouts/drawer/drawer'
import { StackHeader } from './stack-header'

export type StackParamList = {
	home: undefined
	signIn: undefined
	signUp: undefined
	forgotPassword: undefined
	verifyCode: undefined
	resetPassword: { flux: string }
	drawer: NavigatorScreenParams<DrawerParamList>
}
const Stack = createStackNavigator<StackParamList>()

export default function StackLayout() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
			{/* <Stack.Screen name="home" component={HomeScreen} options={{}} /> */}
			<Stack.Screen name="signIn" component={SignInScreen} options={{}} />
			<Stack.Screen
				name="signUp"
				component={SignUpScreen}
				options={{
					headerShown: true,
					title: 'Nova conta',
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
					title: 'Segurança',
					header: StackHeader,
				}}
			/>
			<Stack.Screen
				name="resetPassword"
				component={ResetPassword}
				options={{
					headerShown: true,
					title: 'Segurança',
					header: StackHeader,
				}}
			/>
		</Stack.Navigator>
	)
}
