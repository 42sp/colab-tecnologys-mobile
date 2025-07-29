import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Home() {
	const router = useRouter()

	return (
		<SafeAreaView className="bg-white">
			<Text className="flex self-center text-xl">Home</Text>
			<Input
				placeholder="Password"
				IconLeft={'mail'}
				IconRight={'mail'}
				iconPress={() => console.log('ICONE PRESS')}
				className="self-center"
			/>
			<View className="h-full items-center justify-center gap-2">
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
