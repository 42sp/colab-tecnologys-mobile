import { Text, View } from 'react-native'
import dayjs from "dayjs"


export function ActivityCardDate({ date }: { date: string }) {

	return (
		<View className="mr-2 w-[15%] items-center">
			<Text className="text-xl text-slate-500">
				{new Date(date)
					.toLocaleDateString('pt-BR', {
						month: 'short',
						timeZone: "UTC"
					})
					.replace('.', '')}
			</Text>
			<Text className="text-3xl text-slate-500">
				{new Date(date).toLocaleDateString('pt-BR', {
					day: 'numeric',
					timeZone: "UTC"
				})}
			</Text>
			<Text className="text-base text-slate-500">
				{new Date(date)
					.toLocaleDateString('pt-BR', {
						weekday: 'short',
						timeZone: "UTC"
					})
					.replace('.', '')}
			</Text>
		</View>
	)
}
