import { useRouter } from 'expo-router'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Home() {
	const router = useRouter()

	return (
		<SafeAreaView>
			<Text className="flex self-center text-xl">Home</Text>
			<View className="h-full items-center justify-center">
				<Button title="Go to Sign-in" onPress={() => router.navigate('/sign-in')} />
			</View>
		</SafeAreaView>
	)
}
