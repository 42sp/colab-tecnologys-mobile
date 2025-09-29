import { View, Text } from 'react-native'
import { Productivity } from './header'

export function HeaderInfo({ color, text, value }: Productivity) {
	return (
		<View key={text} className="mb-1 flex-row items-center">
			<View className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
			<View className="flex-1">
				<Text className="text-base">{text}</Text>
			</View>
			<View>
				<Text className="text-base font-semibold">{value}%</Text>
			</View>
		</View>
	)
}
