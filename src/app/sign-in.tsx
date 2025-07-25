import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '../components/ui/MyButton'

export default function SignIn() {
  const router = useRouter()

	return (
		<SafeAreaView>
			<Text className="self-center text-xl">Sign-in</Text>
			<View className="h-full items-center justify-center">
				<Button title="Go to Main" onPress={() => router.navigate('/main')} buttonType='primary'/>
			</View>
		</SafeAreaView>
	)
}
}