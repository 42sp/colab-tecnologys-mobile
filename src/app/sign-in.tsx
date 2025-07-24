import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SignIn() {
	const router = useRouter()

	return (
		<SafeAreaView>
			<Text className="self-center text-xl">Sign-in</Text>
			<View className="h-full items-center justify-center">
				<Button title="Go to Main" onPress={() => router.navigate('/main')} />
			</View>
		</SafeAreaView>
	)
}
