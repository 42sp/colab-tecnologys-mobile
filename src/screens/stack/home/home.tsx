import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export default function HomeScreen() {
	const { stack, drawer } = useNavigate()

	return (
		<SafeAreaView className="w-full p-10">
			<Text className="flex self-center text-xl">Home</Text>
			<View className="h-full items-center justify-center gap-4">
				<Button
					title="View Profile"
					onPress={() => {
						drawer('profile')
					}}
				/>

				<Button title="Forgot password" onPress={() => stack('forgotPassword')} variant="red" />

				<Button title="Go to Sign-in" onPress={() => stack('signIn')} />
			</View>
		</SafeAreaView>
	)
}
