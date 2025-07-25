import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../components/ui/button'

export default function SignIn() {
  const router = useRouter()

	return (
		<SafeAreaView>
			<Text className="self-center text-xl">Sign-in</Text>
			<View className="h-full items-center justify-center">
				<Button title="Go to Home" onPress={() => router.navigate('/home')} variant='default'/>
        <Button title="Go to Sign-Up" onPress={() => router.navigate('/sign-up')} variant='default'/>
			</View>
		</SafeAreaView>
	)
}