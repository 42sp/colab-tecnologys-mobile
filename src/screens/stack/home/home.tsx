import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import ProfileViewer from '@/components/redux-profile-viewer'
import { SummaryCard } from '@/components/summary-card'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export default function HomeScreen() {
	const { stack, drawer } = useNavigate()

	return (
		<SafeAreaView className="w-full bg-white p-10">
			<Text className="flex self-center text-xl">Home</Text>
			<View className="h-full items-center justify-center gap-2">
				<ProfileViewer />
				<Button
					title="View Profile"
					onPress={() => {
						drawer('profile')
					}}
				/>

				<View className="my-4 flex-row gap-4">
					<SummaryCard icon="clipboard" SumaryVariant="blue" value="1000" label="Atividades" />

					<SummaryCard icon="clock" SumaryVariant="orange" value="200" label="Pendentes" />

					<SummaryCard icon="bar-chart" SumaryVariant="green" value="75%" label="Produtividade" />
				</View>

				<Button
					title="Sign-in"
					onPress={() => {
						console.log('press google sign in')
					}}
					variant="outline"
				/>

				<Button title="Forgot password" onPress={() => stack('forgotPassword')} variant="red" />

				<Button title="Go to Sign-in" onPress={() => stack('signIn')} />
			</View>
		</SafeAreaView>
	)
}
