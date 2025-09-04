import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
	return (
		<SafeAreaView className="w-full p-10">
			<Text className="flex self-center text-xl">Home</Text>
			<View className="h-full items-center justify-center gap-4">
				<Text>Olhe os logs</Text>
			</View>
		</SafeAreaView>
	)
}
