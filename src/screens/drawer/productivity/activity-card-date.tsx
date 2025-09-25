import { Text, View } from 'react-native'

export function ActivityCardDate({ date }: { date: string }) {
	return (
		<View className="mr-2 w-[15%] items-center">
			<Text className="text-3xl text-slate-500">
				{new Date(date).toLocaleDateString('pt-BR', {
					day: 'numeric',
				})}
			</Text>
			<Text className="text-base text-slate-500">
				{new Date(date)
					.toLocaleDateString('pt-BR', {
						weekday: 'short',
					})
					.replace('.', '')}
			</Text>
		</View>
	)
}
