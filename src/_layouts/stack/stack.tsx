import { createStackNavigator } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'
import SignInScreen from '@/screens/stack/sign-in/sign-in'
import SignUpScreen from '@/screens/stack/sign-up/sign-up'
import ForgotPasswordScreen from '@/screens/stack/forgot-password/forgot-password'
import VerifyCode from '@/screens/stack/verify-code/verify-code'
import ResetPassword from '@/screens/stack/reset-password/reset-password'
import DrawerLayout, { DrawerParamList } from '@/_layouts/drawer/drawer'
import { StackHeader } from './stack-header'
import EditProfileScreen from '@/screens/drawer/edit-profile/edit-profile'
import SecuritySettingsScreen from '@/screens/drawer/security-settings/security-settings'
import HomeScreen from '@/screens/stack/home/home'
import TabsLayout, { TabParamList } from '@/_layouts/tabs/tabs'
import Home from '@/screens/drawer/home/home'

export type StackParamList = {
	home: undefined
	signIn: undefined
	signUp: undefined
	forgotPassword: { cpf: string; phone?: string }
	verifyCode: { flux: string; cpf: string; phone?: string }
	resetPassword: { flux: string; cpf: string; id: string }
	tab: NavigatorScreenParams<TabParamList>
	security: undefined
	editProfile: undefined
}
const Stack = createStackNavigator<StackParamList>()

export default function StackLayout() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="signIn">
			<Stack.Screen name="tab" component={TabsLayout} options={{}} />
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
			<Stack.Screen
				name="security"
				component={SecuritySettingsScreen}
				options={{
					headerShown: true,
					title: 'Configurações de segurança',
					header: StackHeader,
				}}
			/>
			<Stack.Screen
				name="editProfile"
				component={EditProfileScreen}
				options={{
					headerShown: true,
					headerTitle: "Editar perfil",
					header: StackHeader,
				}}
			/>
		</Stack.Navigator>
	)
}
