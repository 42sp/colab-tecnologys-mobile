import { Text, TouchableOpacity, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'expo-router'

export function SignInForm() {
	const router = useRouter()

	return (
		<View className="my-5 gap-5">
			<Input placeholder="Email address" />
			<Input placeholder="Password" IconRight="eye" />
			<TouchableOpacity activeOpacity={0.5}>
				<Text className="self-end font-inter-bold text-blue-500">Forgot Password</Text>
			</TouchableOpacity>

			<Button
				title="Sign In"
				onPress={() => {
					router.navigate('/main')
				}}
				className="my-5"
			></Button>

			<View className=" items-center">
				<View className="flex-row">
					<Text className="font-inter">Don't have an account? </Text>
					<TouchableOpacity activeOpacity={0.5}>
						<Text className="font-inter-bold text-blue-500">Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}
