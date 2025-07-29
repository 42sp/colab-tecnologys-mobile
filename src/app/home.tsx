import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import ProfileViewer from '@/components/ProfileViewer'

export default function Home() {
	const router = useRouter()

	return (
		<SafeAreaView className="bg-white p-10">
			<Text className="flex self-center text-xl">Home</Text>
			<View className="h-full items-center justify-center gap-2">
				<ProfileViewer />
				<Button title="Sign-in" onPress={() => {}} />

				<Button
					title="Sign-in"
					onPress={() => {
						console.log('press google sign in')
					}}
					variant="outline"
				/>

				<Button
					title="Forgot password"
					onPress={() => router.navigate('/forgot-password')}
					variant="red"
				/>

				<Button title="Go to Sign-in" onPress={() => router.navigate('/sign-in')} />
			</View>
		</SafeAreaView>
	)
}
