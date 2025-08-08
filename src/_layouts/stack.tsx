import { createStackNavigator } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { NavigatorScreenParams } from '@react-navigation/native'
import HomeScreen from '@/screens/stack/home/home'
import SignInScreen from '@/screens/stack/sign-in/sign-in'
import SignUpScreen from '@/screens/stack/sign-up/sign-up'
import ForgotPasswordScreen from '@/screens/stack/forgot-password/forgot-password'
import DrawerLayout, { DrawerParamList } from '@/_layouts/drawer'
import { getHeaderTitle } from '@react-navigation/elements'

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
					header: ({ navigation, route, options }) => {
						const title = getHeaderTitle(options, route.name)
						return (
							<View className=" relative h-24 w-full " style={{ backgroundColor: 'transparent' }}>
								<LinearGradient
									colors={['#B73131', '#EAA233']}
									start={{ x: 0, y: 0.5 }}
									end={{ x: 1, y: 0.5 }}
									style={{ height: '100%' }}
								>
									<View className=" h-full w-full flex-row items-end p-4">
										<TouchableOpacity
											className="absolute left-0 p-4"
											onPress={() => navigation.goBack()}
										>
											<Feather name="chevron-left" size={24} color="#fff" />
										</TouchableOpacity>
										<Text className=" mx-auto font-inter-bold text-xl text-white">{title}</Text>
									</View>
								</LinearGradient>
							</View>
						)
					},
				}}
			/>
			<Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} options={{}} />
			<Stack.Screen name="drawer" component={DrawerLayout} options={{}} />
		</Stack.Navigator>
	)
}
