import { View, Text } from 'react-native'
import { HeaderInfo } from './header-info'
import { HeaderChart } from './header-chart'

// Gráfico semanal (mock)
const weeklyProgress = [
	{ value: 74, color: '#A0D7FF', text: 'Previsto' },
	{ value: 19, color: '#007AFF', text: 'Completo' },
]

export type Productivity = {
	value: number
	color: string
	text: string
}

export default function Header() {
	return (
		<View className="m-4 flex-row items-center justify-between rounded-3xl bg-white px-4">
			<View className="">
				<Text className="mb-2 text-lg font-semibold">Progresso semanal</Text>
				{weeklyProgress.map((item) => (
					<HeaderInfo key={item.text} {...item} />
				))}
			</View>

			<View className="h-full w-[1px] bg-slate-200"></View>

			<View className="py-4">
				<HeaderChart weeklyProgress={weeklyProgress} />
			</View>
		</View>
	)
}
